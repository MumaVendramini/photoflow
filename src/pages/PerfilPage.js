import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout  } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Importando o Firestore
import CONFIG from '../config';
import { PageContainer, Content, ProfileCard, UserImage, LogoutButton } from '../components/PerfilPage.styles';
import { Container, Row, Col, Form, Button, Card, Image, Alert } from 'react-bootstrap';

const PerfilPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [firebaseUserInfo, setFirebaseUserInfo] = useState(null);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('googleUser');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
      setIsConnected(true);
    }
    fetchFirebaseUser();
    checkAuthentication();
  }, []);

  const fetchFirebaseUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(firestore,'usuarios', user.uid));
      if (userDoc.exists()) {
        setFirebaseUserInfo(userDoc.data());
      }
    }
  };

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    localStorage.setItem('authToken', credentialResponse.credential);

    if (credentialResponse.refresh_token) {
      localStorage.setItem('refreshToken', credentialResponse.refresh_token);
    }

    const user = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    setUserInfo(user);
    setIsConnected(true);
    localStorage.setItem('googleUser', JSON.stringify(user));
  };

  const handleError = () => {
    console.log('Erro ao conectar');
    setIsConnected(false);
  };

  const handleLogout = () => {
    googleLogout();
    setIsConnected(false);
    setUserInfo(null);
    localStorage.removeItem('googleUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  };

  const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (!storedRefreshToken) {
      console.log('Refresh token não encontrado');
      return;
    }
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: new URLSearchParams({
          client_id: CONFIG.GOOGLE_CLIENT_ID,
          client_secret: CONFIG.GOOGLE_CLIENT_SECRET,
          refresh_token: storedRefreshToken,
          grant_type: 'refresh_token',
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('authToken', data.access_token);
        console.log('Token renovado');
      } else {
        console.log('Erro ao renovar o token');
      }
    } catch (error) {
      console.error('Erro ao tentar renovar o token', error);
    }
  };

  const checkAuthentication = () => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);

      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      if (isTokenExpired) {
        console.log('Token expirado');
        refreshToken();
      } else {
        console.log('Token válido');
      }
    } else {
      console.log('Usuário não autenticado');
    }
  };

  const handlePasswordChange = () => {
    if (newPassword !== repeatPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    console.log('Nova senha definida:', newPassword);
    // Aqui você implementaria a alteração da senha
  };

  if (!firebaseUserInfo) {
    return <div>Carregando informações...</div>;
  }

  return (
    <PageContainer>
      <Content>
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="p-4 shadow rounded-4">
                <div className="text-center mb-4">
                  <UserImage
                    src={userInfo?.picture || '/default-avatar.png'}
                    alt="Foto do usuário"
                  />
                </div>

                <Form>
                  <Form.Group className="mb-3" controlId="formNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      value={firebaseUserInfo.nome || ''}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={firebaseUserInfo.email || ''}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPerfil">
                    <Form.Label>Perfil</Form.Label>
                    <Form.Control
                      type="text"
                      value={firebaseUserInfo.role || ''}
                      disabled
                    />
                  </Form.Group>

                  <div className="text-center mb-4">
                    {!isConnected ? (
                      <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                      />
                    ) : (
                      <Alert variant="success">
                        Conta Google conectada!
                        <div className="mt-2">
                          <LogoutButton onClick={handleLogout}>
                            Desconectar Google
                          </LogoutButton>
                        </div>
                      </Alert>
                    )}
                  </div>

                  <hr />

                  <Form.Group className="mb-3" controlId="formSenhaAtual">
                    <Form.Label>Senha Atual</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Digite sua senha atual"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formNovaSenha">
                    <Form.Label>Nova Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Digite a nova senha"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formRepetirSenha">
                    <Form.Label>Repetir Nova Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repita a nova senha"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    className="w-100 mt-3"
                    onClick={handlePasswordChange}
                  >
                    Alterar Senha
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </Content>
    </PageContainer>
  );
};

export default PerfilPage;
