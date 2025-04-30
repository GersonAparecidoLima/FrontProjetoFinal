// src/types/veiculo.types.ts

export interface VeiculoInput {
    modelo: string;
    ano: number;
    valor: number;
    marca: {
      id: number;
    };
  }
  