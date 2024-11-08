// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import './RegistroAdmin.css'; // Archivo de estilos único para el registro

// function RegistroAdmin() {
//   const [nombreUsuario, setNombreUsuario] = useState('');
//   const [contraseña, setContraseña] = useState('');
//   const [nombre, setNombre] = useState('');
//   const [apellido, setApellido] = useState('');
//   const [correo, setCorreo] = useState('');
//   const [nombreEmpresa, setNombreEmpresa] = useState('');
//   const [rubro, setRubro] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5324/usuarios/crear-admin', {
//         nombreUsuario,
//         contraseña,
//         nombre,
//         apellido,
//         correo,
//         nombreEmpresa,
//         rubro,
//       });

//       console.log('Administrador creado:', response.data);

//       // Muestra el alert de éxito
//       Swal.fire({
//         title: 'Creación exitosa!',
//         text: 'La cuenta se ha creado correctamente.',
//         icon: 'success',
//         timer: 4000,
//         showConfirmButton: false,
//         willClose: () => {
//           navigate('/'); // Redirigir al login después de cerrar el alert
//         }
//       });
//     } catch (error) {
//       setError('Hubo un problema al crear la cuenta. Verifique los datos ingresados.');

//       // Muestra el alert de error
//       Swal.fire({
//         title: 'Error al crear la cuenta',
//         text: error.response?.data?.message || 'Ocurrió un error desconocido. Verifica los datos.',
//         icon: 'error',
//         confirmButtonText: 'Entendido'
//       });
//     }
//   };

//   const handleCancel = () => {
//     navigate('/'); // Redirige al login o a la página de inicio
//   };

//   return (
//     <div className="registro-admin-container">
//       <div className="registro-admin-box">
//         <h2>Alta Nueva Empresa</h2>
//         <form onSubmit={handleSubmit} className="registro-admin-form">
//           <div className="registro-admin-input-group">
//             <label>Nombre de Usuario:</label>
//             <input
//               type="text"
//               value={nombreUsuario}
//               onChange={(e) => setNombreUsuario(e.target.value)}
//               required
//             />
//           </div>
//           <div className="registro-admin-input-group">
//             <label>Contraseña:</label>
//             <input
//               type="password"
//               value={contraseña}
//               onChange={(e) => setContraseña(e.target.value)}
//               required
//             />
//           </div>
//           <div className="registro-admin-input-group">
//             <label>Nombre:</label>
//             <input
//               type="text"
//               value={nombre}
//               onChange={(e) => setNombre(e.target.value)}
//               required
//             />
//           </div>
//           <div className="registro-admin-input-group">
//             <label>Apellido:</label>
//             <input
//               type="text"
//               value={apellido}
//               onChange={(e) => setApellido(e.target.value)}
//               required
//             />
//           </div>
//           <div className="registro-admin-input-group full-width">
//             <label>Correo:</label>
//             <input
//               type="email"
//               value={correo}
//               onChange={(e) => setCorreo(e.target.value)}
//               required
//             />
//           </div>
//           <div className="registro-admin-input-group "> {/* Ocupa todo el ancho */}
//             <label>Nombre de la Empresa:</label>
//             <input
//               type="text"
//               value={nombreEmpresa}
//               onChange={(e) => setNombreEmpresa(e.target.value)}
//               required
//             />
//           </div>
//           <div className="registro-admin-input-group ">
//             <label>Rubro de la Empresa:</label>
//             <input
//               type="text"
//               value={rubro}
//               onChange={(e) => setRubro(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="registro-admin-error-message">{error}</p>}
          
//           <div className="registro-admin-button-group full-width-buttons"> {/* Botones de ancho completo */}
//             <button type="button" className="registro-admin-button-cancel" onClick={handleCancel}>Volver al Inicio</button>
//             <button type="submit" className="registro-admin-button">Registrar</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default RegistroAdmin;









import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './RegistroAdmin.css'; // Archivo de estilos único para el registro

function RegistroAdmin() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [rubro, setRubro] = useState('');
  const [planId, setPlanId] = useState(''); // Estado para el plan seleccionado
  const [planes, setPlanes] = useState([]); // Estado para almacenar los planes disponibles
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función para obtener los planes desde el backend
  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await axios.get('https://asijeminapis.website:5324/planes');
        setPlanes(response.data); // Almacena los planes en el estado
      } catch (error) {
        console.error('Error al obtener los planes:', error);
      }
    };

    fetchPlanes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Plan seleccionado:', planId);
    
    try {
      const response = await axios.post('https://asijeminapis.website:5324/usuarios/crear-admin', {
        nombreUsuario,
        contraseña,
        nombre,
        apellido,
        correo,
        nombreEmpresa,
        rubro,
        planId, // Enviar el ID del plan seleccionado
      });

      

      console.log('Administrador creado:', response.data);

      // Muestra el alert de éxito
      Swal.fire({
        title: 'Creación exitosa!',
        text: 'La cuenta se ha creado correctamente.',
        icon: 'success',
        timer: 4000,
        showConfirmButton: false,
        willClose: () => {
          navigate('/'); // Redirigir al login después de cerrar el alert
        }
      });
    } catch (error) {
      setError('Hubo un problema al crear la cuenta. Verifique los datos ingresados.');

      // Muestra el alert de error
      Swal.fire({
        title: 'Error al crear la cuenta',
        text: error.response?.data?.message || 'Ocurrió un error desconocido. Verifica los datos.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirige al login o a la página de inicio
  };

  return (
    <div className="registro-admin-container">
      <div className="registro-admin-box">
        <h2>Alta Nueva Empresa</h2>
        <form onSubmit={handleSubmit} className="registro-admin-form">
          <div className="registro-admin-input-group">
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
            />
          </div>
          <div className="registro-admin-input-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>
          <div className="registro-admin-input-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="registro-admin-input-group">
            <label>Apellido:</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <div className="registro-admin-input-group full-width">
            <label>Correo:</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="registro-admin-input-group full-width">
            <label>Nombre de la Empresa:</label>
            <input
              type="text"
              value={nombreEmpresa}
              onChange={(e) => setNombreEmpresa(e.target.value)}
              required
            />
          </div>
          <div className="registro-admin-input-group ">
            <label>Rubro de la Empresa:</label>
            <input
              type="text"
              value={rubro}
              onChange={(e) => setRubro(e.target.value)}
              required
            />
          </div>
          <div className="registro-admin-input-group ">
            <label>Plan:</label>
            <select value={planId} onChange={(e) => setPlanId(e.target.value)} required>
              <option value="">Seleccione un plan</option>
              {planes.map((plan) => (
                <option key={plan._id} value={plan._id}>
                  {plan.nombre} - {plan.limiteUsuarios} usuarios
                </option>
              ))}
            </select>
          </div>
          {error && <p className="registro-admin-error-message">{error}</p>}

          <div className="registro-admin-button-group full-width-buttons">
            <button type="button" className="registro-admin-button-cancel" onClick={handleCancel}>Volver al Inicio</button>
            <button type="submit" className="registro-admin-button">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroAdmin;
