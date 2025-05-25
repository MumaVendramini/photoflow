import React from 'react';
import styled from 'styled-components';
import { MenuIcon, CalendarDays, MapPin, FileText, Users, UserCircle, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { auth } from '../firebase';

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  display: ${({ open }) => (open ? 'flex' : 'none')};
  z-index: 1000;
`;

const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.surface};
  height: 100%;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 2rem;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
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
    font-size: 14px;
  }
`;

const CloseButton = styled.div`
  align-self: flex-end;
  cursor: pointer;
`;

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('Erro ao desconectar', error);
    });
  };

  return (
    <SidebarOverlay open={open}>
      <SidebarContainer>
        <CloseButton onClick={onClose}>
          <X />
        </CloseButton>

        <Menu>
          <MenuItem onClick={() => { navigate('/dashboard/admin/agenda'); onClose(); }}>
            <CalendarDays />
            <span>Agenda</span>
          </MenuItem>

          <MenuItem onClick={() => { navigate('/dashboard/admin/mapa'); onClose(); }}>
            <MapPin />
            <span>Mapa</span>
          </MenuItem>

          <MenuItem onClick={() => { navigate('/dashboard/admin/contratos'); onClose(); }}>
            <FileText />
            <span>Contratos</span>
          </MenuItem>

          <MenuItem onClick={() => { navigate('/dashboard/admin/clientes'); onClose(); }}>
            <Users />
            <span>Clientes</span>
          </MenuItem>

          <MenuItem onClick={() => { navigate('/dashboard/admin/perfil'); onClose(); }}>
            <UserCircle />
            <span>Perfil</span>
          </MenuItem>

          <MenuItem onClick={() => { handleLogout(); onClose(); }}>
            <LogOut />
            <span>Sair</span>
          </MenuItem>
        </Menu>
      </SidebarContainer>
    </SidebarOverlay>
  );
};

export default Sidebar;
