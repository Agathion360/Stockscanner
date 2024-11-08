// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // Crear el contexto
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Verificar si el usuario tiene una sesión activa
//     const checkAuthStatus = async () => {
//       try {
//         const response = await axios.get('https://asijeminapis.website:5324/usuarios/perfil', {
//           withCredentials: true,
//         });
//         if (response.status === 200) {
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuthStatus();
//   }, []);

//   const logout = async () => {
//     await axios.post('https://asijeminapis.website:5324/usuarios/logout', {}, { withCredentials: true });
//     setIsAuthenticated(false);
//     localStorage.removeItem('empresaId');  // Limpia cualquier dato guardado en localStorage
//     navigate('/');  // Redirigir al login
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };





// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // Crear el contexto
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Verificar si el usuario tiene una sesión activa
//     const checkAuthStatus = async () => {
//       try {
//         const response = await axios.get('https://asijeminapis.website:5324/usuarios/perfil', {
//           withCredentials: true,
//         });
//         if (response.status === 200) {
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuthStatus();
//   }, []);

//   const logout = async () => {
//      await axios.post('https://asijeminapis.website:5324/usuarios/logout', {}, { withCredentials: true });
//    // await axios.post('http://localhost:5324/usuarios/logout', {}, { withCredentials: true });

//     setIsAuthenticated(false);
//     localStorage.removeItem('empresaId');  // Limpia cualquier dato guardado en localStorage
//     navigate('/');  // Redirigir al login
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };









import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Crear el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario tiene una sesión activa
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('https://asijeminapis.website:5324/usuarios/perfil', {
          withCredentials: true, // Asegúrate de que las cookies se envían
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const logout = async () => {
    await axios.post('https://asijeminapis.website:5324/usuarios/logout', {}, { withCredentials: true });
    setIsAuthenticated(false);
    localStorage.removeItem('empresaId');  // Limpiar cualquier dato guardado en localStorage
    navigate('/');  // Redirigir al login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
