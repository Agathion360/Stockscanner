// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2'; // Importar SweetAlert

// const Stock = () => {
//   const [productos, setProductos] = useState([]);

//   const fetchProductos = async () => {
//     try {
//       const empresaId = localStorage.getItem('empresaId'); // Obtener el empresaId desde localStorage
//       const response = await fetch(`http://localhost:4687/productos?empresaId=${empresaId}`); // Pasar el empresaId en la URL
//       const data = await response.json();

//       // Asegurarse de que la respuesta es un array
//       if (Array.isArray(data)) {
//         setProductos(data);

//         // Verificar si hay productos con advertencias y mostrar alertas
//         data.forEach(producto => {
//           if (producto.advertencia) {
//             Swal.fire({
//               icon: 'warning',
//               title: 'Advertencia de Stock',
//               text: producto.advertencia,
//               confirmButtonText: 'Ok'
//             });
//           }
//         });
//       } else {
//         console.error('La respuesta de la API no es un array:', data);
//         setProductos([]); // Configura un array vacío si la respuesta no es un array
//       }
//     } catch (error) {
//       console.error('Error al obtener los productos:', error);
//       setProductos([]); // Configura un array vacío si hay un error
//     }
//   };

//   useEffect(() => {
//     fetchProductos();
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Stock de Productos</h2>
//       <div className="overflow-x-auto shadow-md sm:rounded-lg mb-20 w-6/8 mx-auto"> 
//         <table className="min-w-full bg-white">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Nombre</th>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Precio Venta</th>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Vencimiento</th>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Stock</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {productos.length > 0 ? (
//               productos.map(producto => (
//                 <tr key={producto._id} className="hover:bg-gray-100">
//                   <td className="py-4 px-6 text-sm font-medium text-gray-900">{producto.nombre}</td>
//                   <td className="py-4 px-6 text-sm text-gray-500">${producto.precioVenta}</td>
//                   <td className="py-4 px-6 text-sm text-gray-500">{producto.fecha_vencimiento}</td>

//                   <td className="py-4 px-6 text-sm text-gray-500">{producto.stock}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3" className="py-4 px-6 text-sm font-medium text-gray-900 text-center">
//                   No hay productos disponibles.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <BottomNav />
//     </div>
//   );
// };

// export default Stock;





// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import { FaExclamationTriangle } from 'react-icons/fa'; // Importar el icono de advertencia

// const Stock = () => {
//   const [productos, setProductos] = useState([]);

//   const fetchProductos = async () => {
//     try {
//       const empresaId = localStorage.getItem('empresaId'); // Obtener el empresaId desde localStorage
//       const response = await fetch(`http://localhost:4687/productos?empresaId=${empresaId}`); // Pasar el empresaId en la URL
//       const data = await response.json();

//       // Asegurarse de que la respuesta es un array
//       if (Array.isArray(data)) {
//         setProductos(data);
//       } else {
//         console.error('La respuesta de la API no es un array:', data);
//         setProductos([]); // Configura un array vacío si la respuesta no es un array
//       }
//     } catch (error) {
//       console.error('Error al obtener los productos:', error);
//       setProductos([]); // Configura un array vacío si hay un error
//     }
//   };

//   useEffect(() => {
//     fetchProductos();
//   }, []);

//   // Función para determinar si el producto está vencido, cerca de vencerse o en buen estado
//   const determinarClaseFila = (producto) => {
//     const hoy = new Date();
//     const fechaVencimiento = producto.fecha_vencimiento ? new Date(producto.fecha_vencimiento) : null;
//     const unaSemana = 7 * 24 * 60 * 60 * 1000;

//     let claseFila = '';
//     let iconoAdvertencia = null;

//     // Comprobación de la fecha de vencimiento
//     if (fechaVencimiento && !isNaN(fechaVencimiento.getTime())) { // Comprobar que la fecha es válida
//       if (fechaVencimiento < hoy) {
//         claseFila = 'bg-red-500 text-white'; // Producto vencido
//         iconoAdvertencia = <FaExclamationTriangle className="inline-block text-white ml-2" />;
//       } else if (fechaVencimiento - hoy <= unaSemana) {
//         claseFila = 'bg-yellow-300 text-black'; // Producto a punto de vencer (en una semana o menos)
//         iconoAdvertencia = <FaExclamationTriangle className="inline-block text-black ml-2" />;
//       }
//     }

//     // Comprobación de stock
//     if (producto.stock <= producto.stock_minimo && producto.stock_minimo > 0) {
//       claseFila = 'bg-red-500 text-white'; // Stock mínimo o agotado
//       iconoAdvertencia = <FaExclamationTriangle className="inline-block text-white ml-2" />;
//     } else if (producto.stock > producto.stock_minimo && producto.stock <= producto.stock_minimo * 1.5) {
//       claseFila = 'bg-yellow-300 text-black'; // Stock bajo pero no mínimo
//       iconoAdvertencia = <FaExclamationTriangle className="inline-block text-black ml-2" />;
//     }

//     return { claseFila, iconoAdvertencia };
//   };

//   const formatFecha = (fecha) => {
//     if (!fecha) return 'Sin fecha'; // Si no hay fecha, devolver "Sin fecha"
//     const fechaFormateada = new Date(fecha);
//     return !isNaN(fechaFormateada.getTime()) // Comprobar si la fecha es válida
//       ? fechaFormateada.toLocaleDateString('es-AR') // Formatear en formato día/mes/año
//       : 'Fecha inválida'; // Si la fecha es inválida
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Stock de Productos</h2>
//       <div className="overflow-x-auto shadow-md sm:rounded-lg mb-20 w-6/8 mx-auto"> 
//         <table className="min-w-full bg-white">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Nombre</th>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Precio Venta</th>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Vencimiento</th>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Stock</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {productos.length > 0 ? (
//               productos.map(producto => {
//                 const { claseFila, iconoAdvertencia } = determinarClaseFila(producto);
//                 return (
//                   <tr key={producto._id} className={`hover:bg-gray-100 ${claseFila}`}>
//                     <td className="py-4 px-6 text-sm font-medium text-gray-900">
//                       {producto.nombre}
//                       {iconoAdvertencia} {/* Mostrar el icono de advertencia si corresponde */}
//                     </td>
//                     <td className="py-4 px-6 text-sm text-gray-500">${producto.precioVenta}</td>
//                     <td className="py-4 px-6 text-sm text-gray-500">
//                       {formatFecha(producto.fecha_vencimiento)}
//                     </td>
//                     <td className="py-4 px-6 text-sm text-gray-500">{producto.stock}</td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="4" className="py-4 px-6 text-sm font-medium text-gray-900 text-center">
//                   No hay productos disponibles.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <BottomNav />
//     </div>
//   );
// };

// export default Stock;







// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import { FaExclamationTriangle } from 'react-icons/fa'; // Importar el icono de advertencia

// const Stock = () => {
//   const [productos, setProductos] = useState([]);

//   const fetchProductos = async () => {
//     try {
//       const empresaId = localStorage.getItem('empresaId'); // Obtener el empresaId desde localStorage
//       const response = await fetch(`http://localhost:4687/productos?empresaId=${empresaId}`); // Pasar el empresaId en la URL
//       const data = await response.json();

//       // Asegurarse de que la respuesta es un array
//       if (Array.isArray(data)) {
//         setProductos(data);
//       } else {
//         console.error('La respuesta de la API no es un array:', data);
//         setProductos([]); // Configura un array vacío si la respuesta no es un array
//       }
//     } catch (error) {
//       console.error('Error al obtener los productos:', error);
//       setProductos([]); // Configura un array vacío si hay un error
//     }
//   };

//   useEffect(() => {
//     fetchProductos();
//   }, []);

//   // Función para determinar si el producto está vencido, cerca de vencerse o en buen estado
//   const determinarClaseFila = (producto) => {
//     const hoy = new Date();
//     const fechaVencimiento = producto.fecha_vencimiento ? new Date(producto.fecha_vencimiento) : null;
//     const unaSemana = 7 * 24 * 60 * 60 * 1000;

//     let claseFila = '';
//     let iconoAdvertencia = null;

//     // Comprobación de la fecha de vencimiento
//     if (fechaVencimiento && !isNaN(fechaVencimiento.getTime())) { // Comprobar que la fecha es válida
//       if (fechaVencimiento < hoy) {
//         claseFila = 'bg-red-500 text-white'; // Producto vencido
//         iconoAdvertencia = <FaExclamationTriangle className="inline-block text-white ml-2" />;
//       } else if (fechaVencimiento - hoy <= unaSemana) {
//         claseFila = 'bg-yellow-300 text-black'; // Producto a punto de vencer (en una semana o menos)
//         iconoAdvertencia = <FaExclamationTriangle className="inline-block text-black ml-2" />;
//       }
//     }

//     // Comprobación de stock
//     if (producto.stock <= producto.stock_minimo && producto.stock_minimo > 0) {
//       claseFila = 'bg-red-500 text-white'; // Stock mínimo o agotado
//       iconoAdvertencia = <FaExclamationTriangle className="inline-block text-white ml-2" />;
//     } else if (producto.stock > producto.stock_minimo && producto.stock <= producto.stock_minimo * 1.5) {
//       claseFila = 'bg-yellow-300 text-black'; // Stock bajo pero no mínimo
//       iconoAdvertencia = <FaExclamationTriangle className="inline-block text-black ml-2" />;
//     }

//     return { claseFila, iconoAdvertencia };
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Stock de Productos</h2>
//       <div className="overflow-x-auto shadow-md sm:rounded-lg mb-20 w-6/8 mx-auto"> 
//         <table className="min-w-full bg-white">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Nombre</th>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Precio Venta</th>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Vencimiento</th>
//               <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Stock</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {productos.length > 0 ? (
//               productos.map(producto => {
//                 const { claseFila, iconoAdvertencia } = determinarClaseFila(producto);
//                 return (
//                   <tr key={producto._id} className={`hover:bg-gray-100 ${claseFila}`}>
//                     <td className="py-4 px-6 text-sm font-medium text-gray-900">
//                       {producto.nombre}
//                       {iconoAdvertencia} {/* Mostrar el icono de advertencia si corresponde */}
//                     </td>
//                     <td className="py-4 px-6 text-sm text-gray-500">${producto.precioVenta}</td>
//                     <td className="py-4 px-6 text-sm text-gray-500">
//                       {producto.fecha_vencimiento ? producto.fecha_vencimiento : 'Sin fecha'}
//                     </td>
//                     <td className="py-4 px-6 text-sm text-gray-500">{producto.stock}</td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="4" className="py-4 px-6 text-sm font-medium text-gray-900 text-center">
//                   No hay productos disponibles.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <BottomNav />
//     </div>
//   );
// };

// export default Stock;




import React, { useState, useEffect } from 'react';
import BottomNav from '../ButtonNav/ButtonNav.jsx';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importar el icono de advertencia

const Stock = () => {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      const empresaId = localStorage.getItem('empresaId'); // Obtener el empresaId desde localStorage
      const response = await fetch(`https://asijeminapis.website:4687/productos?empresaId=${empresaId}`, {

        credentials: 'include', // Incluir credenciales si es necesario
      }); // Pasar el empresaId en la URL

      const data = await response.json();

      // Asegurarse de que la respuesta es un array
      if (Array.isArray(data)) {
        setProductos(data);
      } else {
        console.error('La respuesta de la API no es un array:', data);
        setProductos([]); // Configura un array vacío si la respuesta no es un array
      }
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      setProductos([]); // Configura un array vacío si hay un error
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Función para determinar las clases y los iconos de advertencia en la fila del producto
  const determinarAdvertencias = (producto) => {
    const hoy = new Date(); // Fecha actual
    const fechaVencimiento = producto.fecha_vencimiento ? new Date(producto.fecha_vencimiento) : null;
    const unaSemana = 7 * 24 * 60 * 60 * 1000;

    let claseFila = '';
    let advertenciaFecha = null;
    let advertenciaStock = null;

    // Comprobación de la fecha de vencimiento
    if (fechaVencimiento && !isNaN(fechaVencimiento.getTime())) {
      if (fechaVencimiento < hoy) {
        // Producto vencido
        claseFila = 'bg-red-500 text-white'; // Cambiar color de la fila
        advertenciaFecha = <FaExclamationTriangle className="inline-block text-white ml-2" />; // Icono de advertencia
      } else if (fechaVencimiento.getTime() - hoy.getTime() <= unaSemana) {
        // Producto a punto de vencer
        claseFila = 'bg-yellow-300 text-black'; // Cambiar color de la fila
        advertenciaFecha = <FaExclamationTriangle className="inline-block text-black ml-2" />; // Icono de advertencia
      }
    }

    // Comprobación de stock
    if (producto.stock <= producto.stock_minimo && producto.stock_minimo > 0) {
      // Stock en el mínimo o agotado
      claseFila = 'bg-red-500 text-white'; // Cambiar color de la fila
      advertenciaStock = <FaExclamationTriangle className="inline-block text-white ml-2" />; // Icono de advertencia
    } else if (producto.stock > producto.stock_minimo && producto.stock <= producto.stock_minimo * 1.5) {
      // Stock bajo pero no mínimo
      claseFila = 'bg-yellow-300 text-black'; // Cambiar color de la fila
      advertenciaStock = <FaExclamationTriangle className="inline-block text-black ml-2" />; // Icono de advertencia
    }

    return { claseFila, advertenciaFecha, advertenciaStock };
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Stock de Productos</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg mb-20 w-6/8 mx-auto"> 
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Nombre</th>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Precio Venta</th>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Vencimiento</th>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productos.length > 0 ? (
              productos.map(producto => {
                const { claseFila, advertenciaFecha, advertenciaStock } = determinarAdvertencias(producto);
                return (
                  <tr key={producto._id} className={`hover:bg-gray-100 ${claseFila}`}>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                      {producto.nombre}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">${producto.precioVenta}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {producto.fecha_vencimiento ? producto.fecha_vencimiento : 'Sin fecha'}
                      {advertenciaFecha} {/* Mostrar el icono de advertencia si la fecha está vencida o cerca de vencerse */}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {producto.stock}
                      {advertenciaStock} {/* Mostrar el icono de advertencia si el stock está bajo */}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-6 text-sm font-medium text-gray-900 text-center">
                  No hay productos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <BottomNav />
    </div>
  );
};

export default Stock;
