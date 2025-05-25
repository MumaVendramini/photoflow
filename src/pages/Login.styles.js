// src/pages/Login/Login.styles.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LoginBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  font-family: ${({ theme }) => theme.font};
`;

export const Logo = styled.img`
  width: 200px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  font-family: ${({ theme }) => theme.font};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  margin-top: 10px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ForgotPasswordButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-family: ${({ theme }) => theme.font};
  cursor: pointer;
  margin-top: -8px;
  margin-bottom: 16px;
  align-self: flex-end;

  &:hover {
    text-decoration: underline;
  }
`;
export const Footer = styled.div`
  margin-top: 24px;
  font-size: 12px;
  color: #888;
  font-family: ${({ theme }) => theme.font};
`;
