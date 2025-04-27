import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { DashboardContainer, Logo, Header, Menu, MenuItem, Content } from '../components/Dashboard.styles';
import { useTheme } from 'styled-components';
import UsersPage from './UsersPage'; // Adicionando o componente de usuários, que você pode implementar ou já ter implementado

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [activeSection, setActiveSection] = useState('overview'); // Controle de seção ativa
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

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  if (loading) return <div>Carregando...</div>;

  if (role !== 'super_user') {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Você não tem permissão para acessar esse dashboard.</h2>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '1rem',
          padding: '10px 20px',
          backgroundColor: '#d32f2f',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Sair
      </button>
    </div>;
  }

  return (
    <DashboardContainer>
      <Logo src={theme.logo} alt="Logo" />
      <Header>Bem-vindo ao Dashboard - Super Usuário</Header>

      <Menu>
        <MenuItem onClick={() => handleSectionChange('overview')}>Visão Geral</MenuItem>
        <MenuItem onClick={() => handleSectionChange('users')}>Usuários</MenuItem>
        <MenuItem onClick={() => handleSectionChange('settings')}>Configurações</MenuItem>
        <MenuItem onClick={() => handleSectionChange('reports')}>Relatórios</MenuItem>
        {deferredPrompt && <MenuItem onClick={handleInstall}>Instalar App</MenuItem>}
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>

      <Content>
        {activeSection === 'overview' && (
          <>
            <h2>Visão Geral</h2>
            <p>Bem-vindo ao painel principal do super usuário!</p>
            <p>Aqui você pode gerenciar todas as configurações do sistema.</p>
          </>
        )}
        {activeSection === 'users' && <UsersPage />} {/* Tela de usuários */}
        {activeSection === 'settings' && <div>Configurações</div>}
        {activeSection === 'reports' && <div>Relatórios</div>}
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;
