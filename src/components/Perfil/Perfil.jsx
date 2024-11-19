


import React, { useState, useEffect, useContext } from 'react';
import BottomNav from '../ButtonNav/ButtonNav.jsx';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const Perfil = () => {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const [perfil, setPerfil] = useState({ nombre: '', apellido: '', correo: '', empresa: { nombre: '' }, rubro: '', rol: '', plan: '' });
  const [loading, setLoading] = useState(true);
  const [usuariosEmpresa, setUsuariosEmpresa] = useState([]);
  const [empresaInfo, setEmpresaInfo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProfile, setNewProfile] = useState({ nombre: '', apellido: '', correo: '' });
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ nombreUsuario: '', nombre: '', apellido: '', correo: '', contraseña: '' });

  // Obtener perfil del usuario
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

        setPerfil({
          nombre: data.nombre || data.nombreUsuario || '',
          apellido: data.apellido || '',
          correo: data.correo || '',
          empresa: data.empresa || { nombre: '' },
          rubro: data.empresa?.rubro || '',
          rol: data.rol || '',
          plan: data.plan || ''
        });
        setNewProfile({
          nombre: data.nombre || '',
          apellido: data.apellido || '',
          correo: data.correo || ''
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

  // Obtener usuarios de la empresa y actualizar empresaInfo
  const actualizarDatosEmpresa = async () => {
    try {
      // Refrescar lista de usuarios de la empresa
      if (perfil.rol === 'admin' && perfil.empresa._id) {
        const usuariosResponse = await fetch(`http://localhost:5324/usuarios/empresa/usuarios`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!usuariosResponse.ok) {
          throw new Error(`Error ${usuariosResponse.status}: ${usuariosResponse.statusText}`);
        }

        const usuariosData = await usuariosResponse.json();
        setUsuariosEmpresa(usuariosData);

        // Refrescar información de la empresa
        const empresaResponse = await fetch(`http://localhost:5324/empresas/info/${perfil.empresa._id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!empresaResponse.ok) {
          throw new Error(`Error ${empresaResponse.status}: ${empresaResponse.statusText}`);
        }

        const empresaData = await empresaResponse.json();
        setEmpresaInfo(empresaData);
      }
    } catch (error) {
      console.error('Error al actualizar información de la empresa:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar los datos de la empresa.',
      });
    }
  };

  useEffect(() => {
    actualizarDatosEmpresa();
  }, [perfil.rol, perfil.empresa._id]);

  const toggleEstadoUsuario = async (usuarioId) => {
    try {
      const response = await fetch(`http://localhost:5324/usuarios/empresa/desactivar/${usuarioId}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setUsuariosEmpresa((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario._id === usuarioId ? { ...usuario, estadoActivo: !usuario.estadoActivo } : usuario
        )
      );

      // Refrescar datos de la empresa
      await actualizarDatosEmpresa();

      Swal.fire("Éxito", data.message, "success");
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
      Swal.fire("Error", "Hubo un problema al cambiar el estado del usuario", "error");
    }
  };

  const handleAddUser = async () => {
    try {
      if (empresaInfo.usuariosCreados >= empresaInfo.plan.limiteUsuarios) {
        Swal.fire({
          icon: 'error',
          title: 'Límite alcanzado',
          text: 'No puedes crear más usuarios. Has alcanzado el límite de usuarios permitidos por tu plan.',
        });
        return;
      }

      const response = await fetch('http://localhost:5324/usuarios/alta-empleado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setUsuariosEmpresa((prev) => [...prev, data]);
      setNewUser({ nombreUsuario: '', nombre: '', apellido: '', correo: '', contraseña: '' });

      setShowAddUserModal(false);

      // Refrescar datos de la empresa después de agregar un usuario
      await actualizarDatosEmpresa();

      Swal.fire('Éxito', 'Usuario creado exitosamente', 'success');
    } catch (error) {
      console.error("Error al agregar usuario:", error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

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
          ...perfil,
          nombre: data.nombre,
          apellido: data.apellido,
          correo: data.correo,
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
      <div className="w-full mx-auto flex mt-10 space-x-4">
        <div className="w-[350px] p-8 bg-white shadow-md rounded-lg ml-[120px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Perfil de Usuario</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Nombre:</span>
              <span className="text-gray-800 capitalize">{perfil.nombre}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Apellido:</span>
              <span className="text-gray-800 capitalize">{perfil.apellido}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Correo:</span>
              <span className="text-gray-800">{perfil.correo}</span>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Editar Perfil
            </button>
          </div>
        </div>

        {empresaInfo && (
          <div className="w-[370px] p-8 bg-green-100 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">Información de la Empresa</h3>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Empresa:</span>
              <span className="uppercase font-bold">{empresaInfo.nombre}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Rubro:</span>
              <span className="uppercase">{empresaInfo.rubro}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Plan:</span>
              <span className="uppercase">{empresaInfo.plan.nombre}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Límite de Usuarios:</span>
              <span className="capitalize text-bold text-xl">{empresaInfo.plan.limiteUsuarios}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Usuarios Creados:</span>
              <span className="capitalize text-bold text-xl">{empresaInfo.usuariosCreados}</span>
            </div>
          </div>
        )}

        {perfil.rol === 'admin' && (
          <div className="w-[680px] p-8 bg-blue-100 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Usuarios de la Empresa</h3>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Agregar Usuario
            </button>

            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left text-blue-700 font-semibold">Nombre</th>
                  <th className="py-2 px-4 border-b text-left text-blue-700 font-semibold">Correo</th>
                  <th className="py-2 px-4 border-b text-left text-blue-700 font-semibold">Estado</th>
                  <th className="py-2 px-4 border-b text-left text-blue-700 font-semibold">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosEmpresa.map((usuario) => (
                  <tr key={usuario._id}>
                    <td className="py-2 px-4 border-b">{usuario.nombre} {usuario.apellido}</td>
                    <td className="py-2 px-4 border-b">{usuario.correo}</td>
                    <td className="py-2 px-4 border-b">
                      {usuario.estadoActivo ? 'Activo' : 'Inactivo'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => toggleEstadoUsuario(usuario._id)}
                        className={`px-2 py-1 rounded-lg ${
                          usuario.estadoActivo ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        } text-white`}
                      >
                        {usuario.estadoActivo ? <AiOutlineClose /> : <AiOutlineCheck />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddUserModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Agregar Usuario</h3>

            <div className="mb-4">
              <label className="block text-gray-700">Nombre:</label>
              <input
                type="text"
                value={newUser.nombre}
                onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Apellido:</label>
              <input
                type="text"
                value={newUser.apellido}
                onChange={(e) => setNewUser({ ...newUser, apellido: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Correo:</label>
              <input
                type="email"
                value={newUser.correo}
                onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre de Usuario:</label>
              <input
                type="text"
                value={newUser.nombreUsuario}
                onChange={(e) => setNewUser({ ...newUser, nombreUsuario: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Contraseña:</label>
              <input
                type="password"
                value={newUser.contraseña}
                onChange={(e) => setNewUser({ ...newUser, contraseña: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Crear Usuario
              </button>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

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

      <BottomNav />
    </>
  );
};

export default Perfil;
