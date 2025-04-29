import api from './api';

export interface Marca {
  id: number;
  descricao: string;
}

const MarcaService = {
  listarTodas: async (): Promise<Marca[]> => {
    const response = await api.get<Marca[]>('/marca');
    return response.data;
  }
};

export default MarcaService;
