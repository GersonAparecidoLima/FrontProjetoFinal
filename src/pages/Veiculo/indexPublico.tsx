import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Tabela from '../../components/Tabela/Tabela';
import styles from './index.module.scss';

// Define o tipo das linhas da tabela (quatro colunas: marca, modelo, ano, valor)
type VeiculoTabela = [string, string, string, string];

const VeiculoPublico = () => {
  const location = useLocation();
  const cabecalhos = ['Marca', 'Modelo', 'Ano', 'Valor'];
  const [dados, setDados] = useState<VeiculoTabela[]>([]);

  // Função para buscar os veículos da API pública
  const fetchVeiculos = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/veiculos/publico');
      if (!resposta.ok) {
        throw new Error('Erro ao buscar veículos');
      }

      const veiculos = await resposta.json();

      const dadosFormatados: VeiculoTabela[] = veiculos.map((veiculo: {
        id: string;
        marca: { id: number; descricao: string };
        modelo: string;
        ano: number;
        valor: any;
      }) => {
        const valor = typeof veiculo.valor === 'number' && !isNaN(veiculo.valor)
          ? veiculo.valor.toFixed(2)
          : !isNaN(parseFloat(veiculo.valor))
          ? parseFloat(veiculo.valor).toFixed(2)
          : 'N/A';

        return [
          veiculo.marca?.descricao || 'N/A',
          veiculo.modelo,
          veiculo.ano.toString(),
          `R$ ${valor}`,
        ];
      });

      setDados(dadosFormatados);
    } catch (erro) {
      console.error('Erro ao carregar veículos:', erro);
      alert('Erro ao carregar veículos');
    }
  };

  useEffect(() => {
    fetchVeiculos();
  }, [location]); // Recarrega os dados sempre que a rota mudar

  return (
    <div className={styles.container}>
      <h2>Lista Veículo</h2>
      <div className={styles.tabelaContainer}>
        <Tabela cabecalhos={cabecalhos} dados={dados} />
      </div>
    </div>
  );
};

export default VeiculoPublico;
