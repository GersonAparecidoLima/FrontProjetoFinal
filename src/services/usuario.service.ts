// src/services/usuario.service.ts

export interface Usuario {
  id?: string;
  nome: string;
  email?: string;
  senha?: string;
}

const API_URL = 'http://localhost:3000/usuarios';

const UsuarioService = {
  // Função para listar todos os usuários
  listar: async (): Promise<Usuario[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Erro ao listar usuários');
    }
    const data = await response.json();
    return data.usuarios || [];  // Ajuste conforme a estrutura da resposta da API
  },

  // Função para buscar usuário por ID
  buscarPorId: async (id: string): Promise<Usuario> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar usuário');
    const data = await response.json();
    return data.usuario || data;  // Ajuste conforme a estrutura da resposta da API
  },

  // Função para cadastrar um novo usuário
  cadastrar: async (dados: Usuario): Promise<{ mensagem: string }> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (!response.ok) throw new Error('Erro ao cadastrar usuário');
    return await response.json();  // Certifique-se de que a API retorna a resposta esperada
  },

  // Função para atualizar um usuário existente
  atualizar: async (id: string, dados: Usuario): Promise<{ mensagem: string }> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (!response.ok) throw new Error('Erro ao atualizar usuário');
    return await response.json();  // Certifique-se de que a API retorna a resposta esperada
  },

  // Função para deletar um usuário
  deletarUsuario: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar usuário');
  },
};

export default UsuarioService;
