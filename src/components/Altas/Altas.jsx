// import React, { useEffect, useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import axios from 'axios';

// const Altas = () => {
//   const [usuarios, setUsuarios] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { userRole } = useContext(AuthContext);
//   const navigate = useNavigate();

//   console.log(usuarios);
  
//   useEffect(() => {
//     // Verificar si el usuario tiene rol "dios" y redirigir si no es así
//     if (userRole !== 'dios') {
//       navigate('/inicio');
//       return;
//     }

//     // Función para obtener la lista de usuarios
//     const fetchUsuarios = async () => {
//       try {
//         const response = await axios.get('http://localhost:5324/usuarios/list', {
//           withCredentials: true, // Enviar cookies con la solicitud
//         });
//         setUsuarios(response.data);
//       } catch (error) {
//         console.error('Error al obtener la lista de usuarios:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsuarios();
//   }, [userRole, navigate]);

//   if (loading) {
//     return <div>Cargando...</div>;
//   }

//   return (
//     <>
//     <div className="p-6 bg-gray-100 min-h-screen ">
//       <h1 className="text-3xl font-bold text-center mb-6">Lista de Usuarios</h1>
      
//       <div className="overflow-x-hidden">
//         <table className="w-100 bg-white shadow-md rounded-lg">
//           <thead>
//             <tr className="bg-indigo-600 text-white">
//               <th className="px-6 py-3 text-left font-semibold">ID</th>
//               <th className="px-6 py-3 text-left font-semibold">Empresa</th>
//               <th className="px-6 py-3 text-left font-semibold">Nombre</th>
//               <th className="px-6 py-3 text-left font-semibold">Nombre de Usuario</th>
//               <th className="px-6 py-3 text-left font-semibold">Rol usuario</th>
//               <th className="px-6 py-3 text-left font-semibold">Correo</th>
//               <th className="px-6 py-3 text-left font-semibold">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {usuarios.map((usuario, index) => (
//               <tr key={usuario._id} className={`hover:bg-indigo-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
//                 <td className="px-6 py-4 border-b">{usuario._id}</td>
//                 <td className="px-6 py-4 border-b">{usuario.empresa.nombre}</td>
//                 <td className="px-6 py-4 border-b">{usuario.nombre} {usuario.apellido}</td>
//                 <td className="px-6 py-4 border-b">{usuario.nombreUsuario}</td>
//                 <td className="px-6 py-4 border-b">{usuario.rol}</td>
//                 <td className="px-6 py-4 border-b">{usuario.correo}</td>
//                 <td className="px-6 py-4 border-b text-center">
//                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 transition duration-200">
//                     Editar
//                   </button>
//                   <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition duration-200">
//                     Desactivar
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <BottomNav />
//     </div>

//     </>
//   );
// };

// export default Altas;







// import React, { useEffect, useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import axios from 'axios';

// const Altas = () => {
//   const [usuarios, setUsuarios] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { userRole } = useContext(AuthContext);
//   const navigate = useNavigate();

//   console.log(usuarios);
  
//   useEffect(() => {
//     if (userRole !== 'dios') {
//       navigate('/inicio');
//       return;
//     }

//     const fetchUsuarios = async () => {
//       try {
//         const response = await axios.get('http://localhost:5324/usuarios/list', {
//           withCredentials: true,
//         });
//         setUsuarios(response.data);
//       } catch (error) {
//         console.error('Error al obtener la lista de usuarios:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsuarios();
//   }, [userRole, navigate]);

//   const toggleEstadoUsuario = async (usuarioId, estadoActual) => {
//     const accion = estadoActual ? 'desactivar' : 'activar';
//     const url = `http://localhost:5324/usuarios/${accion}/${usuarioId}`;

//     try {
//       await axios.post(url, {}, { withCredentials: true });
      
//       // Actualizamos el estado local para reflejar el cambio
//       setUsuarios((usuarios) =>
//         usuarios.map((usuario) =>
//           usuario._id === usuarioId ? { ...usuario, estadoActivo: !estadoActual } : usuario
//         )
//       );
//     } catch (error) {
//       console.error(`Error al ${accion} el usuario:`, error);
//     }
//   };

//   if (loading) {
//     return <div>Cargando...</div>;
//   }

//   return (
//     <>
//       <div className="p-6 bg-gray-100 min-h-screen">
//         <h1 className="text-3xl font-bold text-center mb-6">Lista de Usuarios</h1>
        
//         <div className="overflow-x-hidden">
//           <table className="w-100 bg-white shadow-md rounded-lg">
//             <thead>
//               <tr className="bg-indigo-600 text-white">
//                 <th className="px-6 py-3 text-left font-semibold">ID</th>
//                 <th className="px-6 py-3 text-left font-semibold">Empresa</th>
//                 <th className="px-6 py-3 text-left font-semibold">Nombre</th>
//                 <th className="px-6 py-3 text-left font-semibold">Nombre de Usuario</th>
//                 <th className="px-6 py-3 text-left font-semibold">Rol usuario</th>
//                 <th className="px-6 py-3 text-left font-semibold">Correo</th>
//                 <th className="px-6 py-3 text-left font-semibold">Acciones</th>
//               </tr>
//             </thead>
//             <tbody>
//               {usuarios.map((usuario, index) => (
//                 <tr key={usuario._id} className={`hover:bg-indigo-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
//                   <td className="px-6 py-4 border-b">{usuario._id}</td>
//                   <td className="px-6 py-4 border-b">{usuario.empresa.nombre}</td>
//                   <td className="px-6 py-4 border-b">{usuario.nombre} {usuario.apellido}</td>
//                   <td className="px-6 py-4 border-b">{usuario.nombreUsuario}</td>
//                   <td className="px-6 py-4 border-b">{usuario.rol}</td>
//                   <td className="px-6 py-4 border-b">{usuario.correo}</td>
//                   <td className="px-6 py-4 border-b text-center">
//                     {usuario.estadoActivo ? (
//                       <button
//                         onClick={() => toggleEstadoUsuario(usuario._id, usuario.estadoActivo)}
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition duration-200"
//                       >
//                         Desactivar
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => toggleEstadoUsuario(usuario._id, usuario.estadoActivo)}
//                         className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded transition duration-200"
//                       >
//                         Activar
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <BottomNav />
//       </div>
//     </>
//   );
// };

// export default Altas;




import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../ButtonNav/ButtonNav.jsx';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importamos los iconos
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const Altas = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== 'dios') {
      navigate('/inicio');
      return;
    }

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5324/usuarios/list', {
          withCredentials: true,
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [userRole, navigate]);

  const toggleEstadoUsuario = async (usuarioId, estadoActual) => {
    const accion = estadoActual ? 'desactivar' : 'activar';
    const url = `http://localhost:5324/usuarios/${accion}/${usuarioId}`;

    try {
      await axios.post(url, {}, { withCredentials: true });
      
      // Actualizamos el estado local para reflejar el cambio
      setUsuarios((usuarios) =>
        usuarios.map((usuario) =>
          usuario._id === usuarioId ? { ...usuario, estadoActivo: !estadoActual } : usuario
        )
      );
    } catch (error) {
      console.error(`Error al ${accion} el usuario:`, error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Lista de Usuarios</h1>
        
        <div className="overflow-x-hidden">
          <table className="w-100 bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">Empresa</th>
                <th className="px-6 py-3 text-left font-semibold">Nombre</th>
                <th className="px-6 py-3 text-left font-semibold">Nombre de Usuario</th>
                <th className="px-6 py-3 text-left font-semibold">Rol usuario</th>
                <th className="px-6 py-3 text-left font-semibold">Correo</th>
                <th className="px-6 py-3 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={usuario._id} className={`hover:bg-indigo-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-6 py-4 border-b">{usuario._id}</td>
                  <td className="px-6 py-4 border-b">{usuario.empresa.nombre}</td>
                  <td className="px-6 py-4 border-b">{usuario.nombre} {usuario.apellido}</td>
                  <td className="px-6 py-4 border-b">{usuario.nombreUsuario}</td>
                  <td className="px-6 py-4 border-b">{usuario.rol}</td>
                  <td className="px-6 py-4 border-b">{usuario.correo}</td>
                  <td className="px-6 py-4 border-b text-center">
                    {usuario.estadoActivo ? (
                      <button
                        onClick={() => toggleEstadoUsuario(usuario._id, usuario.estadoActivo)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition duration-200 flex items-center justify-center"
                      >
                        <AiOutlineClose  className="mr-1" /> {/* Icono para Desactivar */}
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleEstadoUsuario(usuario._id, usuario.estadoActivo)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded transition duration-200 flex items-center justify-center"
                      >
                        <AiOutlineCheck  className="mr-1" /> {/* Icono para Activar */}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <BottomNav />
      </div>
    </>
  );
};

export default Altas;
