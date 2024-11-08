

import React, { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { FaBarcode, FaBoxOpen, FaWarehouse, FaArrowDown, FaClipboardList, FaCogs, FaUser  ,FaSearch, FaSignOutAlt} from 'react-icons/fa';
import axios from 'axios';


const Inicio = () => {
  const [precioStock, setPrecioStock] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await axios.post('http://localhost:5324/usuarios/logout', {}, { withCredentials: true });
  
  //     // Elimina el token de la cookie manualmente
  //     document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
  //     localStorage.removeItem('empresaId');  // Limpia cualquier dato que esté guardado en localStorage
  
  //     // Redirige al login después de cerrar sesión
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error al cerrar sesión:', error);
  //   }
  // };
  
  const handleLogout = async () => {
    try {
      await axios.post('https://asijeminapis.website:5324/usuarios/logout', {}, { withCredentials: true });
      
      // Elimina el token de la cookie manualmente
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      localStorage.removeItem('empresaId');  // Limpia cualquier dato que esté guardado en localStorage
  
      // Redirige al login y fuerza una recarga de la página para limpiar el estado
      navigate('/');
      window.location.reload();  // Forzar la recarga completa de la página
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  
  useEffect(() => {
    // Función para obtener el precio del stock
    const fetchPrecioStock = async () => {
      try {
        const response = await fetch('https://asijeminapis.website:4687/productos/precioStock');
        if (response.ok) {
          const data = await response.json();
          setPrecioStock(data.total);
        } else {
          console.error('Error al obtener el precio del stock');
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrecioStock();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Menú Principal</h1>
      
      

      <div className="grid grid-cols-3 gap-6">
        <Link to="/scaner" className="flex flex-col items-center text-center">
          <FaBarcode className="text-blue-500 text-5xl mb-2" />
          <span className="text-sm">Control de Stock</span>
        </Link>
        <Link to="/ingreso" className="flex flex-col items-center text-center">
          <FaBoxOpen className="text-green-500 text-5xl mb-2" />
          <span className="text-sm">Ingreso Nuevos Productos</span>
        </Link>
        <Link to="/stock" className="flex flex-col items-center text-center">
          <FaClipboardList className="text-blue-500 text-5xl mb-2" />
          <span className="text-sm">Stock de Productos</span>
        </Link>
        <Link to="/salida" className="flex flex-col items-center text-center">
          <FaArrowDown className="text-orange-500 text-5xl mb-2" />
          <span className="text-sm">Salida de Productos</span>
        </Link>
        <Link to="/stock" className="flex flex-col items-center text-center">
          <FaWarehouse className="text-red-500 text-5xl mb-2" />
          <span className="text-sm">Depósito</span>
        </Link>
       

      <Link to="/consulta" className="flex flex-col items-center">
      <FaSearch className="text-orange-700 text-2xl mb-1" />
      <span className="text-xs">Consultar Producto</span>
      </Link>

      <Link to="/perfil" className="flex flex-col items-center text-center">
          <FaUser  className="text-emerald-400 text-5xl mb-2" />
          <span className="text-sm">Mi Perfil</span>
        </Link>

        
      <button onClick={handleLogout} className="flex flex-col items-center text-center">
        <FaSignOutAlt className="text-red-500 text-5xl mb-2" />
        <span className="text-sm">Cerrar Sesión</span>
      </button>


        <Link to="/stock" className="flex flex-col items-center text-center">
          <FaCogs className="text-gray-500 text-5xl mb-2" />
          <span className="text-sm">Configuración</span>
        </Link>


       
      </div>
    </div>
  );
};

export default Inicio;
