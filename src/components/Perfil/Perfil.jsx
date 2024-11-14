





// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2'; // Importamos SweetAlert2

// const Perfil = () => {
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });

//   useEffect(() => {
//     const obtenerPerfil = async () => {
//       try {
//           // const response = await fetch('https://asijeminapis.website:5324/usuarios/perfil', {
//             const response = await fetch('http://localhost:5324/usuarios/perfil', {

//               method: 'GET',
//               credentials: 'include',  // Incluir cookies
//           });
  
//           if (response.ok) {
//               const data = await response.json();
//           } else {
//               throw new Error(`Error ${response.status}: ${response.statusText}`);
//           }
//       } catch (error) {
//           console.error('Error al obtener el perfil:', error);
//       }
//   };
  

//     obtenerPerfil();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//       console.log('Datos enviados al servidor:', newProfile);

//       // const response = await fetch('https://asijeminapis.website:5324/usuarios/actualizar', {
//         const response = await fetch('http://localhost:5324/usuarios/actualizar', {

//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Enviar cookies
//         body: JSON.stringify(newProfile),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Perfil actualizado:', data);

//         if (data && data.nombre && data.apellido && data.correo && data.empresa && data.rubro && data.cargo) {
//           setPerfil({
//             nombre: data.nombre,
//             apellido: data.apellido,
//             correo: data.correo,
//             empresa: data.empresa,  // Empresa viene directamente
//             rubro: data.rubro,      // Rubro viene directamente
//             cargo: data.cargo,
//           });

//           setShowEditModal(false);
//           Swal.fire({
//             icon: 'success',
//             title: 'Perfil actualizado',
//             text: 'Los cambios se han guardado correctamente',
//           });
//         } else {
//           throw new Error('Datos incompletos en la respuesta del servidor');
//         }
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

//   if (loading) {
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
//             <span className="text-gray-800">{perfil.empresa}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rubro:</span>
//             <span className="text-gray-800">{perfil.rubro}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Cargo:</span>
//             <span className="text-gray-800">{perfil.cargo}</span>
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

//       {/* Modal para editar el perfil */}
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









// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2';

// const Perfil = () => {
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });

//   useEffect(() => {
//     const obtenerPerfil = async () => {
//       try {
//          const response = await fetch('https://asijeminapis.website:5324/usuarios/perfil', {
//           method: 'GET',
//           credentials: 'include',  // Asegúrate de que las cookies se envían
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setPerfil({
//             nombre: data.nombre,
//             apellido: data.apellido,
//             correo: data.correo,
//             empresa: data.empresa.nombre,
//             rubro: data.empresa.rubro,
//             cargo: data.cargo,
//           });
//           setLoading(false);
//         } else {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error('Error al obtener el perfil:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error al obtener perfil',
//           text: 'Hubo un problema al cargar tu perfil. Intenta nuevamente.',
//         });
//       }
//     };

//     obtenerPerfil();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//        const response = await fetch('https://asijeminapis.website:5324/usuarios/actualizar', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',  // Incluir cookies
//         body: JSON.stringify(newProfile),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPerfil(data);  // Actualiza el perfil
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

//   if (loading) {
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
//             <span className="text-gray-800">{perfil.empresa}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rubro:</span>
//             <span className="text-gray-800">{perfil.rubro}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Cargo:</span>
//             <span className="text-gray-800">{perfil.cargo}</span>
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
//             <div className="flex justify-end">
//               <button
//                 onClick={handleEditProfile}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Guardar Cambios
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Perfil;
















// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2'; // Importamos SweetAlert2

// const Perfil = () => {
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });

//   useEffect(() => {
//     const obtenerPerfil = async () => {
//       try {
//           const response = await fetch('https://asijeminapis.website:5324/usuarios/perfil', {
//               method: 'GET',
//               credentials: 'include',  // Incluir cookies para enviar el token
//           });

//           if (response.ok) {
//               const data = await response.json();
//               setPerfil({
//                 nombre: data.nombre,
//                 apellido: data.apellido,
//                 correo: data.correo,
//                 empresa: data.empresa,
//                 rubro: data.rubro,
//                 cargo: data.cargo,
//               });
//               setLoading(false);
//           } else {
//               throw new Error(`Error ${response.status}: ${response.statusText}`);
//           }
//       } catch (error) {
//           console.error('Error al obtener el perfil:', error);
//       }
//     };
  
//     obtenerPerfil();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//       const response = await fetch('https://asijeminapis.website:5324/usuarios/actualizar', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Incluir cookies para enviar el token
//         body: JSON.stringify(newProfile),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPerfil(data);  // Actualiza el perfil
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

//   if (loading) {
//     return <p className="text-center text-gray-500">Cargando perfil...</p>;
//   }

//   return (
//     <>
//       <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Perfil de Usuario</h2>
//         {/* Datos del perfil */}
//         <BottomNav />
//       </div>
//     </>
//   );
// };

// export default Perfil;















// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2'; // Importamos SweetAlert2

// const Perfil = () => {
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '' });

//   useEffect(() => {
//     const obtenerPerfil = async () => {
//       try {
//         const response = await fetch('https://asijeminapis.website:5324/usuarios/perfil', {
//           method: 'GET',
//           credentials: 'include',  // Incluir cookies para enviar el token
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setPerfil({
//             nombre: data.nombre,
//             apellido: data.apellido,
//             correo: data.correo,
//             empresa: data.empresa ? data.empresa.nombre : '',
//             rubro: data.empresa ? data.empresa.rubro : '',
//             cargo: data.cargo,
//           });
//           setLoading(false);
//         } else {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error('Error al obtener el perfil:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error al obtener perfil',
//           text: 'Hubo un problema al cargar tu perfil. Intenta nuevamente.',
//         });
//       }
//     };

//     obtenerPerfil();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//       const response = await fetch('https://asijeminapis.website:5324/usuarios/actualizar', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Incluir cookies para enviar el token
//         body: JSON.stringify(newProfile),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPerfil({
//           ...perfil,
//           nombre: data.nombre,
//           apellido: data.apellido,
//           correo: data.correo,
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

//   // Función para abrir el modal y prellenar los campos con el perfil actual
//   const openEditModal = () => {
//     setNewProfile({
//       nombre: perfil.nombre,
//       apellido: perfil.apellido,
//       correo: perfil.correo,
//     });
//     setShowEditModal(true);
//   };

//   if (loading) {
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
//             <span className="text-gray-800">{perfil.empresa}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rubro:</span>
//             <span className="text-gray-800">{perfil.rubro}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Cargo:</span>
//             <span className="text-gray-800">{perfil.cargo}</span>
//           </div>
//         </div>

//         <div className="flex justify-around mt-6">
//           <button
//             onClick={openEditModal}
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
//                 type="email"
//                 value={newProfile.correo}
//                 onChange={(e) => setNewProfile({ ...newProfile, correo: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={handleEditProfile}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Guardar Cambios
//               </button>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 ml-2"
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






// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2'; // Importamos SweetAlert2

// const Perfil = () => {
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '' });

//   useEffect(() => {
//     const empresaId = localStorage.getItem('empresaId');
//     if (!empresaId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'No se encontró información de la empresa. Intenta iniciar sesión nuevamente.',
//       });
//       return;
//     }

//     const verificarEstadoEmpresa = async () => {
//       try {
//         const response = await fetch(`https://asijeminapis.website:5324/empresas/estado/${empresaId}`, {
//           method: 'GET',
//           credentials: 'include', // Incluir cookies para enviar el token
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (!data.active) {
//             Swal.fire({
//               icon: 'error',
//               title: 'Empresa desactivada',
//               text: 'La empresa está desactivada. Contacta al administrador.',
//             });
//             return;
//           } else {
//             obtenerPerfil();
//           }
//         } else {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error('Error al verificar el estado de la empresa:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Hubo un problema al verificar el estado de la empresa.',
//         });
//       }
//     };

//     const obtenerPerfil = async () => {
//       try {
//         const response = await fetch('https://asijeminapis.website:5324/usuarios/perfil', {
//           method: 'GET',
//           credentials: 'include',  // Incluir cookies para enviar el token
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setPerfil({
//             nombre: data.nombre,
//             apellido: data.apellido,
//             correo: data.correo,
//             empresa: data.empresa ? data.empresa.nombre : '',
//             rubro: data.empresa ? data.empresa.rubro : '',
//             cargo: data.cargo,
//           });
//           setLoading(false);
//         } else {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error('Error al obtener el perfil:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error al obtener perfil',
//           text: 'Hubo un problema al cargar tu perfil. Intenta nuevamente.',
//         });
//       }
//     };

//     verificarEstadoEmpresa();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//       const response = await fetch('https://asijeminapis.website:5324/usuarios/actualizar', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Incluir cookies para enviar el token
//         body: JSON.stringify(newProfile),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPerfil({
//           ...perfil,
//           nombre: data.nombre,
//           apellido: data.apellido,
//           correo: data.correo,
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

//   // Función para abrir el modal y prellenar los campos con el perfil actual
//   const openEditModal = () => {
//     setNewProfile({
//       nombre: perfil.nombre,
//       apellido: perfil.apellido,
//       correo: perfil.correo,
//     });
//     setShowEditModal(true);
//   };

//   if (loading) {
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
//             <span className="text-gray-800">{perfil.empresa}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rubro:</span>
//             <span className="text-gray-800">{perfil.rubro}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Cargo:</span>
//             <span className="text-gray-800">{perfil.cargo}</span>
//           </div>
//         </div>

//         <div className="flex justify-around mt-6">
//           <button
//             onClick={openEditModal}
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
//                 type="email"
//                 value={newProfile.correo}
//                 onChange={(e) => setNewProfile({ ...newProfile, correo: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={handleEditProfile}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Guardar Cambios
//               </button>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 ml-2"
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









// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2'; // Importamos SweetAlert2

// const Perfil = () => {
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '' });

//   useEffect(() => {
//     const empresaId = localStorage.getItem('empresaId');
//     if (!empresaId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'No se encontró información de la empresa. Intenta iniciar sesión nuevamente.',
//       });
//       return;
//     }

//     const verificarEstadoEmpresa = async () => {
//       try {
//         // Obtener el token desde las cookies
//         const jwt = document.cookie.split('; ').find(row => row.startsWith('jwt='));
//         if (!jwt) {
//           throw new Error('No se encontró el token de autenticación. Intenta iniciar sesión nuevamente.');
//         }
//         const token = jwt.split('=')[1];

//         // Verificar si la empresa está activa
//         const response = await fetch(`https://asijeminapis.website:5324/empresas/estado/${empresaId}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//           credentials: 'include', // Incluir cookies para enviar el token
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (!data.active) {
//             Swal.fire({
//               icon: 'error',
//               title: 'Empresa desactivada',
//               text: 'La empresa está desactivada. Contacta al administrador.',
//             });
//             return;
//           } else {
//             obtenerPerfil(token);
//           }
//         } else {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error('Error al verificar el estado de la empresa:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Hubo un problema al verificar el estado de la empresa. Intenta iniciar sesión nuevamente.',
//         });
//       }
//     };

//     const obtenerPerfil = async (token) => {
//       try {
//         const response = await fetch('https://asijeminapis.website:5324/usuarios/perfil', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//           credentials: 'include',  // Incluir cookies para enviar el token
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setPerfil({
//             nombre: data.nombre,
//             apellido: data.apellido,
//             correo: data.correo,
//             empresa: data.empresa ? data.empresa.nombre : '',
//             rubro: data.empresa ? data.empresa.rubro : '',
//             cargo: data.cargo,
//           });
//           setLoading(false);
//         } else {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error('Error al obtener el perfil:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error al obtener perfil',
//           text: 'Hubo un problema al cargar tu perfil. Intenta nuevamente.',
//         });
//       }
//     };

//     verificarEstadoEmpresa();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//       const response = await fetch('https://asijeminapis.website:5324/usuarios/actualizar', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Incluir cookies para enviar el token
//         body: JSON.stringify(newProfile),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPerfil({
//           ...perfil,
//           nombre: data.nombre,
//           apellido: data.apellido,
//           correo: data.correo,
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

//   // Función para abrir el modal y prellenar los campos con el perfil actual
//   const openEditModal = () => {
//     setNewProfile({
//       nombre: perfil.nombre,
//       apellido: perfil.apellido,
//       correo: perfil.correo,
//     });
//     setShowEditModal(true);
//   };

//   if (loading) {
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
//             <span className="text-gray-800">{perfil.empresa}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rubro:</span>
//             <span className="text-gray-800">{perfil.rubro}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Cargo:</span>
//             <span className="text-gray-800">{perfil.cargo}</span>
//           </div>
//         </div>

//         <div className="flex justify-around mt-6">
//           <button
//             onClick={openEditModal}
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
//                 type="email"
//                 value={newProfile.correo}
//                 onChange={(e) => setNewProfile({ ...newProfile, correo: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={handleEditProfile}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Guardar Cambios
//               </button>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 ml-2"
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






// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2'; // Importamos SweetAlert2

// const Perfil = () => {
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '' });

//   useEffect(() => {
//     const empresaId = localStorage.getItem('empresaId');
//     if (!empresaId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'No se encontró información de la empresa. Intenta iniciar sesión nuevamente.',
//       });
//       return;
//     }

//     const verificarEstadoEmpresa = async () => {
//       try {
//         const response = await fetch(`https://asijeminapis.website:5324/empresas/estado/${empresaId}`, {
//           method: 'GET',
//           credentials: 'include', // Incluir cookies para enviar el token
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (!data.active) {
//             Swal.fire({
//               icon: 'error',
//               title: 'Empresa desactivada',
//               text: 'La empresa está desactivada. Contacta al administrador.',
//             });
//             return;
//           } else {
//             obtenerPerfil();
//           }
//         } else {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error('Error al verificar el estado de la empresa:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Hubo un problema al verificar el estado de la empresa.',
//         });
//       }
//     };

//     const obtenerPerfil = async () => {
//       try {
//         const response = await fetch('https://asijeminapis.website:5324/usuarios/perfil', {
//           method: 'GET',
//           credentials: 'include',  // Incluir cookies para enviar el token
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setPerfil({
//             nombre: data.nombre,
//             apellido: data.apellido,
//             correo: data.correo,
//             empresa: data.empresa ? data.empresa.nombre : '',
//             rubro: data.empresa ? data.empresa.rubro : '',
//             cargo: data.cargo,
//           });
//           setLoading(false);
//         } else {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error('Error al obtener el perfil:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error al obtener perfil',
//           text: 'Hubo un problema al cargar tu perfil. Intenta nuevamente.',
//         });
//       }
//     };

//     verificarEstadoEmpresa();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//       const response = await fetch('https://asijeminapis.website:5324/usuarios/actualizar', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Incluir cookies para enviar el token
//         body: JSON.stringify(newProfile),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPerfil({
//           ...perfil,
//           nombre: data.nombre,
//           apellido: data.apellido,
//           correo: data.correo,
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

//   // Función para abrir el modal y prellenar los campos con el perfil actual
//   const openEditModal = () => {
//     setNewProfile({
//       nombre: perfil.nombre,
//       apellido: perfil.apellido,
//       correo: perfil.correo,
//     });
//     setShowEditModal(true);
//   };

//   if (loading) {
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
//             <span className="text-gray-800">{perfil.empresa}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rubro:</span>
//             <span className="text-gray-800">{perfil.rubro}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Cargo:</span>
//             <span className="text-gray-800">{perfil.cargo}</span>
//           </div>
//         </div>

//         <div className="flex justify-around mt-6">
//           <button
//             onClick={openEditModal}
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
//                 type="email"
//                 value={newProfile.correo}
//                 onChange={(e) => setNewProfile({ ...newProfile, correo: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={handleEditProfile}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Guardar Cambios
//               </button>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 ml-2"
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













// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2'; // Importamos SweetAlert2

// const Perfil = () => {
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '' });

//   useEffect(() => {
//     const obtenerPerfil = async () => {
//       try {
//         const response = await fetch('https://asijeminapis.website:5324/usuarios/perfil', {
//           method: 'GET',
//           credentials: 'include',  // Incluir cookies para enviar el token
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setPerfil({
//             nombre: data.nombre,
//             apellido: data.apellido,
//             correo: data.correo,
//             empresa: data.empresa ? data.empresa.nombre : '',
//             rubro: data.empresa ? data.empresa.rubro : '',
//             cargo: data.cargo,
//           });
//           setLoading(false);
//         } else {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error('Error al obtener el perfil:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error al obtener perfil',
//           text: 'Hubo un problema al cargar tu perfil. Intenta nuevamente.',
//         });
//       }
//     };

//     obtenerPerfil();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//       const response = await fetch('https://asijeminapis.website:5324/usuarios/actualizar', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Incluir cookies para enviar el token
//         body: JSON.stringify(newProfile),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPerfil({
//           ...perfil,
//           nombre: data.nombre,
//           apellido: data.apellido,
//           correo: data.correo,
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

//   // Función para abrir el modal y prellenar los campos con el perfil actual
//   const openEditModal = () => {
//     setNewProfile({
//       nombre: perfil.nombre,
//       apellido: perfil.apellido,
//       correo: perfil.correo,
//     });
//     setShowEditModal(true);
//   };

//   if (loading) {
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
//             <span className="text-gray-800">{perfil.empresa}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rubro:</span>
//             <span className="text-gray-800">{perfil.rubro}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Cargo:</span>
//             <span className="text-gray-800">{perfil.cargo}</span>
//           </div>
//         </div>

//         <div className="flex justify-around mt-6">
//           <button
//             onClick={openEditModal}
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
//                 type="email"
//                 value={newProfile.correo}
//                 onChange={(e) => setNewProfile({ ...newProfile, correo: e.target.value })}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={handleEditProfile}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Guardar Cambios
//               </button>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 ml-2"
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




// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2';

// const Perfil = () => {
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', cargo: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '', cargo: '' });

//   useEffect(() => {
//     const obtenerPerfil = async () => {
//       try {
//         // const response = await fetch('https://asijeminapis.website:5324/usuarios/perfil', {
//           const response = await fetch('http://localhost:5324/usuarios/perfil', {

//           method: 'GET',
//           credentials: 'include',
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setPerfil(data);
//         } else {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error('Error al obtener el perfil:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error al obtener perfil',
//           text: 'Hubo un problema al cargar tu perfil. Intenta nuevamente.',
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
//     obtenerPerfil();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//       // const response = await fetch('https://asijeminapis.website:5324/usuarios/actualizar', {
//         const response = await fetch('http://localhost:5324/usuarios/actualizar', {

//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(newProfile),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPerfil(data.usuarioActualizado);
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

//   if (loading) {
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
//             <span className="font-semibold text-gray-700">Cargo:</span>
//             <span className="text-gray-800">{perfil.cargo}</span>
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

//       {/* Modal para editar el perfil */}
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















// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2';

// const Perfil = () => {
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', cargo: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '', cargo: '' });

//   useEffect(() => {
//     const obtenerPerfil = async () => {
//       try {
//         // const response = await fetch('https://asijeminapis.website:5324/usuarios/perfil', {
//           const response = await fetch('http://localhost:5324/usuarios/perfil', {

//           method: 'GET',
//           credentials: 'include',  // Asegúrate de que las cookies se envían
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setPerfil({
//             nombre: data.nombre,
//             apellido: data.apellido,
//             correo: data.correo,
//             cargo: data.cargo,
//           });
//           setLoading(false);
//         } else {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error('Error al obtener el perfil:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error al obtener perfil',
//           text: 'Hubo un problema al cargar tu perfil. Intenta nuevamente.',
//         });
//       }
//     };

//     obtenerPerfil();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//       // const response = await fetch('https://asijeminapis.website:5324/usuarios/actualizar', {
//         const response = await fetch('http://localhost:5324/usuarios/actualizar', {

//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Enviar cookies
//         body: JSON.stringify(newProfile),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPerfil({
//           nombre: data.nombre,
//           apellido: data.apellido,
//           correo: data.correo,
//           cargo: data.cargo,
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

//   const openEditModal = () => {
//     setNewProfile({
//       nombre: perfil.nombre,
//       apellido: perfil.apellido,
//       correo: perfil.correo,
//       cargo: perfil.cargo,
//     });
//     setShowEditModal(true);
//   };

//   if (loading) {
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
//             <span className="font-semibold text-gray-700">Cargo:</span>
//             <span className="text-gray-800">{perfil.cargo}</span>
//           </div>
//         </div>

//         <div className="flex justify-around mt-6">
//           <button
//             onClick={openEditModal}
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
















// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2';

// const Perfil = () => {
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });

//   useEffect(() => {
//     const obtenerPerfil = async () => {
//       try {
//         // Verifica si existe la cookie 'jwt' antes de hacer la solicitud
//         const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
        
//         if (!jwtCookie) {
//           throw new Error('No se encontró el token de autenticación');
//         }

//         const response = await fetch('http://localhost:5324/usuarios/perfil', {
//           method: 'GET',
//           credentials: 'include',  // Incluir cookies
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setPerfil({
//             nombre: data.nombre,
//             apellido: data.apellido,
//             correo: data.correo,
//             empresa: data.empresa,
//             rubro: data.rubro,
//             cargo: data.cargo,
//           });
//         } else {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }
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

//     obtenerPerfil();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//       const response = await fetch('http://localhost:5324/usuarios/actualizar', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Enviar cookies
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
//           cargo: data.cargo,
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

//   if (loading) {
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
//             <span className="text-gray-800">{perfil.empresa}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rubro:</span>
//             <span className="text-gray-800">{perfil.rubro}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Cargo:</span>
//             <span className="text-gray-800">{perfil.cargo}</span>
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







// import React, { useState, useEffect } from 'react';
// import BottomNav from '../ButtonNav/ButtonNav.jsx';
// import Swal from 'sweetalert2';

// const Perfil = () => {
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });

//   useEffect(() => {
//     const obtenerPerfil = async () => {
//       try {
//         // Verifica si existe la cookie 'jwt' antes de hacer la solicitud
//         const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
        
//         if (!jwtCookie) {
//           throw new Error('No se encontró el token de autenticación');
//         }

//         const response = await fetch('http://localhost:5324/usuarios/perfil', {
//           method: 'GET',
//           credentials: 'include',  // Incluir cookies
//         });

//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }

//         const data = await response.json();
        
//         // Verificar si los datos son los esperados
//         if (data && data.nombre && data.apellido && data.correo) {
//           setPerfil({
//             nombre: data.nombre,
//             apellido: data.apellido,
//             correo: data.correo,
//             empresa: data.empresa || '',  // En caso de que no esté presente
//             rubro: data.rubro || '',
//             cargo: data.cargo || '',
//           });
//           setLoading(false);
//         } else {
//           throw new Error('Datos incompletos en la respuesta del servidor');
//         }
//       } catch (error) {
//         console.error('Error al obtener el perfil:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Hubo un problema al cargar tu perfil. Intenta nuevamente.',
//         });
//         setLoading(false);
//       }
//     };

//     obtenerPerfil();
//   }, []);

//   const handleEditProfile = async () => {
//     try {
//       const response = await fetch('http://localhost:5324/usuarios/actualizar', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Enviar cookies
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
//           cargo: data.cargo,
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

//   if (loading) {
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
//             <span className="text-gray-800">{perfil.empresa}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rubro:</span>
//             <span className="text-gray-800">{perfil.rubro}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Cargo:</span>
//             <span className="text-gray-800">{perfil.cargo}</span>
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
//   const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: { nombre: '' }, rubro: '', cargo: '' });
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });

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
        
//         if (data && data.nombre && data.apellido && data.correo) {
//           setPerfil({
//             nombre: data.nombre,
//             apellido: data.apellido,
//             correo: data.correo,
//             empresa: data.empresa || { nombre: '' },  // Asegúrate de que empresa es un objeto
//             rubro: data.rubro || '',
//             cargo: data.cargo || '',
//           });
//         } else {
//           throw new Error('Datos incompletos en la respuesta del servidor');
//         }
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
//           cargo: data.cargo,
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
//             {/* Asegúrate de mostrar solo el nombre de la empresa */}
//             <span className="text-gray-800">{perfil.empresa.nombre}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Rubro:</span>
//             <span className="text-gray-800">{perfil.rubro}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-semibold text-gray-700">Cargo:</span>
//             <span className="text-gray-800">{perfil.cargo}</span>
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
//             {/* Otros campos para la edición */}
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
  const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: { nombre: '' }, rubro: '', cargo: '' });
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '', empresa: '', rubro: '', cargo: '' });

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
        console.log(data);

        if (data && data.nombre && data.apellido && data.correo) {
          setPerfil({
            nombre: data.nombre,
            apellido: data.apellido,
            correo: data.correo,
            empresa: data.empresa || { nombre: '' },
            rubro: data.empresa.rubro || '',
            cargo: data.cargo || '',
          });
        } else {
          throw new Error('Datos incompletos en la respuesta del servidor');
        }
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
          cargo: data.cargo,
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
      <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
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
            <span className="font-semibold text-gray-700">Cargo:</span>
            <span className="text-gray-800">{perfil.cargo}</span>
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
              <label className="block text-gray-700">Cargo:</label>
              <input
                type="text"
                value={newProfile.cargo}
                onChange={(e) => setNewProfile({ ...newProfile, cargo: e.target.value })}
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
