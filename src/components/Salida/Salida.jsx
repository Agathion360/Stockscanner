


// import React, { useState, useEffect, useRef } from 'react';
// import { BrowserMultiFormatReader } from '@zxing/library';
// import { FaPlay, FaPause, FaStop, FaCamera } from 'react-icons/fa';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import alertify from 'alertifyjs';
// import 'alertifyjs/build/css/alertify.css';
// import 'alertifyjs/build/css/themes/default.css'; // Incluye este o el tema que prefieras

// const Salida = () => {
//   const [productosSalida, setProductosSalida] = useState([]);
//   const [inputCodigoBarra, setInputCodigoBarra] = useState(''); 
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const videoRef = useRef(null);
//   const codeReader = useRef(null);
//   const streamRef = useRef(null);

//   // const checkProductInDB = async (codigo) => {
//   //   try {
//   //     const response = await fetch(`http://localhost:4687/productos/codigoBarra/${codigo}`);
//   //     if (response.status === 200) {
//   //       const product = await response.json();
//   //       return product;
//   //     } else if (response.status === 404) {
//   //       console.log('Producto no encontrado en la base de datos.');
//   //       return null;
//   //     } else {
//   //       throw new Error('Error al consultar la base de datos');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error al consultar la base de datos:', error);
//   //     return null;
//   //   }
//   // };


//   const checkProductInDB = async (codigo) => {
//     try {
//         const empresaId = localStorage.getItem('empresaId'); // Obtener el empresaId del localStorage
//         const response = await fetch(`http://localhost:4687/productos/codigoBarra/${codigo}?empresaId=${empresaId}`);
//         if (response.status === 200) {
//             const product = await response.json();
//             return product;
//         } else if (response.status === 404) {
//             console.log('Producto no encontrado en la base de datos.');
//             return null;
//         } else {
//             throw new Error('Error al consultar la base de datos');
//         }
//     } catch (error) {
//         console.error('Error al consultar la base de datos:', error);
//         return null;
//     }
// };


//   const handleScan = async (codigo) => {
//     const cleanedCodigo = String(codigo).trim();
//     let product = await checkProductInDB(cleanedCodigo);
    
//     if (product) {
//       setProductosSalida(prevState => {
//         const existingProduct = prevState.find(p => p.codigoBarra === cleanedCodigo);
//         if (existingProduct) {
//           return prevState.map(p =>
//             p.codigoBarra === cleanedCodigo
//               ? { ...p, cantidad: p.cantidad + 1 }
//               : p
//           );
//         } else {
//           return [...prevState, { ...product, cantidad: 1 }];
//         }
//       });
//       alertify.success('Código escaneado correctamente');
//     } else {
//       alertify.error('Producto no encontrado');
//     }
//   };

//   const updateQuantity = (codigoBarra, newQuantity) => {
//     setProductosSalida(prevState =>
//       prevState.map(p =>
//         p.codigoBarra === codigoBarra
//           ? { ...p, cantidad: newQuantity }
//           : p
//       )
//     );
//   };

//   const removeProduct = (codigoBarra) => {
//     setProductosSalida(prevState =>
//       prevState.filter(p => p.codigoBarra !== codigoBarra)
//     );
//   };

//   const darSalida = async () => {
//     try {
//         const empresaId = localStorage.getItem('empresaId'); // Obtener el empresaId del localStorage

//         const response = await fetch('http://localhost:4687/productos/salida', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ empresaId, productos: productosSalida }) // Asegurarse de enviar `empresaId` y `productos`
//         });

//         if (response.ok) {
//             alertify.success("Salida de productos realizada exitosamente");
//             setProductosSalida([]); 
//         } else {
//             const errorData = await response.json();
//             alertify.error(`Error: ${errorData.message}`);
//         }
//     } catch (error) {
//         console.error('Error al realizar la salida de productos:', error);
//         alertify.error('Hubo un problema al intentar dar salida a los productos');
//     }
// };


//   const startContinuousScan = () => {
//     codeReader.current.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
//       if (result) {
//         handleScan(result.text);
//       }
//       if (err && err.name !== 'NotFoundException') {
//         console.error("Error durante el escaneo:", err);
//       }
//     });
//   };

//   const startSingleScan = () => {
//     codeReader.current.decodeOnceFromVideoDevice(undefined, videoRef.current)
//       .then(result => {
//         handleScan(result.text);
//       })
//       .catch(err => {
//         console.error("Error durante el escaneo único:", err);
//         alertify.error('Error durante el escaneo.');
//       });
//   };

//   const stopScan = () => {
//     codeReader.current.reset();
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
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
//         startSingleScan();
//       })
//       .catch((err) => {
//         console.error("Error al acceder a la cámara:", err);
//         alertify.error("Error al acceder a la cámara.");
//       });
//   };

//   const closeModal = () => {
//     stopScan();
//     setIsModalOpen(false);
//   };

//   const handleBarcodeInputChange = (e) => {
//     setInputCodigoBarra(e.target.value);
//   };

//   const handleBarcodeInputKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleScan(inputCodigoBarra);
//       setInputCodigoBarra(''); 
//     }
//   };

//   useEffect(() => {
//     codeReader.current = new BrowserMultiFormatReader();
//     return () => {
//       stopScan();
//     };
//   }, []);

//   return (
//     <div className="container mx-auto p-6 mb-20">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dar Salida de Productos</h2>

//       <div className="mb-6 flex justify-center">
//         <div className="flex w-full max-w-md">
//           <input
//             type="text"
//             value={inputCodigoBarra}
//             onChange={handleBarcodeInputChange}
//             onKeyPress={handleBarcodeInputKeyPress}
//             placeholder="Escanea o ingresa el código de barras"
//             className="flex-grow p-3 border border-gray-300 rounded-l-lg"
//           />
//           <button
//             onClick={openModal}
//             className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-200 flex items-center"
//           >
//             <FaCamera />
//           </button>
//         </div>
//       </div>
      
//       <h3 className="text-xl font-semibold mb-4 text-center">Productos para Dar Salida:</h3>
//       <div className="overflow-x-auto shadow-md sm:rounded-lg mb-6 w-4/5 mx-auto">
//         <table className="min-w-full bg-white">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Nombre</th>
//               {/* <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Código de Barra</th> */}
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Cantidad</th>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Acciones</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {productosSalida.map((product, index) => (
//               <tr key={index} className="hover:bg-gray-100">
//                 <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.nombre}</td>
//                 {/* <td className="py-4 px-6 text-sm text-gray-500">{product.codigoBarra}</td> */}
//                 <td className="py-4 px-6 text-sm text-gray-500">
//                   <input
//                     type="number"
//                     value={product.cantidad}
//                     onChange={(e) => updateQuantity(product.codigoBarra, parseInt(e.target.value, 10))}
//                     className="w-16 p-1 border rounded text-center"
//                     min="1"
//                     max={product.stock}
//                   />
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-500">
//                   <button
//                     onClick={() => removeProduct(product.codigoBarra)}
//                     className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition duration-200"
//                   >
//                     Eliminar
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-center">
//         <button
//           onClick={darSalida}
//           className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 w-40"
//         >
//           Dar Salida
//         </button>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
//             <h2 className="text-xl font-bold mb-4 text-center">Escanear Código de Barras</h2>
//             <video
//               ref={videoRef}
//               className="w-full max-w-xs mx-auto border-2 border-gray-300 rounded-lg bg-black"
//               playsInline
//               muted
//               autoPlay
//             />
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={startContinuousScan}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-200"
//               >
//                 <FaPlay />
//                 <span>Continua</span>
//               </button>
//               <button
//                 onClick={startSingleScan}
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition duration-200"
//               >
//                 <FaPause />
//                 <span>Única</span>
//               </button>
//               <button
//                 onClick={stopScan}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-200"
//               >
//                 <FaStop />
//                 <span>Detener</span>
//               </button>
//             </div>
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

// export default Salida;
















import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { FaPlay, FaPause, FaStop, FaCamera } from 'react-icons/fa';
import BottomNav from '../ButtonNav/ButtonNav.jsx';
import alertify from 'alertifyjs';
import Swal from 'sweetalert2'; // Importar SweetAlert
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';

const Salida = () => {
  const [productosSalida, setProductosSalida] = useState([]);
  const [inputCodigoBarra, setInputCodigoBarra] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const streamRef = useRef(null);

  const checkProductInDB = async (codigo) => {
    try {
      const empresaId = localStorage.getItem('empresaId'); // Obtener el empresaId del localStorage
      const response = await fetch(`https://asijeminapis.website:4687/productos/codigoBarra/${codigo}?empresaId=${empresaId}`);
      if (response.status === 200) {
        const product = await response.json();
        return product;
      } else if (response.status === 404) {
        console.log('Producto no encontrado en la base de datos.');
        return null;
      } else {
        throw new Error('Error al consultar la base de datos');
      }
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      return null;
    }
  };

  const handleScan = async (codigo) => {
    const cleanedCodigo = String(codigo).trim();
    let product = await checkProductInDB(cleanedCodigo);

    if (product) {
      // Verificar el stock mínimo y mostrar advertencia
      if (product.stock <= product.stock_minimo && product.stock_minimo > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia de Stock',
          text: 'El stock de este producto ha llegado al mínimo',
          confirmButtonText: 'Ok'
        });
      } else if (product.stock > product.stock_minimo && product.stock <= (product.stock_minimo * 1.5)) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia de Stock',
          text: `El stock de este producto se está agotando, quedan ${product.stock} unidades.`,
          confirmButtonText: 'Ok'
        });
      }

      setProductosSalida(prevState => {
        const existingProduct = prevState.find(p => p.codigoBarra === cleanedCodigo);
        if (existingProduct) {
          return prevState.map(p =>
            p.codigoBarra === cleanedCodigo
              ? { ...p, cantidad: p.cantidad + 1 }
              : p
          );
        } else {
          return [...prevState, { ...product, cantidad: 1 }];
        }
      });
      alertify.success('Código escaneado correctamente');
    } else {
      alertify.error('Producto no encontrado');
    }
  };

  const updateQuantity = (codigoBarra, newQuantity) => {
    setProductosSalida(prevState =>
      prevState.map(p =>
        p.codigoBarra === codigoBarra
          ? { ...p, cantidad: newQuantity }
          : p
      )
    );
  };

  const removeProduct = (codigoBarra) => {
    setProductosSalida(prevState =>
      prevState.filter(p => p.codigoBarra !== codigoBarra)
    );
  };

  const darSalida = async () => {
    try {
      const empresaId = localStorage.getItem('empresaId'); // Obtener el empresaId del localStorage

      const response = await fetch('https://asijeminapis.website:4687/productos/salida', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ empresaId, productos: productosSalida }) // Asegurarse de enviar `empresaId` y `productos`
      });

      if (response.ok) {
        alertify.success("Salida de productos realizada exitosamente");
        setProductosSalida([]); 
      } else {
        const errorData = await response.json();
        alertify.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al realizar la salida de productos:', error);
      alertify.error('Hubo un problema al intentar dar salida a los productos');
    }
  };

  const startContinuousScan = () => {
    codeReader.current.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
      if (result) {
        handleScan(result.text);
      }
      if (err && err.name !== 'NotFoundException') {
        console.error("Error durante el escaneo:", err);
      }
    });
  };

  const startSingleScan = () => {
    codeReader.current.decodeOnceFromVideoDevice(undefined, videoRef.current)
      .then(result => {
        handleScan(result.text);
      })
      .catch(err => {
        console.error("Error durante el escaneo único:", err);
        alertify.error('Error durante el escaneo.');
      });
  };

  const stopScan = () => {
    codeReader.current.reset();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
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
        startSingleScan();
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara:", err);
        alertify.error("Error al acceder a la cámara.");
      });
  };

  const closeModal = () => {
    stopScan();
    setIsModalOpen(false);
  };

  const handleBarcodeInputChange = (e) => {
    setInputCodigoBarra(e.target.value);
  };

  const handleBarcodeInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleScan(inputCodigoBarra);
      setInputCodigoBarra(''); 
    }
  };

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();
    return () => {
      stopScan();
    };
  }, []);

  return (
    <div className="container mx-auto p-6 mb-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dar Salida de Productos</h2>

      <div className="mb-6 flex justify-center">
        <div className="flex w-full max-w-md">
          <input
            type="text"
            value={inputCodigoBarra}
            onChange={handleBarcodeInputChange}
            onKeyPress={handleBarcodeInputKeyPress}
            placeholder="Escanea o ingresa el código de barras"
            className="flex-grow p-3 border border-gray-300 rounded-l-lg"
          />
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-200 flex items-center"
          >
            <FaCamera />
          </button>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4 text-center">Productos para Dar Salida:</h3>
      <div className="overflow-x-auto shadow-md sm:rounded-lg mb-6 w-4/5 mx-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Nombre</th>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Cantidad</th>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productosSalida.map((product, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.nombre}</td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  <input
                    type="number"
                    value={product.cantidad}
                    onChange={(e) => updateQuantity(product.codigoBarra, parseInt(e.target.value, 10))}
                    className="w-16 p-1 border rounded text-center"
                    min="1"
                    max={product.stock}
                  />
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  <button
                    onClick={() => removeProduct(product.codigoBarra)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <button
          onClick={darSalida}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 w-40"
        >
          Dar Salida
        </button>
      </div>

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
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-200"
              >
                <FaPlay />
                <span>Continua</span>
              </button>
              <button
                onClick={startSingleScan}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition duration-200"
              >
                <FaPause />
                <span>Única</span>
              </button>
              <button
                onClick={stopScan}
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-200"
              >
                <FaStop />
                <span>Detener</span>
              </button>
            </div>
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

export default Salida;
