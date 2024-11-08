
// import React, { useState, useRef, useEffect } from 'react';
// import { FaBarcode, FaTrash } from 'react-icons/fa';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import { BrowserMultiFormatReader } from '@zxing/library';
// import Swal from 'sweetalert2';
// import alertify from 'alertifyjs';
// import 'alertifyjs/build/css/alertify.css';
// import 'alertifyjs/build/css/themes/default.css';

// const Ingreso = () => {
//   const [nombre, setNombre] = useState('');
//   const [precio, setPrecio] = useState('');
//   const [precioVenta, setPrecioVenta] = useState('');
//   const [stock, setStock] = useState('');
//   const [categoria, setCategoria] = useState('');
//   const [codigoBarra, setCodigoBarra] = useState('');
//   const [categorias, setCategorias] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const videoRef = useRef(null);
//   const codeReader = useRef(null);
//   const streamRef = useRef(null);

//   useEffect(() => {
//     const fetchCategorias = async () => {
//       try {
//         const response = await fetch('http://localhost:4687/categorias');
//         const data = await response.json();
//         setCategorias(data);
//       } catch (error) {
//         console.error('Error al obtener las categorías:', error);
//       }
//     };

//     fetchCategorias();
//   }, []);


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const empresaId = localStorage.getItem('empresaId');

//     if (!empresaId) {
//         alertify.error('No se pudo obtener la empresa. Por favor, verifica tu sesión.');
//         return;
//     }

//     const nuevoProducto = {
//         nombre,
//         precio: parseFloat(precio),
//         precioVenta: parseFloat(precioVenta),
//         stock: parseInt(stock, 10),
//         categoria, // Asegúrate de que este valor es correcto y es un ObjectId válido
//         codigoBarra,
//         empresa: empresaId
//     };

//     console.log('Datos del nuevo producto:', nuevoProducto);

//     try {
//         const response = await fetch('http://localhost:4687/productos', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(nuevoProducto)
//         });

//         if (response.ok) {
//             Swal.fire({
//                 title: "Ingreso de productos",
//                 text: "Producto ingresado exitosamente",
//                 icon: "success"
//             });
//             setNombre('');
//             setPrecio('');
//             setPrecioVenta('');
//             setStock('');
//             setCategoria('');
//             setCodigoBarra('');
//         } else {
//             const errorData = await response.json();
//             alertify.error(`Error al ingresar el producto: ${errorData.message}`);
//         }
//     } catch (error) {
//         console.error('Error al ingresar el producto:', error);
//         alertify.error('Hubo un error al ingresar el producto. Por favor, intenta nuevamente.');
//     }
// };



//   const startScan = async () => {
//     try {
//       const result = await codeReader.current.decodeOnceFromVideoDevice(undefined, videoRef.current);
//       console.log("Código de barras escaneado:", result.text);
//       setCodigoBarra(result.text);
//       alertify.success('Código de barras escaneado correctamente');
//       closeModal();
//     } catch (err) {
//       console.error("Error durante el escaneo:", err);
//       alertify.error('Hubo un error al escanear el código de barras.');
//     }
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//     codeReader.current = new BrowserMultiFormatReader();
    
//     const constraints = {
//       video: {
//         facingMode: { exact: "environment" } // Esto intentará usar la cámara trasera
//       }
//     };
    
//     navigator.mediaDevices.getUserMedia(constraints)
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//         streamRef.current = stream;
//         startScan();
//       })
//       .catch((err) => {
//         console.error("Error al acceder a la cámara:", err);
//         alertify.error('No se pudo acceder a la cámara.');
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
//     alertify.success('Código de barras eliminado.');
//   };

//   useEffect(() => {
//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-20">
//       <h3 className="text-3xl font-bold mb-6 text-center">Alta Nuevos Productos</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex flex-col">
//           <label className="mb-2 font-medium">Nombre:</label>
//           <input
//             type="text"
//             value={nombre}
//             onChange={(e) => setNombre(e.target.value)}
//             className="p-2 border border-gray-300 rounded-lg"
//             required
//           />
//         </div>
        
//         {/* Sección de Precio, Precio de Venta y Stock */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="flex flex-col">
//             <label className="mb-2 font-medium">Precio:</label>
//             <input
//               type="number"
//               value={precio}
//               onChange={(e) => setPrecio(e.target.value)}
//               className="p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="mb-2 font-medium">Precio de Venta:</label>
//             <input
//               type="number"
//               value={precioVenta}
//               onChange={(e) => setPrecioVenta(e.target.value)}
//               className="p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="mb-2 font-medium">Stock:</label>
//             <input
//               type="number"
//               value={stock}
//               onChange={(e) => setStock(e.target.value)}
//               className="p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-2 font-medium">Categoría:</label>
//           <select
//             value={categoria}
//             onChange={(e) => setCategoria(e.target.value)}
//             className="p-2 border border-gray-300 rounded-lg"
//             required
//           >
//             <option value="">Seleccione una categoría</option>
//             {categorias.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.nombre}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-2 font-medium">Código de Barra:</label>
//           <div className="flex space-x-2 items-center">
//             <input
//               type="text"
//               value={codigoBarra}
//               onChange={(e) => setCodigoBarra(e.target.value)}
//               className="p-2 border border-gray-300 rounded-lg flex-grow"
//               required
//             />
//             <button
//               type="button"
//               onClick={openModal}
//               className="p-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-200"
//             >
//               <FaBarcode />
//             </button>
//             <button
//               type="button"
//               onClick={clearCodigoBarra}
//               className="p-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-200"
//             >
//               <FaTrash />
//             </button>
//           </div>
//         </div>
//         <button type="submit" className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200">
//           Ingresar Producto
//         </button>
//       </form>

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
//             <button
//               onClick={closeModal}
//               className="w-full mt-4 p-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition duration-200"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       )}

//       <BottomNav /> {/* Barra de navegación inferior */}
//     </div>
//   );
// };

// export default Ingreso;










import React, { useState, useRef, useEffect } from 'react';
import { FaBarcode, FaTrash } from 'react-icons/fa';
import BottomNav from '../ButtonNav/ButtonNav.jsx';
import { BrowserMultiFormatReader } from '@zxing/library';
import Swal from 'sweetalert2';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';

const Ingreso = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [stock, setStock] = useState('');
  const [stockMinimo, setStockMinimo] = useState(''); // Nuevo estado para stock mínimo
  const [fechaVencimiento, setFechaVencimiento] = useState(''); // Nuevo estado para fecha de vencimiento
  const [categoria, setCategoria] = useState('');
  const [codigoBarra, setCodigoBarra] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const streamRef = useRef(null);


  
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('https://asijeminapis.website:4687/categorias');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const empresaId = localStorage.getItem('empresaId');

    if (!empresaId) {
        alertify.error('No se pudo obtener la empresa. Por favor, verifica tu sesión.');
        return;
    }

    const nuevoProducto = {
        nombre,
        precio: parseFloat(precio),
        precioVenta: parseFloat(precioVenta),
        stock: parseInt(stock, 10),
        stock_minimo: parseInt(stockMinimo, 10), // Incluir stock mínimo
        fecha_vencimiento: fechaVencimiento ? new Date(`${fechaVencimiento}T00:00:00.000Z`) : null, 
        categoria,
        codigoBarra,
        empresa: empresaId
    };

    try {
        const response = await fetch('https://asijeminapis.website:4687/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        });

        if (response.ok) {
            Swal.fire({
                title: "Ingreso de productos",
                text: "Producto ingresado exitosamente",
                icon: "success"
            });
            setNombre('');
            setPrecio('');
            setPrecioVenta('');
            setStock('');
            setStockMinimo(''); // Limpiar stock mínimo
            setFechaVencimiento(''); // Limpiar fecha de vencimiento
            setCategoria('');
            setCodigoBarra('');
        } else {
            const errorData = await response.json();
            alertify.error(`Error al ingresar el producto: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error al ingresar el producto:', error);
        alertify.error('Hubo un error al ingresar el producto. Por favor, intenta nuevamente.');
    }
  };

  const startScan = async () => {
    try {
      const result = await codeReader.current.decodeOnceFromVideoDevice(undefined, videoRef.current);
      console.log("Código de barras escaneado:", result.text);
      setCodigoBarra(result.text);
      alertify.success('Código de barras escaneado correctamente');
      closeModal();
    } catch (err) {
      console.error("Error durante el escaneo:", err);
      alertify.error('Hubo un error al escanear el código de barras.');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    codeReader.current = new BrowserMultiFormatReader();
    
    const constraints = {
      video: {
        facingMode: { exact: "environment" } // Esto intentará usar la cámara trasera
      }
    };
    
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        startScan();
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara:", err);
        alertify.error('No se pudo acceder a la cámara.');
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
    alertify.success('Código de barras eliminado.');
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);


  console.log(categoria)
  
  console.log(categorias)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-20">
      <h3 className="text-3xl font-bold mb-6 text-center">Alta Nuevos Productos</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Sección de Precio, Precio de Venta, Stock y Stock Mínimo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Precio:</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Precio de Venta:</label>
            <input
              type="number"
              value={precioVenta}
              onChange={(e) => setPrecioVenta(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Stock Mínimo:</label>
            <input
              type="number"
              value={stockMinimo}
              onChange={(e) => setStockMinimo(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Campo para la Fecha de Vencimiento */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Fecha de Vencimiento:</label>
          <input
            type="date"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Categoría:</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Código de Barra:</label>
          <div className="flex space-x-2 items-center">
            <input
              type="text"
              value={codigoBarra}
              onChange={(e) => setCodigoBarra(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg flex-grow"
              required
            />
            <button
              type="button"
              onClick={openModal}
              className="p-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-200"
            >
              <FaBarcode />
            </button>
            <button
              type="button"
              onClick={clearCodigoBarra}
              className="p-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-200"
            >
              <FaTrash />
            </button>
          </div>
        </div>
        <button type="submit" className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200">
          Ingresar Producto
        </button>
      </form>

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
            <button
              onClick={closeModal}
              className="w-full mt-4 p-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <BottomNav /> {/* Barra de navegación inferior */}
    </div>
  );
};

export default Ingreso;
