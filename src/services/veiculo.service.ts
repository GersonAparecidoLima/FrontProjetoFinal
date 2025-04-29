import api from './api';

export interface Marca {
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

export interface VeiculoInput {
  marcaId: number;
  modelo: string;
  ano: number;
  valor: number;
}

const VeiculoService = {
  // Lista completa (rota protegida)
  listarTodos: async (): Promise<Veiculo[]> => {
    const response = await api.get<Veiculo[]>('/veiculos');
    return response.data;
  },

  // Lista pública (rota aberta)
  listarPublicos: async (): Promise<Veiculo[]> => {
    const response = await fetch('http://localhost:3000/veiculos/publico');
    if (!response.ok) {
      throw new Error('Erro ao buscar veículos públicos');
    }
    return response.json();
  },

  // Exclui um veículo
  excluir: async (id: string): Promise<void> => {
    await api.delete(`/veiculos/${id}`);
  },






// Busca por ID (para edição)
buscarPorId: async (id: string): Promise<Veiculo> => {
  const response = await api.get<Veiculo>(`/veiculos/${id}`);
  return response.data;
},

// Cadastra um novo veículo
cadastrar: async (veiculo: VeiculoInput): Promise<void> => {
  await api.post('/veiculos', veiculo);
},

// Edita um veículo existente
editar: async (id: string, veiculo: VeiculoInput): Promise<void> => {
  await api.put(`/veiculos/${id}`, veiculo);
},


};

export default VeiculoService;
