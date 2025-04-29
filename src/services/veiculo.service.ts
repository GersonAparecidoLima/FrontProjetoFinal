import api from './api';

interface Marca {
  id: number;
  descricao: string;
}

export interface Veiculo {
  id: string;
  marca: Marca;
  modelo: string;
  ano: number;
  valor: number | string;
}

const VeiculoService = {
  listarTodos: async (): Promise<Veiculo[]> => {
    const response = await api.get<Veiculo[]>('/veiculos');
    return response.data;
  },

  excluir: async (id: string): Promise<void> => {
    await api.delete(`/veiculos/${id}`);
  },

  // Você pode adicionar mais funções depois, como:
  // cadastrar, editar, buscarPorId etc.
};

export default VeiculoService;
