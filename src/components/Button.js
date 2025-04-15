import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.font};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default Button;
