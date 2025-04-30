// src/services/veiculo.service.ts

import api from './api';

// Interfaces
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

// ✅ Novo formato compatível com CreateVeiculoDto no backend
export interface VeiculoInput {
  modelo: string;
  ano: number;
  valor: number;
  marca: {
    id: number;
  };
}

const VeiculoService = {
  // Lista protegida (rota com autenticação)
  listarTodos: async (): Promise<Veiculo[]> => {
    const response = await api.get<Veiculo[]>('/veiculos');
    return response.data;
  },

  // Lista pública (rota sem autenticação)
  listarPublicos: async (): Promise<Veiculo[]> => {
    const response = await fetch('http://localhost:3000/veiculos/publico');
    if (!response.ok) {
      throw new Error('Erro ao buscar veículos públicos');
    }
    return response.json();
  },

  // Buscar veículo por ID
  buscarPorId: async (id: string): Promise<Veiculo> => {
    const response = await api.get<Veiculo>(`/veiculos/${id}`);
    return response.data;
  },

  // Cadastrar novo veículo
  cadastrar: async (veiculo: VeiculoInput): Promise<void> => {
    await api.post('/veiculos', veiculo);
  },

  // Editar veículo existente
  editar: async (id: string, veiculo: VeiculoInput): Promise<void> => {
    await api.put(`/veiculos/${id}`, veiculo);
  },

  // Excluir veículo
  excluir: async (id: string): Promise<void> => {
    await api.delete(`/veiculos/${id}`);
  },
};

export default VeiculoService;
