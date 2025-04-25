import React, { useState, useEffect } from 'react';
import {
  Button,
  ButtonRow,
  FormContainer,
  Input,
  Label,
  Select,
  Title,
} from './UserForm.styles';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ onClose, onSubmit, initialData }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('fotografo');
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setNome(initialData.nome || '');
      setEmail(initialData.email || '');
      setRole(initialData.role || 'fotografo');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, email, role });
  };

  return (
    <div>
      <Title>{initialData ? 'Editar Usuário' : 'Novo Usuário'}</Title>
      <FormContainer as="form" onSubmit={handleSubmit}>
        <div>
          <Label>Nome:</Label>
          <Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Perfil:</Label>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="fotografo">Fotógrafo</option>
            <option value="cliente">Cliente</option>
            <option value="admin">Admin</option>
            <option value="super_user">Super Usuário</option>
          </Select>
        </div>
        <ButtonRow>
          <Button type="submit">Salvar</Button>
          <Button type="button" $secondary onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        </ButtonRow>
      </FormContainer>
    </div>
  );
};

export default UserForm;
