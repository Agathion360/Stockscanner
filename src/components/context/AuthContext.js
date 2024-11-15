

// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [userRole, setUserRole] = useState(undefined); // Inicializa como undefined
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Verificar si el usuario ya está autenticado cuando se monta el contexto
//     const checkAuthStatus = async () => {
//       try {
//         const response = await axios.get('http://localhost:5324/usuarios/perfil', {
//           withCredentials: true,
//         });
//         if (response.status === 200 && response.data.rol) {
//           setIsAuthenticated(true);
//           setUserRole(response.data.rol);
//         } else {
//           setIsAuthenticated(false);
//           setUserRole(null);
//         }
//       } catch (error) {
//         console.error('Error al verificar la sesión:', error);
//         setIsAuthenticated(false);
//         setUserRole(null);
//       } finally {
//         setLoading(false); // Finalizamos la carga una vez que se verifica el estado
//       }
//     };

//     checkAuthStatus();
//   }, []);

//   const login = async (credentials) => {
//     try {
//       const response = await axios.post('http://localhost:5324/usuarios/login', credentials, {
//         withCredentials: true,
//       });

//       if (response.status === 200) {
//         setIsAuthenticated(true);
//         setUserRole(response.data.rol); 
//         localStorage.setItem('empresaId', response.data.empresaId); 
//         setLoading(false);
//         navigate('/inicio');
//       }
//     } catch (error) {
//       console.error('Error al iniciar sesión:', error);
//       setIsAuthenticated(false);
//       setUserRole(null);
//       localStorage.removeItem('empresaId');
//     }
//   };

//   const logout = async () => {
//     await axios.post('http://localhost:5324/usuarios/logout', {}, { withCredentials: true });
//     setIsAuthenticated(false);
//     setUserRole(null);
//     localStorage.removeItem('empresaId');
//     navigate('/');
//     sessionStorage.removeItem('hasReloaded'); // Limpia el indicador de recarga

//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, userRole, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5324/usuarios/perfil', {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.rol) {
          setIsAuthenticated(true);
          setUserRole(response.data.rol);
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5324/usuarios/login', credentials, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setUserRole(response.data.rol);
        localStorage.setItem('empresaId', response.data.empresaId);
        setLoading(false);
        setErrorMessage(""); // Limpia el mensaje de error en caso de login exitoso
        navigate('/inicio');
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserRole(null);
      localStorage.removeItem('empresaId');

      if (error.response && error.response.status === 403) {
        setErrorMessage('Tu cuenta está deshabilitada. Contacta al administrador.');
      } else {
        setErrorMessage('Usuario o contraseña incorrectos');
      }
    }
  };

  const logout = async () => {
    await axios.post('http://localhost:5324/usuarios/logout', {}, { withCredentials: true });
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('empresaId');
    navigate('/');
    sessionStorage.removeItem('hasReloaded');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, loading, login, logout, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
