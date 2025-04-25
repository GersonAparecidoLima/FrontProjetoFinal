import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabela from '../../components/Tabela/Tabela';
import styles from './index.module.scss';

const Veiculo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cabecalhos = ['Marca ID', 'Modelo', 'Ano', 'Valor', 'Ação'];
  const [dados, setDados] = useState<any[]>([]);

  // Função para buscar os veículos da API
  const fetchVeiculos = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/veiculos');
      if (!resposta.ok) {
        throw new Error('Erro ao buscar veículos');
      }

      const veiculos = await resposta.json();

      const dadosFormatados = veiculos.map((veiculo: { id: string, marca: { id: number }, modelo: string, ano: number, valor: any }) => {
        // Verificação se 'valor' é um número antes de aplicar toFixed
        const valor = typeof veiculo.valor === 'number' && !isNaN(veiculo.valor) 
          ? veiculo.valor.toFixed(2) 
          : 'N/A'; // Caso 'valor' não seja número, exibe 'N/A'

        return [
          veiculo.marca.id.toString() || 'N/A',
          veiculo.modelo,
          veiculo.ano.toString(),
          valor,
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button
              className={`${styles.botao} ${styles.alterar}`}
              onClick={() => handleEditar(veiculo.id)}
            >
              Editar
            </button>
            <button
              className={`${styles.botao} ${styles.excluir}`}
              onClick={() => handleExcluir(veiculo.id)}
            >
              Excluir
            </button>
          </div>
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
  }, [location]); // A dependência "location" garante que os dados sejam recarregados ao navegar

  const handleEditar = (id: string) => {
    navigate(`/editar-veiculo/${id}`);
  };

  const handleExcluir = async (id: string) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este veículo?');
    if (confirmacao) {
      try {
        const resposta = await fetch(`http://localhost:3000/veiculos/${id}`, {
          method: 'DELETE',
        });
        if (!resposta.ok) {
          throw new Error('Erro ao excluir o veículo');
        }

        alert('Veículo excluído com sucesso!');
        fetchVeiculos(); // Recarrega os dados após exclusão
      } catch (erro) {
        console.error('Erro ao excluir veículo:', erro);
        alert('Erro ao excluir o veículo');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabelaContainer}>
        <div className={styles.botoesContainer}>
          <button className={styles.botao} onClick={() => navigate('/cadastro-veiculo')}>
            Incluir
          </button>
        </div>
        <Tabela cabecalhos={cabecalhos} dados={dados} />
      </div>
    </div>
  );
};

export default Veiculo;
