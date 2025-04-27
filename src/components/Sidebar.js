import React, { useState } from 'react';
import styled from 'styled-components';
import { MenuIcon, CalendarDays, MapPin, FileText, Users, UserCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Modal, Button } from 'react-bootstrap'; // ou qualquer outro componente de modal

import { auth } from '../firebase';

const SidebarContainer = styled.div`
  width: ${({ collapsed }) => (collapsed ? '60px' : '200px')};
  background-color: ${({ theme }) => theme.colors.surface};
  transition: width 0.3s ease;
  height: 100vh;
  padding: 16px 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
`;

const CollapseButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: ${({ collapsed }) => (collapsed ? 'center' : 'flex-start')};
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: ${({ collapsed }) => (collapsed ? '40px' : '120px')};
  transition: width 0.3s ease;
  margin: 0 auto 30px auto;
  display: block;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ collapsed }) => (collapsed ? '0' : '12px')};
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  color: ${({ theme }) => theme.colors.onSurface};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}22;
  }

  svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }

  span {
    display: ${({ collapsed }) => (collapsed ? 'none' : 'inline')};
    font-size: 14px;
  }
`;

const Sidebar = ({ collapsed, toggleCollapse }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('Erro ao desconectar', error);
    });
  };

  const handleConfirmLogout = () => setShowModal(true);
  const handleCancelLogout = () => setShowModal(false);

  return (
    <SidebarContainer collapsed={collapsed}>
      <CollapseButton onClick={toggleCollapse} collapsed={collapsed}>
        <MenuIcon />
      </CollapseButton>
      <Logo
        src="/assets/LogoPhotoFlow.png"
        alt="Logo"
        collapsed={collapsed}
        onClick={() => navigate('/dashboard/admin')}
        style={{ cursor: 'pointer' }}
      />
      <Menu>
        <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/admin/agenda')}>
          <CalendarDays />
          <span>Agenda</span>
        </MenuItem>

        <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/admin/mapa')}>
          <MapPin />
          <span>Mapa</span>
        </MenuItem>

        <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/admin/contratos')}>
          <FileText />
          <span>Contratos</span>
        </MenuItem>

        <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/admin/clientes')}>
          <Users />
          <span>Clientes</span>
        </MenuItem>
        <MenuItem collapsed={collapsed} onClick={() => navigate('/dashboard/admin/perfil')}>
          <UserCircle />
          <span>Perfil</span>
        </MenuItem>
        {/* Adicionando o botão de logout */}
        <MenuItem collapsed={collapsed} onClick={handleConfirmLogout}>
          <LogOut />
          <span>Sair</span>
        </MenuItem>
      </Menu>

      {/* Modal de Confirmação de Logout */}
      <Modal show={showModal} onHide={handleCancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja sair?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelLogout}>Cancelar</Button>
          <Button variant="primary" onClick={handleLogout}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </SidebarContainer>
  );
};

export default Sidebar;
