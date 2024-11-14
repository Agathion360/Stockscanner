// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from './context/AuthContext'; // Asegúrate de que la ruta sea correcta

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useContext(AuthContext);

//   if (loading) {
//     return <div>Cargando...</div>;  // O un componente de carga más estilizado
//   }

//   return isAuthenticated ? children : <Navigate to="/" />;
// };

// export default ProtectedRoute;




import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, userRole, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/inicio" />; // Redirige si el usuario no tiene el rol requerido
  }

  return children;
};

export default ProtectedRoute;
