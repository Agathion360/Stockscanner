

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBarcode, FaBoxOpen, FaWarehouse, FaArrowUp, FaArrowDown, FaClipboardList, FaCogs, FaUpload ,FaSearch} from 'react-icons/fa';

const Inicio = () => {
  const [precioStock, setPrecioStock] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <FaSearch className="text-black text-2xl mb-1" />
      <span className="text-xs">Consultar Producto</span>
      </Link>
        <Link to="/stock" className="flex flex-col items-center text-center">
          <FaCogs className="text-gray-500 text-5xl mb-2" />
          <span className="text-sm">Configuración</span>
        </Link>
      </div>
    </div>
  );
};

export default Inicio;
