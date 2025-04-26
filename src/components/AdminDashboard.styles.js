import styled from 'styled-components';


export const Sidebar = styled.div`
  width: ${({ collapsed }) => (collapsed ? '60px' : '220px')};
  background-color: ${({ theme }) => theme.colors.sidebarBackground};
  color: ${({ theme }) => theme.colors.sidebarText};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  padding: 12px;

  & .active {
    background-color: ${({ theme }) => theme.colors.sidebarItemActive};
  }

  & .hover {
    background-color: ${({ theme }) => theme.colors.sidebarHover};
  }
`;

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const ContentArea = styled.div`
  flex-grow: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  overflow-y: auto;
`;
