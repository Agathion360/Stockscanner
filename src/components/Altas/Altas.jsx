import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../ButtonNav/ButtonNav.jsx';
import axios from 'axios';
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import Swal from 'sweetalert2';

const Altas = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nuevoUsuario, setNuevoUsuario] = useState({
    tipo: 'empresa',
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    contraseña: '',
    correo: '',
    rol: 'usuario',
    empresaId: '',
    nombreEmpresa: '',
    rubro: '',
    planId: '',
  });

  useEffect(() => {
    if (userRole !== 'dios') {
      navigate('/inicio');
      return;
    }

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5324/usuarios/list', {
          withCredentials: true,
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPlanes = async () => {
      try {
        const response = await axios.get('http://localhost:5324/planes');
        setPlanes(response.data);
      } catch (error) {
        console.error('Error al obtener los planes:', error);
      }
    };

    const fetchEmpresas = async () => {
      try {
        const response = await axios.get('http://localhost:5324/empresas/list');
        setEmpresas(response.data);
      } catch (error) {
        console.error('Error al obtener las empresas:', error);
      }
    };

    fetchUsuarios();
    fetchPlanes();
    fetchEmpresas();
  }, [userRole, navigate]);

  const toggleEstadoUsuario = async (usuarioId, estadoActual) => {
    const accion = estadoActual ? 'desactivar' : 'activar';
    const url = `http://localhost:5324/usuarios/${accion}/${usuarioId}`;

    try {
      await axios.post(url, {}, { withCredentials: true });
      setUsuarios((usuarios) =>
        usuarios.map((usuario) =>
          usuario._id === usuarioId ? { ...usuario, estadoActivo: !estadoActual } : usuario
        )
      );
    } catch (error) {
      console.error(`Error al ${accion} el usuario:`, error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       if (nuevoUsuario.tipo === 'empresa') {
//         await axios.post('http://localhost:5324/empresas', {
//           nombreEmpresa: nuevoUsuario.nombreEmpresa,
//           rubro: nuevoUsuario.rubro,
//           nombreUsuario: nuevoUsuario.nombreUsuario,
//           contraseña: nuevoUsuario.contraseña,
//           nombre: nuevoUsuario.nombre,
//           apellido: nuevoUsuario.apellido,
//           correo: nuevoUsuario.correo,
//           plan: nuevoUsuario.planId,
//         }, { withCredentials: true });
//       } else {
//         await axios.post('http://localhost:5324/usuarios', {
//           nombreUsuario: nuevoUsuario.nombreUsuario,
//           contraseña: nuevoUsuario.contraseña,
//           nombre: nuevoUsuario.nombre,
//           apellido: nuevoUsuario.apellido,
//           correo: nuevoUsuario.correo,
//           rol: nuevoUsuario.rol,
//           empresaId: nuevoUsuario.empresaId,
//         }, { withCredentials: true });
//       }
//       Swal.fire("Éxito", `Nuevo ${nuevoUsuario.tipo} creado exitosamente`, "success");
//       setNuevoUsuario({
//         tipo: 'empresa',
//         nombre: '',
//         apellido: '',
//         nombreUsuario: '',
//         contraseña: '',
//         correo: '',
//         rol: 'usuario',
//         empresaId: '',
//         nombreEmpresa: '',
//         rubro: '',
//         planId: '',
//       });
//     } catch (error) {
//       Swal.fire("Error", `Error al crear ${nuevoUsuario.tipo}: ${error.response.data.message || error.message}`, "error");
//       console.error(`Error al crear ${nuevoUsuario.tipo}:`, error);
//     }
//   };

const handleCreate = async (e) => {
    e.preventDefault();
    try {
        let nuevoItem;
        if (nuevoUsuario.tipo === 'empresa') {
            // Crear empresa con admin
            const response = await axios.post('http://localhost:5324/empresas', {
                nombreEmpresa: nuevoUsuario.nombreEmpresa,
                rubro: nuevoUsuario.rubro,
                nombreUsuario: nuevoUsuario.nombreUsuario,
                contraseña: nuevoUsuario.contraseña,
                nombre: nuevoUsuario.nombre,
                apellido: nuevoUsuario.apellido,
                correo: nuevoUsuario.correo,
                plan: nuevoUsuario.planId,
            }, { withCredentials: true });
            
            // Asignar la respuesta para agregar a la lista de usuarios
            nuevoItem = response.data.admin;
        } else {
            // Crear usuario para empresa existente
            const response = await axios.post('http://localhost:5324/usuarios', {
                nombreUsuario: nuevoUsuario.nombreUsuario,
                contraseña: nuevoUsuario.contraseña,
                nombre: nuevoUsuario.nombre,
                apellido: nuevoUsuario.apellido,
                correo: nuevoUsuario.correo,
                rol: nuevoUsuario.rol,
                empresaId: nuevoUsuario.empresaId,
            }, { withCredentials: true });
            
            // Asignar la respuesta para agregar a la lista de usuarios
            nuevoItem = response.data.usuario;
        }

        // Agregar el nuevo usuario a la lista de usuarios en el estado
        setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoItem]);

        // Mostrar mensaje de éxito
        Swal.fire("Éxito", `Nuevo ${nuevoUsuario.tipo} creado exitosamente`, "success");

        // Resetear el formulario
        setNuevoUsuario({
            tipo: 'empresa',
            nombre: '',
            apellido: '',
            nombreUsuario: '',
            contraseña: '',
            correo: '',
            rol: 'usuario',
            empresaId: '',
            nombreEmpresa: '',
            rubro: '',
            planId: '',
        });
    } catch (error) {
        Swal.fire("Error", `Error al crear ${nuevoUsuario.tipo}: ${error.response?.data?.message || error.message}`, "error");
        console.error(`Error al crear ${nuevoUsuario.tipo}:`, error);
    }
};


  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen flex mb-24">
        {/* Tabla de Usuarios */}
        <div className="w-2/3">
          <h1 className="text-3xl font-bold text-center mb-6">Lista de Usuarios</h1>
          <div className="overflow-y-auto max-h-4.5">
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="px-6 py-3 text-left font-semibold bg-slate-500">Empresa</th>
                  <th className="px-6 py-3 text-left font-semibold">Nombre</th>
                  <th className="px-6 py-3 text-left font-semibold">Nombre de Usuario</th>
                  <th className="px-6 py-3 text-left font-semibold">Rol usuario</th>
                  <th className="px-6 py-3 text-left font-semibold">Correo</th>
                  <th className="px-6 py-3 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario, index) => (
                  <tr key={usuario._id} className={`hover:bg-indigo-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="px-6 py-4 border-b bg-slate-300">{usuario.empresa?.nombre || 'N/A'}</td>
                    <td className="px-6 py-4 border-b">{usuario.nombre} {usuario.apellido}</td>
                    <td className="px-6 py-4 border-b">{usuario.nombreUsuario}</td>
                    <td className="px-6 py-4 border-b">{usuario.rol}</td>
                    <td className="px-6 py-4 border-b">{usuario.correo}</td>
                    <td className="px-6 py-4 border-b text-center">
                      <button
                        onClick={() => toggleEstadoUsuario(usuario._id, usuario.estadoActivo)}
                        className={`py-1 px-3 rounded transition duration-200 flex items-center justify-center ${
                          usuario.estadoActivo ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
                        } text-white font-bold`}
                      >
                        {usuario.estadoActivo ? <AiOutlineClose /> : <AiOutlineCheck />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario de creación */}
        <div className="w-1/3 pl-4">
          <h2 className="text-2xl font-semibold mb-4">Crear {nuevoUsuario.tipo === 'empresa' ? 'Empresa y Admin' : 'Usuario'}</h2>
          <form onSubmit={handleCreate} className="bg-white shadow-md rounded-lg p-4 space-y-4">
            <div>
              <label>Tipo:</label>
              <select name="tipo" value={nuevoUsuario.tipo} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="empresa">Empresa (Admin)</option>
                <option value="usuario">Usuario</option>
              </select>
            </div>

            {nuevoUsuario.tipo === 'empresa' && (
              <>
                <div>
                  <label>Nombre de la Empresa:</label>
                  <input name="nombreEmpresa" value={nuevoUsuario.nombreEmpresa} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                  <label>Rubro:</label>
                  <input name="rubro" value={nuevoUsuario.rubro} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                  <label>Plan:</label>
                  <select name="planId" value={nuevoUsuario.planId} onChange={handleInputChange} className="w-full p-2 border rounded" required>
                    <option value="">Seleccione un plan</option>
                    {planes.map((plan) => (
                      <option key={plan._id} value={plan._id}>
                        {plan.nombre} - ${plan.precioMensual} / mes
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {nuevoUsuario.tipo === 'usuario' && (
              <div>
                <label>Empresa:</label>
                <select name="empresaId" value={nuevoUsuario.empresaId} onChange={handleInputChange} className="w-full p-2 border rounded" required>
                  <option value="">Seleccione una empresa</option>
                  {empresas.map((empresa) => (
                    <option key={empresa._id} value={empresa._id}>
                      {empresa.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label>Nombre:</label>
              <input name="nombre" value={nuevoUsuario.nombre} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label>Apellido:</label>
              <input name="apellido" value={nuevoUsuario.apellido} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label>Nombre de Usuario:</label>
              <input name="nombreUsuario" value={nuevoUsuario.nombreUsuario} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label>Contraseña:</label>
              <input type="password" name="contraseña" value={nuevoUsuario.contraseña} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label>Correo:</label>
              <input type="email" name="correo" value={nuevoUsuario.correo} onChange={handleInputChange} className="w-full p-2 border rounded" required />
            </div>

            <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-700 transition duration-200">
              Crear {nuevoUsuario.tipo === 'empresa' ? 'Empresa' : 'Usuario'}
            </button>
          </form>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Altas;
