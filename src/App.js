import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage'; // Página de usuários
import UserFormPage from './pages/UserFormPage'; // Página de formulário de usuário
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false); // Quando a autenticação for verificada, paramos o loading
    });

    return () => unsubscribe(); // Limpeza quando o componente for desmontado
  }, []);

  if (checkingAuth) {
    return <div>Carregando...</div>; // Exibe "Carregando..." enquanto verifica a autenticação
  }

  return (
    <Routes>
      {/* Rota de login */}
      <Route path="/" element={user ? <Dashboard /> : <Login />} />
      {/* Outras rotas */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/usuarios/novo" element={<UserFormPage />} />
      <Route path="/usuarios/editar" element={<UserFormPage />} />
    </Routes>
  );
};

export default App;
