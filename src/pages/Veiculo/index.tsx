import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tabela from '../../components/Tabela/Tabela';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

const Veiculo = () => {
  const [dados, setDados] = useState<string[][]>([]);
  const navigate = useNavigate();

  // Adicionar "Valor" ao cabeçalho da tabela
  const cabecalhos = ['Marca ID', 'Modelo', 'Ano', 'Valor'];

  useEffect(() => {
    axios.get('http://localhost:3000/veiculos')
      .then(response => {
        const veiculos = response.data;
        const dadosFormatados = veiculos.map((v: any) => [
          v.marca?.id?.toString() || 'N/A',
          v.modelo,
          v.ano.toString(),
          // Garantir que 'valor' seja um número
          typeof v.valor === 'number' && !isNaN(v.valor) ? v.valor.toFixed(2) : 
          !isNaN(parseFloat(v.valor)) ? parseFloat(v.valor).toFixed(2) : 'N/A', // Tratar caso 'valor' seja string numérica
        ]);
        setDados(dadosFormatados);
      })
      .catch(error => {
        console.error('Erro ao buscar veículos:', error);
      });
  }, []);

  return (
    <div>
      <Tabela cabecalhos={cabecalhos} dados={dados} />

      <div className={styles.botoesContainer}>
        <button className={styles.botao} onClick={() => navigate('/cadastro-veiculo')}>
          Incluir
        </button>
        <button className={styles.botao}>Editar</button>
        <button className={styles.botao}>Excluir</button>
      </div>
    </div>
  );
};

export default Veiculo;
