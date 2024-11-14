// import React, { useContext } from 'react';  // Importa useContext
// import { FaBarcode, FaBoxOpen, FaWarehouse, FaArrowDown, FaCogs, FaSearch, FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './ButtonNav.css';
// import { AuthContext } from '../context/AuthContext.js';  // Asegúrate de que la ruta al AuthContext sea correcta

// const BottomNav = () => {
//   const navigate = useNavigate();
//   const { setIsAuthenticated } = useContext(AuthContext);  // Usa el contexto de autenticación

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5324/usuarios/logout', {}, { withCredentials: true });  // Llamada a la API de logout
//       localStorage.removeItem('empresaId');  // Limpia cualquier dato que esté guardado en localStorage
//       setIsAuthenticated(false);  // Actualiza el estado del contexto para indicar que ya no está autenticado
//       navigate('/');  // Redirige al usuario al login
//     } catch (error) {
//       console.error('Error al cerrar sesión:', error);
//     }
//   };

//   return (
//     <div className="fixed bottom-0 left-0 right-0 botoneraintferior shadow-lg p-4 grid grid-cols-4 gap-4 sm:flex sm:justify-around">
//       <Link to="/inicio" className="flex flex-col items-center justify-center">
//         <FaHome className="text-blue-500 text-2xl mb-1" />
//         <span className="text-xs">Inicio</span>
//       </Link>

//       <Link to="/scaner" className="flex flex-col items-center justify-center">
//         <FaBarcode className="text-blue-500 text-2xl mb-1" />
//         <span className="text-xs">Control de Stock</span>
//       </Link>

//       <Link to="/ingreso" className="flex flex-col items-center justify-center">
//         <FaBoxOpen className="text-green-500 text-2xl mb-1" />
//         <span className="text-xs">Ingreso Nuevos Productos</span>
//       </Link>

//       <Link to="/stock" className="flex flex-col items-center justify-center">
//         <FaWarehouse className="text-gray-500 text-2xl mb-1" />
//         <span className="text-xs">Stock de Productos</span>
//       </Link>

//       <Link to="/salida" className="flex flex-col items-center justify-center">
//         <FaArrowDown className="text-orange-500 text-2xl mb-1" />
//         <span className="text-xs">Salida de Productos</span>
//       </Link>

//       <Link to="/consulta" className="flex flex-col items-center">
//         <FaSearch className="text-orange-700 text-2xl mb-1" />
//         <span className="text-xs">Consultar Producto</span>
//       </Link>

//       <Link to="/perfil" className="flex flex-col items-center text-center">
//         <FaUser className="text-emerald-400 text-2xl mb-2" />
//         <span className="text-sm">Mi Perfil</span>
//       </Link>

//       <button onClick={handleLogout} className="flex flex-col items-center text-center">
//         <FaSignOutAlt className="text-red-500 text-2xl mb-2" />
//         <span className="text-sm">Cerrar Sesión</span>
//       </button>

//       <div className="flex flex-col items-center justify-center">
//         <FaCogs className="text-gray-500 text-2xl mb-1" />
//         <span className="text-xs">Configuración</span>
//       </div>
//     </div>
//   );
// };

// export default BottomNav;



import React, { useContext } from 'react';
import { FaBarcode, FaBoxOpen, FaWarehouse, FaArrowDown, FaCogs, FaSearch, FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ButtonNav.css';
import { AuthContext } from '../context/AuthContext.js';

const BottomNav = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, userRole,logout } = useContext(AuthContext);  // Usa el rol del usuario del contexto

  // const handleLogout = async () => {
  //   try {
  //     await axios.post('http://localhost:5324/usuarios/logout', {}, { withCredentials: true });
  //     localStorage.removeItem('empresaId');
  //     setIsAuthenticated(false);
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error al cerrar sesión:', error);
  //   }
  // };

  return (
    <div className="fixed bottom-0 left-0 right-0 botoneraintferior shadow-lg p-4 grid grid-cols-4 gap-4 sm:flex sm:justify-around">
      <Link to="/inicio" className="flex flex-col items-center justify-center">
        <FaHome className="text-blue-500 text-2xl mb-1" />
        <span className="text-xs">Inicio</span>
      </Link>

      <Link to="/scaner" className="flex flex-col items-center justify-center">
        <FaBarcode className="text-blue-500 text-2xl mb-1" />
        <span className="text-xs">Control de Stock</span>
      </Link>

      <Link to="/ingreso" className="flex flex-col items-center justify-center">
        <FaBoxOpen className="text-green-500 text-2xl mb-1" />
        <span className="text-xs">Ingreso Nuevos Productos</span>
      </Link>

      <Link to="/stock" className="flex flex-col items-center justify-center">
        <FaWarehouse className="text-gray-500 text-2xl mb-1" />
        <span className="text-xs">Stock de Productos</span>
      </Link>

      <Link to="/salida" className="flex flex-col items-center justify-center">
        <FaArrowDown className="text-orange-500 text-2xl mb-1" />
        <span className="text-xs">Salida de Productos</span>
      </Link>

      <Link to="/consulta" className="flex flex-col items-center">
        <FaSearch className="text-orange-700 text-2xl mb-1" />
        <span className="text-xs">Consultar Producto</span>
      </Link>

      <Link to="/perfil" className="flex flex-col items-center text-center">
        <FaUser className="text-emerald-400 text-2xl mb-2" />
        <span className="text-sm">Mi Perfil</span>
      </Link>

      <button onClick={logout} className="flex flex-col items-center text-center">
        <FaSignOutAlt className="text-red-500 text-2xl mb-2" />
        <span className="text-sm">Cerrar Sesión</span>
      </button>


      {/* <div className="flex flex-col items-center justify-center">
        <FaCogs className="text-gray-500 text-2xl mb-1" />
        <span className="text-xs">Configuración</span>
      </div> */}

      {/* Botón para el rol "dios" */}
      {userRole === 'dios' && (
        <Link to="/altas" className="flex flex-col items-center justify-center">
          <FaCogs className="text-purple-500 text-2xl mb-1" />
          <span className="text-xs">Altas</span>
        </Link>
      )}
    </div>
  );
};

export default BottomNav;
