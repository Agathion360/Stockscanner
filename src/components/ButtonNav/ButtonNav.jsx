

import React from 'react';
import { FaBarcode, FaBoxOpen, FaWarehouse, FaArrowDown, FaCogs, FaSearch, FaHome} from 'react-icons/fa';
import { Link } from 'react-router-dom';  // Importa Link desde react-router-dom
import './ButtonNav.css'

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 botoneraintferior shadow-lg p-4 grid grid-cols-4 gap-4 sm:flex sm:justify-around">
       <Link to="/" className="flex flex-col items-center justify-center">
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

      <Link to="/consulta" className="flex flex-col items-center justify-center">
      <FaSearch className="text-black text-2xl mb-1" />
      <span className="text-xs">Consultar Producto</span>
      </Link>

      <div className="flex flex-col items-center justify-center">
        <FaCogs className="text-gray-500 text-2xl mb-1" />
        <span className="text-xs">Configuración</span>
      </div>
    </div>
  );
};

export default BottomNav;
