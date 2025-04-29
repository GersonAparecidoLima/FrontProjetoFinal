// src/services/marca.service.ts
import api from './api';

export interface Marca {
  id: string;
  descricao: string;
}

const MarcaService = {
  listarTodas: async (): Promise<Marca[]> => {
    const response = await api.get<Marca[]>('/marca');
    return response.data;
  },

  criar: async (dados: { descricao: string }): Promise<void> => {
    await api.post('/marca', dados);
  },

  buscarPorId: async (id: string): Promise<Marca> => {
    const response = await api.get<Marca>(`/marca/${id}`);
    return response.data;
  },

  atualizar: async (id: string, dados: Partial<Marca>): Promise<void> => {
    await api.put(`/marca/${id}`, dados);
  },

  excluir: async (id: string): Promise<void> => {
    await api.delete(`/marca/${id}`);
  }
};

export default MarcaService;
