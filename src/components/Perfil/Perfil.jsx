
// import React, { useState, useEffect, useContext } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../context/AuthContext';

// const Perfil = () => {
//   const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: { nombre: '' }, rubro: '', rol: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', rol: '' });


//   useEffect(() => {
//     const obtenerPerfil = async () => {
//       try {
//         if (!isAuthenticated) {
//           throw new Error('No se encontró el token de autenticación');
//         }
  
//         const response = await fetch('http://localhost:5324/usuarios/perfil', {
//           method: 'GET',
//           credentials: 'include',
//         });
  
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
  
//         const data = await response.json();
  
//         // Asigna valores predeterminados usando `nombreUsuario` si falta `nombre`
//         setPerfil({
//           nombre: data.nombre || data.nombreUsuario || '',  // Intenta con `nombreUsuario` si `nombre` está vacío
//           apellido: data.apellido || '',
//           correo: data.correo || '',
//           empresa: data.empresa || { nombre: '' },
//           rubro: data.empresa?.rubro || '',
//           rol: data.rol || '',
//         });
//       } catch (error) {
//         console.error('Error al obtener el perfil:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Hubo un problema al cargar tu perfil. Intenta nuevamente.',
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     if (!authLoading) {
//       obtenerPerfil();
//     }
//   }, [isAuthenticated, authLoading]);

  


//   const handleEditProfile = async () => {
//     try {
//       const response = await fetch('http://localhost:5324/usuarios/actualizar', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(newProfile),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPerfil({
//           nombre: data.nombre,
//           apellido: data.apellido,
//           correo: data.correo,
//           empresa: data.empresa,
//           rubro: data.rubro,
//           rol: data.rol,
//         });
//         setShowEditModal(false);
//         Swal.fire({
//           icon: 'success',
//           title: 'Perfil actualizado',
//           text: 'Los cambios se han guardado correctamente',
//         });
//       } else {
//         throw new Error('Error al actualizar perfil');
//       }
//     } catch (error) {
//       console.error('Error al actualizar perfil:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Hubo un problema al actualizar el perfil',
//       });
//     }
//   };

//   if (loading || authLoading) {
//     return <p className="text-center text-gray-500">Cargando perfil...</p>;
//   }

//   return (
//     <>
//       <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Perfil de Usuario</h2>
//         <div className="space-y-4">
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Nombre:</span>
//             <span className="text-gray-800">{perfil.nombre}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Apellido:</span>
//             <span className="text-gray-800">{perfil.apellido}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Correo:</span>
//             <span className="text-gray-800">{perfil.correo}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Empresa:</span>
//             <span className="text-gray-800">{perfil.empresa.nombre}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rubro:</span>
//             <span className="text-gray-800">{perfil.rubro}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rol:</span>
//             <span className="text-gray-800">{perfil.rol}</span>
//           </div>
//         </div>

//         <div className="flex justify-around mt-6">
//           <button
//             onClick={() => setShowEditModal(true)}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Editar Perfil
//           </button>
//         </div>
//       </div>

//       <BottomNav />

//       {showEditModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//             <h3 className="text-xl font-semibold mb-4">Editar Perfil</h3>
//             <div className="mb-4">
//               <label className="block text-gray-700">Nombre:</label>
//               <input
//                 type="text"
//                 value={newProfile.nombre}
//                 onChange={(e) => setNewProfile({ ...newProfile, nombre: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Apellido:</label>
//               <input
//                 type="text"
//                 value={newProfile.apellido}
//                 onChange={(e) => setNewProfile({ ...newProfile, apellido: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Correo:</label>
//               <input
//                 type="text"
//                 value={newProfile.correo}
//                 onChange={(e) => setNewProfile({ ...newProfile, correo: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Rubro:</label>
//               <input
//                 type="text"
//                 value={newProfile.rubro}
//                 onChange={(e) => setNewProfile({ ...newProfile, rubro: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Cargo:</label>
//               <input
//                 type="text"
//                 value={newProfile.cargo}
//                 onChange={(e) => setNewProfile({ ...newProfile, cargo: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="flex justify-between">
//               <button
//                 onClick={handleEditProfile}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Guardar
//               </button>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
//               >
//                 Cancelar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Perfil;






// import React, { useState, useEffect, useContext } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../context/AuthContext';

// const Perfil = () => {
//   const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: { nombre: '' }, rubro: '', rol: '', plan: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', rol: '' });

//   useEffect(() => {
//     const obtenerPerfil = async () => {
//       try {
//         if (!isAuthenticated) {
//           throw new Error('No se encontró el token de autenticación');
//         }
  
//         const response = await fetch('http://localhost:5324/usuarios/perfil', {
//           method: 'GET',
//           credentials: 'include',
//         });
  
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
  
//         const data = await response.json();
  
//         // Asigna valores predeterminados usando `nombreUsuario` si falta `nombre`
//         setPerfil({
//           nombre: data.nombre || data.nombreUsuario || '',
//           apellido: data.apellido || '',
//           correo: data.correo || '',
//           empresa: data.empresa || { nombre: '' },
//           rubro: data.empresa?.rubro || '',
//           rol: data.rol || '',
//           plan: data.plan || '', // Asegúrate de que el plan venga en la respuesta
//         });
//       } catch (error) {
//         console.error('Error al obtener el perfil:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Hubo un problema al cargar tu perfil. Intenta nuevamente.',
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     if (!authLoading) {
//       obtenerPerfil();
//     }
//   }, [isAuthenticated, authLoading]);

//   const handleEditProfile = async () => {
//     try {
//       const response = await fetch('http://localhost:5324/usuarios/actualizar', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(newProfile),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPerfil({
//           nombre: data.nombre,
//           apellido: data.apellido,
//           correo: data.correo,
//           empresa: data.empresa,
//           rubro: data.rubro,
//           rol: data.rol,
//           plan: data.plan, // Aquí también incluimos el plan
//         });
//         setShowEditModal(false);
//         Swal.fire({
//           icon: 'success',
//           title: 'Perfil actualizado',
//           text: 'Los cambios se han guardado correctamente',
//         });
//       } else {
//         throw new Error('Error al actualizar perfil');
//       }
//     } catch (error) {
//       console.error('Error al actualizar perfil:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Hubo un problema al actualizar el perfil',
//       });
//     }
//   };

//   if (loading || authLoading) {
//     return <p className="text-center text-gray-500">Cargando perfil...</p>;
//   }

//   return (
//     <>
//       <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Perfil de Usuario</h2>
//         <div className="space-y-4">
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Nombre:</span>
//             <span className="text-gray-800">{perfil.nombre}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Apellido:</span>
//             <span className="text-gray-800">{perfil.apellido}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Correo:</span>
//             <span className="text-gray-800">{perfil.correo}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Empresa:</span>
//             <span className="text-gray-800">{perfil.empresa.nombre}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rubro:</span>
//             <span className="text-gray-800">{perfil.rubro}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rol:</span>
//             <span className="text-gray-800">{perfil.rol}</span>
//           </div>

         
//         </div>

//         <div className="flex justify-around mt-6">
//           <button
//             onClick={() => setShowEditModal(true)}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Editar Perfil
//           </button>
//         </div>

      
//       </div>


//    {/* Mostrar el plan solo si el rol es "dios" */}
//    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg mt-10">

//    {perfil.rol === 'dios' && (
//             <div className="flex justify-between bg-blue-100 p-4 rounded-md">
//               <span className="font-semibold text-blue-700">Su plan es:</span>
//               <span className="text-blue-700">{perfil.rol || 'No especificado'}</span>
//             </div>
//           )}
// </div>

//       <BottomNav />

//       {showEditModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//             <h3 className="text-xl font-semibold mb-4">Editar Perfil</h3>
//             <div className="mb-4">
//               <label className="block text-gray-700">Nombre:</label>
//               <input
//                 type="text"
//                 value={newProfile.nombre}
//                 onChange={(e) => setNewProfile({ ...newProfile, nombre: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Apellido:</label>
//               <input
//                 type="text"
//                 value={newProfile.apellido}
//                 onChange={(e) => setNewProfile({ ...newProfile, apellido: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Correo:</label>
//               <input
//                 type="text"
//                 value={newProfile.correo}
//                 onChange={(e) => setNewProfile({ ...newProfile, correo: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Rubro:</label>
//               <input
//                 type="text"
//                 value={newProfile.rubro}
//                 onChange={(e) => setNewProfile({ ...newProfile, rubro: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Rol:</label>
//               <input
//                 type="text"
//                 value={newProfile.rol}
//                 onChange={(e) => setNewProfile({ ...newProfile, rol: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="flex justify-between">
//               <button
//                 onClick={handleEditProfile}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Guardar
//               </button>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
//               >
//                 Cancelar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Perfil;






import React, { useState, useEffect, useContext } from 'react';
import BottomNav from '../ButtonNav/ButtonNav.jsx';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

const Perfil = () => {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: { nombre: '' }, rubro: '', rol: '', plan: '' });
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', rol: '' });

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        if (!isAuthenticated) {
          throw new Error('No se encontró el token de autenticación');
        }
  
        const response = await fetch('http://localhost:5324/usuarios/perfil', {
          method: 'GET',
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
  
        const data = await response.json();
  
        // Asigna valores predeterminados usando `nombreUsuario` si falta `nombre`
        setPerfil({
          nombre: data.nombre || data.nombreUsuario || '',
          apellido: data.apellido || '',
          correo: data.correo || '',
          empresa: data.empresa || { nombre: '' },
          rubro: data.empresa?.rubro || '',
          rol: data.rol || '',
          plan: data.plan || '', // Asegúrate de que el plan venga en la respuesta
        });
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cargar tu perfil. Intenta nuevamente.',
        });
      } finally {
        setLoading(false);
      }
    };
  
    if (!authLoading) {
      obtenerPerfil();
    }
  }, [isAuthenticated, authLoading]);

  const handleEditProfile = async () => {
    try {
      const response = await fetch('http://localhost:5324/usuarios/actualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newProfile),
      });

      if (response.ok) {
        const data = await response.json();
        setPerfil({
          nombre: data.nombre,
          apellido: data.apellido,
          correo: data.correo,
          empresa: data.empresa,
          rubro: data.rubro,
          rol: data.rol,
          plan: data.plan, // Aquí también incluimos el plan
        });
        setShowEditModal(false);
        Swal.fire({
          icon: 'success',
          title: 'Perfil actualizado',
          text: 'Los cambios se han guardado correctamente',
        });
      } else {
        throw new Error('Error al actualizar perfil');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar el perfil',
      });
    }
  };

  if (loading || authLoading) {
    return <p className="text-center text-gray-500">Cargando perfil...</p>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto flex mt-10 space-x-4">
        {/* Sección de Perfil */}
        <div className="w-1/2 p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Perfil de Usuario</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Nombre:</span>
              <span className="text-gray-800">{perfil.nombre}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Apellido:</span>
              <span className="text-gray-800">{perfil.apellido}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Correo:</span>
              <span className="text-gray-800">{perfil.correo}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Empresa:</span>
              <span className="text-gray-800">{perfil.empresa.nombre}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Rubro:</span>
              <span className="text-gray-800">{perfil.rubro}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Rol:</span>
              <span className="text-gray-800 uppercase"><strong>{perfil.rol}</strong></span>
            </div>
          </div>

          <div className="flex justify-around mt-6">
            <button
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Sección del Plan */}
        {(perfil.rol === 'dios' || perfil.rol ==='admin') && (
          <div className="w-1/2 p-8 bg-blue-100 shadow-md rounded-lg flex items-center justify-center">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Su plan es:</h3>
              <p className="text-blue-700 text-lg">{perfil.plan || 'No especificado'}</p>
            </div>
          </div>
        )}
      </div>

      <BottomNav />

      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Editar Perfil</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre:</label>
              <input
                type="text"
                value={newProfile.nombre}
                onChange={(e) => setNewProfile({ ...newProfile, nombre: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Apellido:</label>
              <input
                type="text"
                value={newProfile.apellido}
                onChange={(e) => setNewProfile({ ...newProfile, apellido: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Correo:</label>
              <input
                type="text"
                value={newProfile.correo}
                onChange={(e) => setNewProfile({ ...newProfile, correo: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Rubro:</label>
              <input
                type="text"
                value={newProfile.rubro}
                onChange={(e) => setNewProfile({ ...newProfile, rubro: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Rol:</label>
              <input
                type="text"
                value={newProfile.rol}
                onChange={(e) => setNewProfile({ ...newProfile, rol: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Perfil;
