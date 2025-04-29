// src/services/usuario.service.ts
const BASE_URL = 'http://localhost:3000';

export type Usuario = {
  id: string;
  nome: string;
};

const UsuarioService = {
  listarUsuarios: async (): Promise<Usuario[]> => {
    const response = await fetch(`${BASE_URL}/usuarios`);
    if (!response.ok) throw new Error('Erro ao carregar usuários');
    
    const data = await response.json();
    if (Array.isArray(data.usuarios)) {
      return data.usuarios;
    } else {
      throw new Error('Formato de resposta inesperado');
    }
  },

  deletarUsuario: async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/usuarios/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar usuário');
  },
};

export default UsuarioService;
