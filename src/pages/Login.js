import React, { useState } from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebase';  // Certifique-se de ter o firestore configurado
import { doc, getDoc } from 'firebase/firestore';  // Função para pegar o documento do usuário no Firestore
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';  // Para navegação entre páginas
import { useTheme } from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LoginBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  font-family: ${({ theme }) => theme.font};
`;

const Logo = styled.img`
  width: 200px;
  margin-bottom: 20px;
`;

const Input = styled.input`
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

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  margin-top: 10px;
`;

const ForgotPasswordButton = styled.button`
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

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Footer = styled.div`
  margin-top: 24px;
  font-size: 12px;
  color: #888;
  font-family: ${({ theme }) => theme.font};
`;


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();  // Hook para navegação

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Realiza o login com email e senha
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Recupera o documento do usuário no Firestore
      const userDoc = await getDoc(doc(firestore, 'usuarios', user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

      
        console.log("Role do usuário logado:", role);

        // Redireciona de acordo com o role
        if (role === 'super_user') {
          navigate('/dashboard/super_user');  // Redireciona para o dashboard do super_user
        } else if (role === 'fotografo') {
          navigate('/dashboard/fotografo');  // Redireciona para o dashboard do fotógrafo
        } else if (role === 'admin') {
          navigate('/dashboard/admin');  // Redireciona para o dashboard do cliente
        } else {
          setError('Acesso não autorizado!');
        }
      } else {
        setError('Usuário não encontrado no banco de dados!');
      }
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Digite seu email para redefinir a senha.");
      return;
    }

    try {
      await auth.sendPasswordResetEmail(email);
      alert("Link de redefinição de senha enviado para o seu email.");
    } catch (err) {
      setError("Erro ao enviar email de redefinição.");
    }
  };

  return (
    <Container>
      <LoginBox>
        <Logo src={theme.logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <InputGroup>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ForgotPasswordButton type="button" onClick={handleResetPassword}>
              Esqueci minha senha
            </ForgotPasswordButton>
          </InputGroup>

          <Button type="submit">Entrar</Button>
        </form>

        {error && <ErrorText>{error}</ErrorText>}

        <Footer>Versão - 20250525</Footer>
      </LoginBox>
    </Container>
  );
};

export default Login;
