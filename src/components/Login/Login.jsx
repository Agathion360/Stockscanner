
// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext'; // Importa el AuthContext
// import './Login.css'; // Asegúrate de tener un archivo de estilos

// function Login() {
//   const [nombreUsuario, setNombreUsuario] = useState('');
//   const [contraseña, setContraseña] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { setIsAuthenticated } = useContext(AuthContext);  // Usar el contexto

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://asijeminapis.website:5324/usuarios/login', {
//         nombreUsuario,
//         contraseña,
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         withCredentials: true
//       });

//       // Almacenar el token en una cookie
//       document.cookie = `jwt=${response.data.token};path=/;max-age=3600;SameSite=Strict`;

//       // Almacenar el empresaId en localStorage
//       localStorage.setItem('empresaId', response.data.empresaId); 

//       // Actualizar el estado de autenticación
//       setIsAuthenticated(true);

//       // Redirigir al usuario a la página de inicio
//       navigate('/inicio');
//     } catch (error) {
//       setError('Usuario o contraseña incorrectos');
//     }
//   };

//   const handleRegister = () => {
//     navigate('/alta-empresa');  // Redirige al formulario de registro de admin
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>Nombre de Usuario:</label>
//             <input
//               type="text"
//               value={nombreUsuario}
//               onChange={(e) => setNombreUsuario(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label>Contraseña:</label>
//             <input
//               type="password"
//               value={contraseña}
//               onChange={(e) => setContraseña(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="error-message">{error}</p>}
//           <button type="submit" className="login-button">
//             Ingresar
//           </button>
//         </form>
//         <p className="register-text">
//           ¿No tienes cuenta?
//           <button className="register-button" onClick={handleRegister}>
//             Crear cuenta
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;



// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext'; // Importa el AuthContext
// import './Login.css'; // Asegúrate de tener un archivo de estilos

// function Login() {
//   const [nombreUsuario, setNombreUsuario] = useState('');
//   const [contraseña, setContraseña] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { setIsAuthenticated } = useContext(AuthContext);  // Usar el contexto

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // const response = await axios.post('https://asijeminapis.website:5324/usuarios/login', {
//         const response = await axios.post('http://localhost:5324/usuarios/login', {

//         nombreUsuario,
//         contraseña,
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         withCredentials: true
//       });

//       // Almacenar el token en una cookie
//       document.cookie = `jwt=${response.data.token};path=/;max-age=3600;SameSite=Strict`;

//       // Almacenar el empresaId en localStorage
//       localStorage.setItem('empresaId', response.data.empresaId); 

//       // Actualizar el estado de autenticación
//       setIsAuthenticated(true);

//       // Redirigir al usuario a la página de inicio
//       navigate('/inicio');
//     } catch (error) {
//       setError('Usuario o contraseña incorrectos');
//     }
//   };

//   const handleRegister = () => {
//     navigate('/alta-empresa');  // Redirige al formulario de registro de admin
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>Nombre de Usuario:</label>
//             <input
//               type="text"
//               value={nombreUsuario}
//               onChange={(e) => setNombreUsuario(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label>Contraseña:</label>
//             <input
//               type="password"
//               value={contraseña}
//               onChange={(e) => setContraseña(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="error-message">{error}</p>}
//           <button type="submit" className="login-button">
//             Ingresar
//           </button>
//         </form>
//         <p className="register-text">
//           ¿No tienes cuenta?
//           <button className="register-button" onClick={handleRegister}>
//             Crear cuenta
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realiza la solicitud de login al backend con el puerto correcto
      const response = await axios.post(
        'https://asijeminapis.website:5324/usuarios/login',
        {
          nombreUsuario,
          contraseña,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Esto es necesario para enviar cookies
        }
      );

      // Guardar el token en una cookie
      document.cookie = `jwt=${response.data.token};path=/;max-age=3600;SameSite=None;Secure`;

      // Guardar empresaId en localStorage
      localStorage.setItem('empresaId', response.data.empresaId);

      // Cambiar el estado de autenticación a "true"
      setIsAuthenticated(true);

      // Redirigir al inicio tras login exitoso
      navigate('/inicio');
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleRegister = () => {
    navigate('/alta-empresa'); // Redirige al formulario de registro de admin
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Stock Facil</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Ingresar</button>
        </form>
        <p className="register-text">
          ¿No tienes cuenta?
          <button className="register-button" onClick={handleRegister}>
            Crear cuenta
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
