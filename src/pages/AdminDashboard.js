// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { PageContainer, ContentArea } from '../components/AdminDashboard.styles';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed);

  const navigate = useNavigate();

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
        <h1>Bem-vindo ao Dashboard do Admin!</h1>
        {/* Aqui virão os cards com mapa, agenda, clientes ativos etc. */}
      </ContentArea>
    </PageContainer>
  );
};

export default AdminDashboard;
