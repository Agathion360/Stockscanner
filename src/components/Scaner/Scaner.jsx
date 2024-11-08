

import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { FaPlay, FaStop, FaPause, FaCamera } from 'react-icons/fa';
import BottomNav from '../ButtonNav/ButtonNav.jsx';
import Swal from 'sweetalert2';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css'; // Incluye el tema de alertifyjs

const BarcodeScanner = () => {
  const [scannedProducts, setScannedProducts] = useState([]);
  const [isContinuous, setIsContinuous] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const streamRef = useRef(null);

  const checkProductInDB = async (codigo) => {
    try {
      const response = await fetch(`https://asijeminapis.website:4687/productos/codigoBarra/${codigo}`);
      if (response.status === 200) {
        const product = await response.json();
        return product;
      } else if (response.status === 404) {
        return null;
      } else {
        throw new Error('Error al consultar la base de datos');
      }
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      return null;
    }
  };

  const addProductToDB = async (producto) => {
    try {
      const response = await fetch('https://asijeminapis.website:4687/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });
      return response.ok;
    } catch (error) {
      console.error('Error al agregar el producto a la base de datos:', error);
      return false;
    }
  };

  const handleScan = async (codigo) => {
    const cleanedCodigo = String(codigo).trim();
    let product = await checkProductInDB(cleanedCodigo);
    
    if (!product) {
      product = {
        nombre: 'Producto no encontrado',
        precio: 0,
        precioVenta: 0,
        stock: 1,
        categoria: 'DEFAULT_CATEGORY_ID',
        activo: true,
        codigoBarra: cleanedCodigo
      };
    }

    setScannedProducts(prevState => {
      const existingProduct = prevState.find(p => p.codigoBarra === cleanedCodigo);
      
      if (existingProduct) {
        return prevState.map(p =>
          p.codigoBarra === cleanedCodigo
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        return [...prevState, { codigoBarra: cleanedCodigo, nombre: product.nombre, cantidad: 1 }];
      }
    });

    alertify.success('Código escaneado correctamente');
  };

  const updateQuantity = (codigoBarra, newQuantity) => {
    setScannedProducts(prevState =>
      prevState.map(p =>
        p.codigoBarra === codigoBarra
          ? { ...p, cantidad: newQuantity }
          : p
      )
    );
  };

  const removeProduct = (codigoBarra) => {
    setScannedProducts(prevState =>
      prevState.filter(p => p.codigoBarra !== codigoBarra)
    );
  };

  const uploadScannedProducts = async () => {
    for (const product of scannedProducts) {
      let dbProduct = await checkProductInDB(product.codigoBarra);

      if (!dbProduct) {
        const newProduct = {
          nombre: product.nombre,
          precio: 0,
          precioVenta: 0,
          stock: product.cantidad,
          categoria: 'DEFAULT_CATEGORY_ID',
          activo: true,
          codigoBarra: product.codigoBarra
        };
        await addProductToDB(newProduct);
      } else {
        dbProduct.stock += product.cantidad;
        await fetch(`https://asijeminapis.website:4687/productos/${dbProduct._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dbProduct)
        });
      }
    }

    let timerInterval;
    Swal.fire({
      title: "¡Productos subidos exitosamente!",
      html: "Serás redirigido en <b></b> segundos.",
      icon: "success",  // Icono de éxito agregado
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = Math.ceil(Swal.getTimerLeft() / 1000); // Mostrar el tiempo en segundos
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("El mensaje se cerró automáticamente al finalizar el tiempo");
      }
    });
    
    setScannedProducts([]); // Limpiar la lista de productos escaneados
  };

  const handleManualInput = (e) => {
    e.preventDefault();
    if (manualCode) {
      handleScan(manualCode);
      setManualCode('');
    }
  };

  const startContinuousScan = () => {
    setIsContinuous(true);
    codeReader.current.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
      if (result) {
        handleScan(result.text);
        if (isContinuous) {
          // Utiliza un timeout para controlar la frecuencia del escaneo continuo
          setTimeout(() => startContinuousScan(), 1000); // Ajusta el tiempo según sea necesario
        }
      }
      if (err && err.name !== 'NotFoundException') {
        console.error("Error durante el escaneo:", err);
      }
    });
  };

  const startSingleScan = () => {
    setIsContinuous(false);
    codeReader.current.decodeOnceFromVideoDevice(undefined, videoRef.current)
      .then(result => {
        handleScan(result.text);
      })
      .catch(err => {
        console.error("Error durante el escaneo único:", err);
      });
  };

  const stopScan = () => {
    setIsContinuous(false); // Detiene el escaneo continuo
    codeReader.current.reset();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  // const openModal = () => {
  //   setIsModalOpen(true);
  //   codeReader.current = new BrowserMultiFormatReader();
  //   navigator.mediaDevices.getUserMedia({
  //     video: { facingMode: { exact: "environment" } } // Forzar la cámara trasera
  //   })
  //     .then((stream) => {
  //       videoRef.current.srcObject = stream;
  //       streamRef.current = stream;
  //       startSingleScan(); // Inicia el escaneo único cuando se abre el modal
  //     })
  //     .catch((err) => {
  //       console.error("Error al acceder a la cámara:", err);
  //     });
  // };

  const openModal = () => {
    setIsModalOpen(true);
    codeReader.current = new BrowserMultiFormatReader();
    
    // Configurar las restricciones de la cámara
    const constraints = {
      video: {
        facingMode: { exact: "environment" }, // Forzar cámara trasera
        focusMode: "manual",  // Intentar establecer el enfoque manual
        advanced: [{ focusMode: "manual" }] // Configuración avanzada para deshabilitar el autofoco
      }
    };
    
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        startSingleScan(); // Inicia el escaneo único cuando se abre el modal
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara:", err);
      });
  };


  const closeModal = () => {
    stopScan();
    setIsModalOpen(false);
  };

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();
    return () => {
      stopScan();
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-4xl mx-auto pb-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Ingreso Productos al Stock</h2>
      <h3 className="text-2xl font-semibold mb-4 text-center">Escanear Código de Barras</h3>
      
      {/* Input manual con botón para abrir la cámara */}
      <form onSubmit={handleManualInput} className="flex justify-center mb-4">
        <div className="flex w-full max-w-lg">
          <input
            type="text"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="Ingresa el código de barras manualmente"
            className="flex-grow p-2 border rounded-l-lg mr-2"
          />
          <button
            type="button"
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-200 flex items-center"
          >
            <FaCamera />
          </button>
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-2">Productos escaneados:</h3>
      <ul className="mb-4">
        {scannedProducts.map((product, index) => (
          <li key={index} className="flex items-center justify-between mb-2 p-2 border-b">
            <div>
              <span className="font-medium">Código: {product.codigoBarra}</span> - {product.nombre} - Cantidad: 
              <input
                type="number"
                value={product.cantidad}
                onChange={(e) => updateQuantity(product.codigoBarra, parseInt(e.target.value, 10))}
                className="w-16 ml-2 p-1 border rounded text-center"
                min="1"
              />
            </div>
            <button
              onClick={() => removeProduct(product.codigoBarra)}
              className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-center">
        <button
          onClick={uploadScannedProducts}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-200 w-40"
        >
          Subir Productos
        </button>
      </div>

      {/* Modal para la cámara */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Escanear Código de Barras</h2>
            <video
              ref={videoRef}
              className="w-full max-w-xs mx-auto border-2 border-gray-300 rounded-lg bg-black"
              playsInline
              muted
              autoPlay
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={startContinuousScan}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaPlay className="mr-2" />
                <span>Continua</span>
              </button>
              <button
                onClick={startSingleScan}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaPause className="mr-2" />
                <span>Única</span>
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaStop className="mr-2" />
                <span>Cerrar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default BarcodeScanner;
