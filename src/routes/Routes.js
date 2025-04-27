// src/routes/Routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import UserFormPage from '../pages/UserFormPage';
import AdminDashboard from '../pages/AdminDashboard';
import PerfilPage from '../pages/PerfilPage';
import AgendaPage from '../pages/AgendaPage';
import MapaPage from '../pages/MapaPage';
import ClientesPage from '../pages/ClientesPage';
import ContratosPage from '../pages/ContratosPage';
import CONFIG from '../config';

import { GoogleOAuthProvider } from '@react-oauth/google';

const AppRoutes = ({ user }) => {
  return (
    <GoogleOAuthProvider clientId = {CONFIG.GOOGLE_CLIENT_ID}>;
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard/super_user" /> : <Login />} />
        <Route path="/dashboard/super_user" element={<Dashboard />} />
        <Route path="/dashboard/fotografo" element={<div>Fotógrafo Dashboard</div>} />
        <Route path="/dashboard/cliente" element={<div>Cliente Dashboard</div>} />
        {/* Aqui o dashboard de Admin com rotas aninhadas */}
        <Route path="/dashboard/admin" element={<AdminDashboard />}>
          <Route path="perfil" element={<PerfilPage />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="mapa" element={<MapaPage />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="contratos" element={<ContratosPage />} />         
          {/* aqui outras rotas futuras: mapa, clientes, etc */}
        </Route>
        <Route path="/usuarios/novo" element={<UserFormPage />} />
        <Route path="/usuarios/editar" element={<UserFormPage />} />        
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default AppRoutes;
