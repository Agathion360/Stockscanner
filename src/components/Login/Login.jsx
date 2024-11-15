


// // import React, { useState, useContext } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { AuthContext } from '../context/AuthContext';
// // import './Login.css';

// // function Login() {
// //   const [nombreUsuario, setNombreUsuario] = useState('');
// //   const [contraseña, setContraseña] = useState('');
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();
// //   const { setIsAuthenticated } = useContext(AuthContext);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Realiza la solicitud de login al backend con el puerto correcto
// //       const response = await axios.post(
// //         'https://asijeminapis.website:5324/usuarios/login',
// //         {
// //           nombreUsuario,
// //           contraseña,
// //         },
// //         {
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           withCredentials: true, // Esto es necesario para enviar cookies
// //         }
// //       );

// //       // Guardar el token en una cookie
// //       document.cookie = `jwt=${response.data.token};path=/;max-age=3600;SameSite=None;Secure`;

// //       // Guardar empresaId en localStorage
// //       localStorage.setItem('empresaId', response.data.empresaId);

// //       // Cambiar el estado de autenticación a "true"
// //       setIsAuthenticated(true);

// //       // Redirigir al inicio tras login exitoso
// //       navigate('/inicio');
// //     } catch (error) {
// //       console.error('Error en el login:', error);
// //       setError('Usuario o contraseña incorrectos');
// //     }
// //   };

// //   const handleRegister = () => {
// //     navigate('/alta-empresa'); // Redirige al formulario de registro de admin
// //   };

// //   return (
// //     <div className="login-container">
// //       <div className="login-box">
// //         <h2>Stock Facil</h2>
// //         <form onSubmit={handleSubmit}>
// //           <div className="input-group">
// //             <label>Nombre de Usuario:</label>
// //             <input
// //               type="text"
// //               value={nombreUsuario}
// //               onChange={(e) => setNombreUsuario(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="input-group">
// //             <label>Contraseña:</label>
// //             <input
// //               type="password"
// //               value={contraseña}
// //               onChange={(e) => setContraseña(e.target.value)}
// //               required
// //             />
// //           </div>
// //           {error && <p className="error-message">{error}</p>}
// //           <button type="submit" className="login-button">Ingresar</button>
// //         </form>
// //         <p className="register-text">
// //           ¿No tienes cuenta?
// //           <button className="register-button" onClick={handleRegister}>
// //             Crear cuenta
// //           </button>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;








// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import './Login.css';

// function Login() {
//   const [nombreUsuario, setNombreUsuario] = useState('');
//   const [contraseña, setContraseña] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { setIsAuthenticated } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Realiza la solicitud de login al backend con el puerto correcto
//       const response = await axios.post(
//         'https://asijeminapis.website:5324/usuarios/login',
//         {
//           nombreUsuario,
//           contraseña,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true, // Esto es necesario para enviar cookies
//         }
//       );

//       // Guardar el token en una cookie
//       document.cookie = `jwt=${response.data.token};path=/;max-age=3600;SameSite=None;Secure`;

//       // Guardar empresaId en localStorage
//       localStorage.setItem('empresaId', response.data.empresaId);

//       // Cambiar el estado de autenticación a "true"
//       setIsAuthenticated(true);

//       // Redirigir al inicio tras login exitoso
//       navigate('/inicio');
//     } catch (error) {
//       console.error('Error en el login:', error);

//       // Verificar si el error tiene una respuesta específica desde el servidor
//       if (error.response) {
//         if (error.response.data.message === 'Usuario inactivo, no puede iniciar sesión') {
//           setError('Tu cuenta está deshabilitada. Contacta al administrador.');
//         } else {
//           setError('Usuario o contraseña incorrectos');
//         }
//       } else {
//         setError('Error de red. Inténtalo de nuevo más tarde.');
//       }
//     }
//   };

//   const handleRegister = () => {
//     navigate('/alta-empresa'); // Redirige al formulario de registro de admin
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Stock Facil</h2>
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
//           <button type="submit" className="login-button">Ingresar</button>
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






// // import React, { useState, useContext } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { AuthContext } from '../context/AuthContext';
// // import './Login.css';

// // function Login() {
// //   const [nombreUsuario, setNombreUsuario] = useState('');
// //   const [contraseña, setContraseña] = useState('');
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();
// //   const { setIsAuthenticated } = useContext(AuthContext);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Realiza la solicitud de login al backend con el puerto correcto
// //       const response = await axios.post(
// //         'https://asijeminapis.website:5324/usuarios/login',
// //         {
// //           nombreUsuario,
// //           contraseña,
// //         },
// //         {
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           withCredentials: true, // Esto es necesario para enviar cookies
// //         }
// //       );

// //       // Guardar el token en una cookie
// //       document.cookie = `jwt=${response.data.token};path=/;max-age=3600;SameSite=None;Secure`;

// //       // Guardar empresaId en localStorage
// //       const empresaId = response.data.empresaId;
// //       localStorage.setItem('empresaId', empresaId);

// //       // Verificar si la empresa está activa
// //       const estadoEmpresaResponse = await axios.get(
// //         `https://asijeminapis.website:5324/empresas/estado/${empresaId}`,
// //         {
// //           withCredentials: true,
// //         }
// //       );

// //       if (!estadoEmpresaResponse.data.active) {
// //         // Si la empresa no está activa, mostrar un error y borrar la cookie y localStorage
// //         setError('La empresa asociada está desactivada. Contacta al administrador.');
// //         document.cookie = 'jwt=;path=/;max-age=0;'; // Borrar la cookie del token
// //         localStorage.removeItem('empresaId');
// //         return;
// //       }

// //       // Cambiar el estado de autenticación a "true"
// //       setIsAuthenticated(true);

// //       // Redirigir al inicio tras login exitoso
// //       navigate('/inicio');
// //     } catch (error) {
// //       console.error('Error en el login:', error);

// //       // Verificar si el error tiene una respuesta específica desde el servidor
// //       if (error.response) {
// //         if (error.response.data.message === 'Usuario inactivo, no puede iniciar sesión') {
// //           setError('Tu cuenta está deshabilitada. Contacta al administrador.');
// //         } else if (error.response.data.message === 'La empresa asociada está desactivada') {
// //           setError('La empresa asociada está desactivada. Contacta al administrador.');
// //         } else {
// //           setError('Usuario o contraseña incorrectos');
// //         }
// //       } else {
// //         setError('Error de red. Inténtalo de nuevo más tarde.');
// //       }
// //     }
// //   };

// //   const handleRegister = () => {
// //     navigate('/alta-empresa'); // Redirige al formulario de registro de admin
// //   };

// //   return (
// //     <div className="login-container">
// //       <div className="login-box">
// //         <h2>Stock Facil</h2>
// //         <form onSubmit={handleSubmit}>
// //           <div className="input-group">
// //             <label>Nombre de Usuario:</label>
// //             <input
// //               type="text"
// //               value={nombreUsuario}
// //               onChange={(e) => setNombreUsuario(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="input-group">
// //             <label>Contraseña:</label>
// //             <input
// //               type="password"
// //               value={contraseña}
// //               onChange={(e) => setContraseña(e.target.value)}
// //               required
// //             />
// //           </div>
// //           {error && <p className="error-message">{error}</p>}
// //           <button type="submit" className="login-button">Ingresar</button>
// //         </form>
// //         <p className="register-text">
// //           ¿No tienes cuenta?
// //           <button className="register-button" onClick={handleRegister}>
// //             Crear cuenta
// //           </button>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;






// // import React, { useState, useContext } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { AuthContext } from '../context/AuthContext';
// // import './Login.css';

// // function Login() {
// //   const [nombreUsuario, setNombreUsuario] = useState('');
// //   const [contraseña, setContraseña] = useState('');
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();
// //   const { setIsAuthenticated } = useContext(AuthContext);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       // Realiza la solicitud de login al backend con el puerto correcto
// //       const response = await axios.post(
// //          'https://asijeminapis.website:5324/usuarios/login',
// //         //'http://localhost:5324/usuarios/login',

// //         {
// //           nombreUsuario,
// //           contraseña,
// //         },
// //         {
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           withCredentials: true, // Esto es necesario para enviar cookies
// //         }
// //       );

// //       // Guardar el token en una cookie
// //       document.cookie = `jwt=${response.data.token};path=/;max-age=3600;SameSite=None;Secure`;

// //       // Guardar empresaId en localStorage
// //       const empresaId = response.data.empresaId;
// //       localStorage.setItem('empresaId', empresaId);

// //       // Verificar si la empresa está activa
// //       const estadoEmpresaResponse = await axios.get(
// //         `https://asijeminapis.website:5324/empresas/estado/${empresaId}`,
// //         {
// //           withCredentials: true,
// //         }
// //       );

// //       if (!estadoEmpresaResponse.data.active) {
// //         // Si la empresa no está activa, mostrar un error y borrar la cookie y localStorage
// //         setError('La empresa asociada está desactivada. Contacta al administrador.');
// //         document.cookie = 'jwt=;path=/;max-age=0;'; // Borrar la cookie del token
// //         localStorage.removeItem('empresaId');
// //         return;
// //       }

// //       // Cambiar el estado de autenticación a "true"
// //       setIsAuthenticated(true);

// //       // Redirigir al inicio tras login exitoso
// //       navigate('/inicio');
// //     } catch (error) {
// //       console.error('Error en el login:', error);

// //       // Verificar si el error tiene una respuesta específica desde el servidor
// //       if (error.response) {
// //         if (error.response.data.message === 'Usuario inactivo, no puede iniciar sesión') {
// //           setError('Tu cuenta está deshabilitada. Contacta al administrador.');
// //         } else if (error.response.data.message === 'La empresa asociada está desactivada') {
// //           setError('La empresa asociada está desactivada. Contacta al administrador.');
// //         } else {
// //           setError('Usuario o contraseña incorrectos');
// //         }
// //       } else {
// //         setError('Error de red. Inténtalo de nuevo más tarde.');
// //       }
// //     }
// //   };

// //   const handleRegister = () => {
// //     navigate('/alta-empresa'); // Redirige al formulario de registro de admin
// //   };

// //   return (
// //     <div className="login-container">
// //       <div className="login-box">
// //         <h2>Stock Facil</h2>
// //         <form onSubmit={handleSubmit}>
// //           <div className="input-group">
// //             <label>Nombre de Usuario:</label>
// //             <input
// //               type="text"
// //               value={nombreUsuario}
// //               onChange={(e) => setNombreUsuario(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="input-group">
// //             <label>Contraseña:</label>
// //             <input
// //               type="password"
// //               value={contraseña}
// //               onChange={(e) => setContraseña(e.target.value)}
// //               required
// //             />
// //           </div>
// //           {error && <p className="error-message">{error}</p>}
// //           <button type="submit" className="login-button">Ingresar</button>
// //         </form>
// //         <p className="register-text">
// //           ¿No tienes cuenta?
// //           <button className="register-button" onClick={handleRegister}>
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
// import { AuthContext } from '../context/AuthContext';
// import './Login.css';

// function Login() {
//   const [nombreUsuario, setNombreUsuario] = useState('');
//   const [contraseña, setContraseña] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { setIsAuthenticated } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Realiza la solicitud de login al backend con el puerto correcto
//       const response = await axios.post(
//         // 'https://asijeminapis.website:5324/usuarios/login',
//         'http://localhost:5324/usuarios/login',

//         {
//           nombreUsuario,
//           contraseña,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true, // Esto es necesario para enviar cookies
//         }
//       );

//       if (response.status === 200 && response.data.token) {
//         // Guardar el token en una cookie SOLO si la respuesta es correcta y contiene el token
//         document.cookie = `jwt=${response.data.token};path=/;max-age=3600;SameSite=None;Secure`;

//         // Guardar empresaId en localStorage
//         localStorage.setItem('empresaId', response.data.empresaId);

//         // Cambiar el estado de autenticación a "true"
//         setIsAuthenticated(true);

//         // Redirigir al inicio tras login exitoso
//         navigate('/inicio');
//       } else {
//         setError('Autenticación fallida, por favor intente nuevamente.');
//       }

//     } catch (error) {
//       console.error('Error en el login:', error);

//       // Verificar si el error tiene una respuesta específica desde el servidor
//       if (error.response) {
//         if (error.response.data.message === 'Usuario inactivo, no puede iniciar sesión') {
//           setError('Tu cuenta está deshabilitada. Contacta al administrador.');
//         } else {
//           setError('Usuario o contraseña incorrectos');
//         }
//       } else {
//         setError('Error de red. Inténtalo de nuevo más tarde.');
//       }
//     }
//   };

//   // const handleRegister = () => {
//   //   navigate('/alta-empresa'); // Redirige al formulario de registro de admin
//   // };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Stock Facil</h2>
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
//           <button type="submit" className="login-button">Ingresar</button>
//         </form>
//         {/* <p className="register-text">
//           ¿No tienes cuenta?
//           <button className="register-button" onClick={handleRegister}>
//             Crear cuenta
//           </button>
//         </p> */}
//       </div>
//     </div>
//   );
// }

// export default Login;






















// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import './Login.css';

// function Login() {
//   const [nombreUsuario, setNombreUsuario] = useState('');
//   const [contraseña, setContraseña] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { setIsAuthenticated } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Realiza la solicitud de login al backend con el puerto correcto
//       const response = await axios.post(
//         // 'https://asijeminapis.website:5324/usuarios/login',
//         'http://localhost:5324/usuarios/login',

//         {
//           nombreUsuario,
//           contraseña,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true, // Esto es necesario para enviar cookies
//         }
//       );

//       // Solo guardar el token en la cookie si la autenticación fue exitosa
//       if (response.status === 200 && response.data.token) {
//         // Guardar el token en una cookie
//         document.cookie = `jwt=${response.data.token};path=/;max-age=3600;SameSite=None;Secure`;

//         // Cambiar el estado de autenticación a "true"
//         setIsAuthenticated(true);

//         // Redirigir al inicio tras login exitoso
//         navigate('/inicio');
//       } else {
//         setError('Autenticación fallida, por favor intente nuevamente.');
//       }
//     } catch (error) {
//       console.error('Error en el login:', error);

//       // Verificar si el error tiene una respuesta específica desde el servidor
//       if (error.response) {
//         if (error.response.data.message === 'Usuario inactivo, no puede iniciar sesión') {
//           setError('Tu cuenta está deshabilitada. Contacta al administrador.');
//         } else {
//           setError('Usuario o contraseña incorrectos');
//         }
//       } else {
//         setError('Error de red. Inténtalo de nuevo más tarde.');
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Stock Facil</h2>
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
//           <button type="submit" className="login-button">Ingresar</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;















// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import './Login.css';

// function Login() {
//   const [nombreUsuario, setNombreUsuario] = useState('');
//   const [contraseña, setContraseña] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { setIsAuthenticated } = useContext(AuthContext);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await axios.post(
//   //       'http://localhost:5324/usuarios/login',
//   //       {
//   //         nombreUsuario,
//   //         contraseña,
//   //       },
//   //       {
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //         withCredentials: true,
//   //       }
//   //     );

//   //     if (response.status === 200 && response.data.token) {
//   //       setIsAuthenticated(true);
//   //       navigate('/inicio');
//   //     } else {
//   //       setError('Autenticación fallida, por favor intente nuevamente.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error en el login:', error);
//   //     if (error.response) {
//   //       if (error.response.data.message === 'Usuario inactivo, no puede iniciar sesión') {
//   //         setError('Tu cuenta está deshabilitada. Contacta al administrador.');
//   //       } else {
//   //         setError('Usuario o contraseña incorrectos');
//   //       }
//   //     } else {
//   //       setError('Error de red. Inténtalo de nuevo más tarde.');
//   //     }
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         'http://localhost:5324/usuarios/login',
//         {
//           nombreUsuario,
//           contraseña,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         }
//       );
  
//       if (response.status === 200 && response.data.token) {
//         // Guardar el token y el empresaId en localStorage
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('empresaId', response.data.empresaId);
  
//         setIsAuthenticated(true);
//         navigate('/inicio');
//       } else {
//         setError('Autenticación fallida, por favor intente nuevamente.');
//       }
//     } catch (error) {
//       console.error('Error en el login:', error);
//       if (error.response) {
//         if (error.response.data.message === 'Usuario inactivo, no puede iniciar sesión') {
//           setError('Tu cuenta está deshabilitada. Contacta al administrador.');
//         } else {
//           setError('Usuario o contraseña incorrectos');
//         }
//       } else {
//         setError('Error de red. Inténtalo de nuevo más tarde.');
//       }
//     }
//   };
  

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Stock Facil</h2>
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
//           <button type="submit" className="login-button">Ingresar</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;


// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import './Login.css';

// function Login() {
//   const [nombreUsuario, setNombreUsuario] = useState('');
//   const [contraseña, setContraseña] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext); // Usamos la función login del contexto

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Llamamos a la función login del contexto con las credenciales
//       await login({ nombreUsuario, contraseña });
//       navigate('/inicio'); // Navegamos a la página de inicio después del login exitoso
//     } catch (error) {
//       console.error('Error en el login:', error);
//       if (error.response) {
//         if (error.response.data.message === 'Usuario inactivo, no puede iniciar sesión') {
//           setError('Tu cuenta está deshabilitada. Contacta al administrador.');
//         } else {
//           setError('Usuario o contraseña incorrectos');
//         }
//       } else {
//         setError('Error de red. Inténtalo de nuevo más tarde.');
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Stock Facil</h2>
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
//           <button type="submit" className="login-button">Ingresar</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const { login, errorMessage } = useContext(AuthContext); // Accede a errorMessage directamente desde el contexto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ nombreUsuario, contraseña });
      navigate('/inicio');
    } catch {
      // No es necesario manejar el error aquí, ya que errorMessage se actualiza en el contexto
    }
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
          {/* Muestra el mensaje de error desde errorMessage del contexto */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
