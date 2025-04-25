// src/routes/Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import UserFormPage from './pages/UserFormPage';

const AppRoutes = () => {
  const isAuthenticated = !!localStorage.getItem('user'); // Exemplo básico

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/usuarios/novo" element={<UserFormPage />} />
        <Route path="/usuarios/editar" element={<UserFormPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
