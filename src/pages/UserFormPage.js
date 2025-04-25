import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { firestore, firebaseConfig } from '../firebase'; // certifique-se que firebaseConfig está sendo exportado
import { doc, setDoc } from 'firebase/firestore';
import { initializeApp, deleteApp  } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import UserForm from '../components/UserForm';
import { PageContainer } from '../components/UserFormPage.styles';

const UserFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingUser = location.state?.usuario || null;

  const handleFormSubmit = async (dados) => {
    try {
      if (editingUser) {
        const userRef = doc(firestore, 'usuarios', editingUser.id);
        await setDoc(userRef, dados, { merge: true });
        alert('Usuário atualizado!');
      } else {
        const secondaryApp = initializeApp(firebaseConfig, 'Secondary');
        const secondaryAuth = getAuth(secondaryApp);
        
        console.log('Instância secundária criada:', secondaryApp.name);  
        console.log('Criando usuário no Auth secundário:', dados.email);
  
        const cred = await createUserWithEmailAndPassword(
          secondaryAuth,
          dados.email,
          '@1234abcd' // senha padrão para todos os usuários
        );
        
        console.log('Teste: UID criado →', cred.user.uid);  
        console.log('Usuário criado no Firebase Auth:', cred.user.uid);
  
        await setDoc(doc(firestore, 'usuarios', cred.user.uid), {
          nome: dados.nome,
          email: dados.email,
          role: dados.role,
          uid: cred.user.uid,
        });
  
        await deleteApp(secondaryApp);
  
        alert('Usuário criado com sucesso!');
      }
  
      navigate('/dashboard', { state: { activeSection: 'users' } });
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      alert('Erro ao salvar usuário: ' + error.message);
    }
  };

  return (
    <PageContainer>
      <UserForm
        initialData={editingUser}
        onSubmit={handleFormSubmit}
        onClose={() => navigate('/dashboard', { state: { activeSection: 'users' } })}
      />
    </PageContainer>
  );
};

export default UserFormPage;
