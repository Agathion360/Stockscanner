
// import React, { useState, useRef, useEffect } from 'react';
// import { FaBarcode, FaTrash } from 'react-icons/fa';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import { BrowserMultiFormatReader } from '@zxing/library';
// import alertify from 'alertifyjs';
// import 'alertifyjs/build/css/alertify.css';
// import 'alertifyjs/build/css/themes/default.css'; // Incluye el tema de alertifyjs

// const Consulta = () => {
//   const [codigoBarra, setCodigoBarra] = useState('');
//   const [producto, setProducto] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const videoRef = useRef(null);
//   const codeReader = useRef(null);
//   const streamRef = useRef(null);

//   console.log('producto:', producto);
//   const fetchProducto = async (codigo) => {
//     try {
//       const response = await fetch(`https://asijeminapis.website:4687/productos/codigoBarra/${codigo}`);
//       if (response.ok) {
//         const data = await response.json();
//         setProducto(data);
//       } else {
//         alertify.error('Producto no encontrado');
//         setProducto(null);
//       }
//     } catch (error) {
//       console.error('Error al consultar el producto:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setCodigoBarra(e.target.value);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       fetchProducto(codigoBarra);
//     }
//   };

//   const startScan = async () => {
//     try {
//       const result = await codeReader.current.decodeOnceFromVideoDevice(undefined, videoRef.current);
//       console.log("Código de barras escaneado:", result.text);
//       setCodigoBarra(result.text);
//       fetchProducto(result.text);
//       closeModal();
//     } catch (err) {
//       console.error("Error durante el escaneo:", err);
//       alertify.error('Error al escanear el código de barras');
//     }
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//     codeReader.current = new BrowserMultiFormatReader();
//     navigator.mediaDevices.getUserMedia({
//       video: { facingMode: { exact: "environment" } } // Forzar la cámara trasera
//     })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//         streamRef.current = stream;
//         startScan();
//       })
//       .catch((err) => {
//         console.error("Error al acceder a la cámara:", err);
//         alertify.error('No se pudo acceder a la cámara');
//       });
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     if (codeReader.current) {
//       codeReader.current.reset();
//     }
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }
//   };

//   const clearCodigoBarra = () => {
//     setCodigoBarra('');
//     setProducto(null);
//   };

//   useEffect(() => {
//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-20 overflow-hidden">
//       <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Consulta de Producto</h2>
//       <div className="flex flex-col mb-4 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
//         <label className="mb-2 font-medium sm:mb-0">Código de Barra:</label>
//         <div className="flex space-x-2 w-full">
//           <input
//             type="text"
//             value={codigoBarra}
//             onChange={handleInputChange}
//             onKeyPress={handleKeyPress}
//             className="p-2 border border-gray-300 rounded-lg flex-grow"
//             placeholder="Escanea o ingresa el código de barras"
//           />
//           <button
//             type="button"
//             onClick={openModal}
//             className="p-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-200"
//           >
//             <FaBarcode />
//             <span className="hidden sm:inline">Escanear</span>
//           </button>
//           <button
//             type="button"
//             onClick={clearCodigoBarra}
//             className="p-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-200"
//           >
//             <FaTrash />
//             <span className="hidden sm:inline">Eliminar</span>
//           </button>
//         </div>
//       </div>

//       {producto && (
//         <div className="bg-gray-100 p-4 rounded-lg">
//           <h3 className="text-xl font-semibold mb-2">Información del Producto</h3>
//           <p><strong>Nombre:</strong> {producto.nombre}</p>
//           <p><strong>Precio:</strong> ${producto.precio}</p>
//           <p className='text-green-700 text-2xl mt-3'><strong>Precio de Venta:</strong> ${producto.precioVenta}</p>
//           <p><strong>Stock:</strong> {producto.stock}</p>
//           <p><strong>Código de Barra:</strong> {producto.codigoBarra}</p>
//           <p><strong>Fecha de Vencimiento:</strong> {producto.fecha_vencimiento}</p>
//           <p><strong>Stock Minimo:</strong> {producto.stock_minimo}</p>
//           <p><strong>Activo:</strong> {producto.activo ? 'Sí' : 'No'}</p>
//         </div>
//       )}

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
//             <h2 className="text-xl font-bold mb-4 text-center">Escanear Código de Barras</h2>
//             <video
//               ref={videoRef}
//               className="w-full border-2 border-gray-300 rounded-lg bg-black"
//               playsInline
//               muted
//               autoPlay
//             />
//             <button
//               onClick={closeModal}
//               className="w-full mt-4 p-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition duration-200"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       )}

//       <BottomNav />
//     </div>
//   );
// };

// export default Consulta;



import React, { useState, useRef, useEffect } from 'react';
import { FaBarcode, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import BottomNav from '../ButtonNav/ButtonNav.jsx';
import { BrowserMultiFormatReader } from '@zxing/library';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css'; // Incluye el tema de alertifyjs

const Consulta = () => {
  const [codigoBarra, setCodigoBarra] = useState('');
  const [producto, setProducto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const streamRef = useRef(null);


  const fetchProducto = async (codigo) => {
    try {
      const empresaId = localStorage.getItem('empresaId'); 
      const response = await fetch(`https://asijeminapis.website:4687/productos/codigoBarra/${codigo}?empresaId=${empresaId}`);
      if (response.ok) {
        const data = await response.json();

        // Formatear la fecha de vencimiento
        if (data.fecha_vencimiento) {
          const fechaObj = new Date(data.fecha_vencimiento);
          const dia = fechaObj.getUTCDate().toString().padStart(2, '0');
          const mes = (fechaObj.getUTCMonth() + 1).toString().padStart(2, '0'); // Meses de 0-11, sumamos 1
          const anio = fechaObj.getUTCFullYear();
          data.fecha_vencimiento_formateada = `${dia}/${mes}/${anio}`; // Guardar la fecha formateada
        }

        setProducto(data);
      } else {
        alertify.error('Producto no encontrado');
        setProducto(null);
      }
    } catch (error) {
      console.error('Error al consultar el producto:', error);
    }
  };

  const handleInputChange = (e) => {
    setCodigoBarra(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchProducto(codigoBarra);
    }
  };

  const startScan = async () => {
    try {
      const result = await codeReader.current.decodeOnceFromVideoDevice(undefined, videoRef.current);
      console.log("Código de barras escaneado:", result.text);
      setCodigoBarra(result.text);
      fetchProducto(result.text);
      closeModal();
    } catch (err) {
      console.error("Error durante el escaneo:", err);
      alertify.error('Error al escanear el código de barras');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    codeReader.current = new BrowserMultiFormatReader();
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: "environment" } } // Forzar la cámara trasera
    })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        startScan();
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara:", err);
        alertify.error('No se pudo acceder a la cámara');
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (codeReader.current) {
      codeReader.current.reset();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const clearCodigoBarra = () => {
    setCodigoBarra('');
    setProducto(null);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Función para determinar las advertencias y los colores
  const determinarAdvertencias = (producto) => {
    const hoy = new Date(); // Fecha actual
    const fechaVencimiento = producto.fecha_vencimiento ? new Date(producto.fecha_vencimiento) : null;
    const unaSemana = 10 * 24 * 60 * 60 * 1000;

    let advertenciaFecha = null;
    let advertenciaStock = null;
    let claseAdvertencia = 'bg-gray-100'; // Clase por defecto

    // Comprobación de la fecha de vencimiento
    if (fechaVencimiento && !isNaN(fechaVencimiento.getTime())) {
      if (fechaVencimiento < hoy) {
        // Producto vencido
        advertenciaFecha = <FaExclamationTriangle className="inline-block text-yellow-300 ml-2" />;
        claseAdvertencia = 'bg-red-600 text-white'; // Cambia a fondo rojo y texto blanco si está vencido
      } else if (fechaVencimiento.getTime() - hoy.getTime() <= unaSemana) {
        // Producto a punto de vencer
        advertenciaFecha = <FaExclamationTriangle className="inline-block text-yellow-500 ml-2" />;
        claseAdvertencia = 'bg-yellow-200 text-black'; // Cambia a fondo amarillo y texto negro si está cerca de vencer
      }
    }

    // Comprobación de stock
    if (producto.stock <= producto.stock_minimo && producto.stock_minimo > 0) {
      // Stock en el mínimo o agotado
      advertenciaStock = <FaExclamationTriangle className="inline-block text-yellow-300 ml-2" />;
      claseAdvertencia = 'bg-red-600 text-white'; // Cambia a fondo rojo y texto blanco si el stock es bajo
    } else if (producto.stock > producto.stock_minimo && producto.stock <= producto.stock_minimo * 1.5) {
      // Stock bajo pero no mínimo
      advertenciaStock = <FaExclamationTriangle className="inline-block text-yellow-500 ml-2" />;
      claseAdvertencia = 'bg-yellow-200 text-black'; // Cambia a fondo amarillo y texto negro si el stock es bajo
    }

    return { advertenciaFecha, advertenciaStock, claseAdvertencia };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-20 overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Consulta de Producto</h2>
      <div className="flex flex-col mb-4 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
        <label className="mb-2 font-medium sm:mb-0">Código de Barra:</label>
        <div className="flex space-x-2 w-full">
          <input
            type="text"
            value={codigoBarra}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="p-2 border border-gray-300 rounded-lg flex-grow"
            placeholder="Escanea o ingresa el código de barras"
          />
          <button
            type="button"
            onClick={openModal}
            className="p-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-200"
          >
            <FaBarcode />
            <span className="hidden sm:inline">Escanear</span>
          </button>
          <button
            type="button"
            onClick={clearCodigoBarra}
            className="p-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-200"
          >
            <FaTrash />
            <span className="hidden sm:inline">Eliminar</span>
          </button>
        </div>
      </div>

      {producto && (
        <div className={`p-4 rounded-lg ${determinarAdvertencias(producto).claseAdvertencia}`}>
          <h3 className="text-xl font-semibold mb-2">Información del Producto</h3>
          <p><strong>Nombre:</strong> {producto.nombre}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          {/* <p className='text-green-700 text-2xl mt-3'><strong>Precio de Venta:</strong> ${producto.precioVenta}</p> */}
         
          <p className={`mt-3 ${determinarAdvertencias(producto).claseAdvertencia === 'bg-red-600 text-white' ? 'text-white' : 'text-green-700'} text-2xl`}>
      <strong>Precio de Venta:</strong> ${producto.precioVenta}
    </p>


          <p>
            <strong>Stock:</strong> {producto.stock}
            {determinarAdvertencias(producto).advertenciaStock} 
          </p>


          <p>
            <strong>Fecha de Vencimiento:</strong> {producto.fecha_vencimiento_formateada || 'Sin fecha'}
            {determinarAdvertencias(producto).advertenciaFecha} 
          </p>

          
          <p><strong>Stock Minimo:</strong> {producto.stock_minimo}</p>
          <p><strong>Activo:</strong> {producto.activo ? 'Sí' : 'No'}</p>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Escanear Código de Barras</h2>
            <video
              ref={videoRef}
              className="w-full border-2 border-gray-300 rounded-lg bg-black"
              playsInline
              muted
              autoPlay
            />
            <button
              onClick={closeModal}
              className="w-full mt-4 p-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Consulta;
