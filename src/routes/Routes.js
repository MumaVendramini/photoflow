// src/routes/Routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import UserFormPage from '../pages/UserFormPage';
import AdminDashboard from '../pages/AdminDashboard';

const AppRoutes = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard/super_user" /> : <Login />} />
      <Route path="/dashboard/super_user" element={<Dashboard />} />
      <Route path="/dashboard/fotografo" element={<div>Fotógrafo Dashboard</div>} />
      <Route path="/dashboard/cliente" element={<div>Cliente Dashboard</div>} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/usuarios/novo" element={<UserFormPage />} />
      <Route path="/usuarios/editar" element={<UserFormPage />} />
    </Routes>
  );
};

export default AppRoutes;
