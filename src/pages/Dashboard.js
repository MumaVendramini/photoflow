import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { DashboardContainer, Logo, Header, Menu, MenuItem, Content } from '../components/Dashboard.styles';
import { useTheme } from 'styled-components';


const Dashboard = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(firestore, 'usuarios', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setRole(userDoc.data().role);
          } else {
            console.log('Usuário não encontrado');
          }
        } catch (error) {
          console.log('Erro ao buscar o role do usuário', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('Usuário não autenticado');
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        console.log('App instalado');
        setDeferredPrompt(null);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/'; // garante recarregamento e limpeza
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  if (loading) return <div>Carregando...</div>;

  if (role !== 'super_user') {
    return <div>Você não tem permissão para acessar esse dashboard.</div>;
  }

  return (
    <DashboardContainer>
      <Logo src={theme.logo} alt="Logo" />
      <Header>Bem-vindo ao Dashboard - Super Usuário</Header>

      <Menu>
        <MenuItem>Usuários</MenuItem>
        <MenuItem>Configurações</MenuItem>
        <MenuItem>Relatórios</MenuItem>
        {deferredPrompt && <MenuItem onClick={handleInstall}>Instalar App</MenuItem>}
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>

      <Content>
        <h2>Visão Geral</h2>
        <p>Bem-vindo ao painel principal do super usuário!</p>
        <p>Aqui você pode gerenciar todas as configurações do sistema.</p>
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;
