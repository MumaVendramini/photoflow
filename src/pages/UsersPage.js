// src/pages/UsersPage.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

import {
  TableContainer,
  StyledTable,
  TableHeader,
  TableRow,
  TableCell,
  IconButton
} from '../components/UsersPage.styles';
import { Pencil, Plus, ShieldCheck, ShieldBan } from 'lucide-react';

const UsersPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNovoUsuario = () => {
    navigate('/usuarios/novo');
  };

  const handleEdit = (usuario) => {
    navigate('/usuarios/editar', { state: { usuario } });
  };

  const handleToggleStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 'Ativo' ? 'Inativo' : 'Ativo';
    try {
      const userRef = doc(firestore, 'usuarios', id);
      await updateDoc(userRef, {
        status: novoStatus,
      });
      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: novoStatus } : u))
      );
      alert(`Usuário ${novoStatus === 'Ativo' ? 'ativado' : 'inativado'} com sucesso!`);
    } catch (error) {
      console.error('Erro ao atualizar status do usuário:', error);
      alert('Erro ao atualizar status do usuário: ' + error.message);
    }
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, 'usuarios'));
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsuarios(lista);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) return <div>Carregando usuários...</div>;

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <TableRow>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Perfil</TableHeader>
            <TableHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Ação</span>
                <IconButton onClick={handleNovoUsuario}>
                  <Plus size={18} />
                </IconButton>
              </div>
            </TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.nome || 'Sem nome'}</TableCell>
              <TableCell>{usuario.email || 'Sem email'}</TableCell>
              <TableCell>{usuario.role || 'Sem perfil'}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(usuario)}>
                  <Pencil size={18} />
                </IconButton>
                <IconButton
                  onClick={() => handleToggleStatus(usuario.id, usuario.status || 'Ativo')}
                >
                  {usuario.status === 'Inativo' ? (
                    <ShieldBan color={theme.colors.danger} />
                  ) : (
                    <ShieldCheck color={theme.colors.greenLogo} />
                  )}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default UsersPage;
