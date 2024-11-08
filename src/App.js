


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BarcodeScanner from './components/Scaner/Scaner';
import Inicio from './components/Inicio/Inicio';
import Stock from './components/Stock/Stock';
import Salida from './components/Salida/Salida';
import Ingreso from './components/Ingreso/Ingreso';
import Consulta from './components/Consulta/Consulta';
import Login from './components/Login/Login';
import Perfil from './components/Perfil/Perfil';
import RegistroAdmin from './components/RegistroAdmin/RegistroAdmin';
import { AuthProvider } from './components/context/AuthContext'; // Importa el AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Importa la ruta protegida

function App() {
  return (
    <Router>
      {/* Envuelve el Router con AuthProvider */}
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/alta-empresa" element={<RegistroAdmin />} />
            {/* Rutas protegidas */}
            <Route
              path="/inicio"
              element={
                <ProtectedRoute>
                  <Inicio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scaner"
              element={
                <ProtectedRoute>
                  <BarcodeScanner />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock"
              element={
                <ProtectedRoute>
                  <Stock />
                </ProtectedRoute>
              }
            />
            <Route
              path="/salida"
              element={
                <ProtectedRoute>
                  <Salida />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ingreso"
              element={
                <ProtectedRoute>
                  <Ingreso />
                </ProtectedRoute>
              }
            />
            <Route
              path="/consulta"
              element={
                <ProtectedRoute>
                  <Consulta />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
