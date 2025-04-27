import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #f8f9fa;
`;

export const ProfileCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`;

export const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 20px;
  object-fit: cover;
`;

export const LogoutButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #c82333;
  }
`;