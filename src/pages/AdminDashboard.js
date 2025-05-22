// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { PageContainer, ContentArea } from '../components/AdminDashboard.styles';
import { MenuIcon } from 'lucide-react';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // pra saber em que rota está  

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!auth.currentUser) {
        navigate('/login');
        return;
      }

      try {
        const userRef = doc(firestore, 'usuarios', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (userData.role === 'admin') {
            setIsAdmin(true);
          } else {
            navigate('/unauthorized');
          }
        } else {
          navigate('/unauthorized');
        }
      } catch (error) {
        console.error('Erro ao verificar o papel do usuário:', error);
        navigate('/unauthorized');
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [navigate]);

  if (loading) return <div>Carregando...</div>;
  if (!isAdmin) return null;

  return (
    <>
      {/* Botão flutuante para abrir o menu */}
      <button
        onClick={() => setMenuOpen(true)}
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 1100,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <MenuIcon size={28} color="#333" />
      </button>

      {/* Sidebar como modal */}
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main style={{ padding: '2rem 0.5rem' }}>
        {location.pathname === '/dashboard/admin' && (
          <h1>Bem-vindo ao Dashboard do Admin!</h1>
        )}
        <Outlet />
      </main>
    </>
  );
};

export default AdminDashboard;
