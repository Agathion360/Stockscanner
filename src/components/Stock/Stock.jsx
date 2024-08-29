
import React, { useState, useEffect } from 'react';
import BottomNav from '../ButtonNav/ButtonNav.jsx';

const Stock = () => {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      const response = await fetch('https://asijeminapis.website:4687/productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Stock de Productos</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg mb-20 w-6/8 mx-auto"> 
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Nombre</th>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Precio Venta</th>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Stock</th>
              {/* <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">Código de Barra</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productos.map(producto => (
              <tr key={producto._id} className="hover:bg-gray-100">
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{producto.nombre}</td>
                <td className="py-4 px-6 text-sm text-gray-500">${producto.precioVenta}</td>
                <td className="py-4 px-6 text-sm text-gray-500">{producto.stock}</td>
                {/* <td className="py-4 px-6 text-sm text-gray-500">{producto.codigoBarra}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BottomNav />
    </div>
  );
};

export default Stock;
