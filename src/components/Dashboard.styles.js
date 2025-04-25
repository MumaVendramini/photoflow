import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

export const Logo = styled.img`
  width: 150px;
  margin-bottom: 2rem;
`;

export const Header = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  font-weight: bold;
`;

export const Menu = styled.div`
  display: flex;
  flex-wrap: wrap; /* permite quebra de linha se não couber */
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
`;

export const MenuItem = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.font};
  font-size: clamp(0.7rem, 1.8vw, 1rem); /* ajusta o texto de forma fluida */
  white-space: nowrap; /* impede quebra de palavras */
  max-width: 100%;
  flex: 1 0 auto; /* permite que cresça um pouco sem estourar */

  &:hover {
    opacity: 0.85;
  }
`;


export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 10px 20px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  margin-top: 2rem;
`;

