import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'; // Asegúrate de que la ruta sea correcta

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Cargando...</div>;  // O un componente de carga más estilizado
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
