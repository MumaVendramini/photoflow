import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

export const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

export const Header = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

export const Menu = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

export const MenuItem = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.font};

  &:hover {
    opacity: 0.8;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  margin-top: 20px;
`;
