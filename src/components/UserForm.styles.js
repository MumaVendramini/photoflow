// src/components/UserForm.styles.js
import styled from 'styled-components';
import theme from '../themes/theme';

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 24px;
  color: ${theme.colors.text};
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
  color: ${theme.colors.textSecondary};
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: 8px;
  font-size: 16px;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: 8px;
  font-size: 16px;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const Button = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  background-color: ${({ $secondary, theme }) =>
    $secondary ? theme.colors.secondary : theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  cursor: pointer;

  &:hover {
    background-color: ${({ $secondary, theme }) =>
      $secondary ? '#d170aa' : theme.colors.primaryDark};
  }
`;

