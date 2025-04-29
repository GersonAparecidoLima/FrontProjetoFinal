import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Tabela from '../../components/Tabela/Tabela';
import styles from './index.module.scss';
import VeiculoService, { Veiculo } from '../../services/veiculo.service';

// Define o tipo das linhas da tabela (quatro colunas: marca, modelo, ano, valor)
type VeiculoTabela = [string, string, string, string];

const VeiculoPublico = () => {
  const location = useLocation();
  const cabecalhos = ['Marca', 'Modelo', 'Ano', 'Valor'];
  const [dados, setDados] = useState<VeiculoTabela[]>([]);

  const fetchVeiculos = async () => {
    try {
      const veiculos = await VeiculoService.listarPublicos();

      const dadosFormatados: VeiculoTabela[] = veiculos.map((veiculo: Veiculo) => {
        const valor =
          typeof veiculo.valor === 'number' && !isNaN(veiculo.valor)
            ? veiculo.valor.toFixed(2)
            : !isNaN(parseFloat(veiculo.valor as string))
            ? parseFloat(veiculo.valor as string).toFixed(2)
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
      console.error('Erro ao carregar veículos públicos:', erro);
      alert('Erro ao carregar veículos públicos');
    }
  };

  useEffect(() => {
    fetchVeiculos();
  }, [location]);

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
