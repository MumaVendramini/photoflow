// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { PageContainer, ContentArea } from '../components/AdminDashboard.styles';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(true); // já inicia colapsado

  const navigate = useNavigate();
  const location = useLocation(); // pra saber em que rota está

  const toggleCollapse = () => setCollapsed(!collapsed);

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
    <PageContainer>
      <Sidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />
      <ContentArea>
        {/* Se for rota raiz do admin, mostra o H1 */}
        {location.pathname === '/dashboard/admin' && (
          <h1>Bem-vindo ao Dashboard do Admin!</h1>
        )}
        {/* Aqui renderiza as páginas internas como Agenda, Mapa, Perfil, etc */}
        <Outlet />
      </ContentArea>
    </PageContainer>
  );
};

export default AdminDashboard;
