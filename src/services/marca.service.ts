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

  excluir: async (id: string): Promise<void> => {
    await api.delete(`/marca/${id}`);
  }
};

export default MarcaService;
