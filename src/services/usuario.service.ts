// src/services/usuario.service.ts
import api from './api'; // Cliente Axios com token JWT, se necessário

// Interface do tipo de usuário
export interface Usuario {
  id: string;
  nome: string;
  email?: string;
  senha?: string;
}

// Lista todos os usuários
const listarUsuarios = async (): Promise<Usuario[]> => {
  const response = await api.get('/usuarios');
  return response.data.usuarios || response.data;
};

// Busca um usuário por ID
const buscarUsuarioPorId = async (id: string): Promise<Usuario> => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data.usuario || response.data;
};

// Cadastra um novo usuário
const cadastrarUsuario = async (dados: Omit<Usuario, 'id'>): Promise<Usuario> => {
  const response = await api.post('/usuarios', dados);
  return response.data;
};

// Atualiza um usuário existente
const atualizarUsuario = async (id: string, dados: Partial<Usuario>): Promise<Usuario> => {
  const response = await api.put(`/usuarios/${id}`, dados);
  return response.data;
};

// Deleta um usuário
const deletarUsuario = async (id: string): Promise<void> => {
  await api.delete(`/usuarios/${id}`);
};

// Exporta tudo como objeto
const UsuarioService = {
  listarUsuarios,
  buscarUsuarioPorId,
  cadastrarUsuario,
  atualizarUsuario,
  deletarUsuario,
};

export default UsuarioService;
