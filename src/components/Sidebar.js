// src/components/Sidebar.js
import React from 'react';
import styled from 'styled-components';
import { MenuIcon, CalendarDays, MapPin, FileText, Users } from 'lucide-react';

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

const Sidebar = ({ collapsed, toggleCollapse }) => (
  <SidebarContainer collapsed={collapsed}>
    <CollapseButton onClick={toggleCollapse} collapsed={collapsed}>
      <MenuIcon />
    </CollapseButton>
    <Logo
      src="/assets/LogoPhotoFlow.png"
      alt="Logo"
      collapsed={collapsed}
    />
    <Menu>
      <MenuItem collapsed={collapsed}>
        <CalendarDays />
        <span>Agenda</span>
      </MenuItem>
      <MenuItem collapsed={collapsed}>
        <MapPin />
        <span>Mapa</span>
      </MenuItem>
      <MenuItem collapsed={collapsed}>
        <FileText />
        <span>Contratos</span>
      </MenuItem>
      <MenuItem collapsed={collapsed}>
        <Users />
        <span>Clientes</span>
      </MenuItem>
    </Menu>
  </SidebarContainer>
);

export default Sidebar;
