import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabela from '../../components/Tabela/Tabela';
import styles from './index.module.scss';
import api from '../../services/api';
import { AxiosError } from 'axios';

const Veiculo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cabecalhos = ['Marca', 'Modelo', 'Ano', 'Valor', 'Ação'];
  const [dados, setDados] = useState<any[]>([]);

  const fetchVeiculos = async () => {
    try {
      const resposta = await api.get('/veiculos');
      const veiculos = resposta.data;

      const dadosFormatados = veiculos.map((veiculo: {
        id: string,
        marca: { id: number; descricao: string },
        modelo: string,
        ano: number,
        valor: any
      }) => {
        const valor = typeof veiculo.valor === 'number' && !isNaN(veiculo.valor)
          ? veiculo.valor.toFixed(2)
          : !isNaN(parseFloat(veiculo.valor))
          ? parseFloat(veiculo.valor).toFixed(2)
          : 'N/A';

        return [
          veiculo.marca.descricao || 'N/A',
          veiculo.modelo,
          veiculo.ano.toString(),
          valor,
          <div className={styles.acoesContainer} key={veiculo.id}>
            <button
              className={styles.botao}
              onClick={() => handleEditar(veiculo.id)}
            >
              Editar
            </button>
            <button
              className={styles.botao}
              onClick={() => handleExcluir(veiculo.id)}
            >
              Excluir
            </button>
          </div>
        ];
      });

      setDados(dadosFormatados);
    } catch (erro: unknown) {
      const axiosError = erro as AxiosError;

      if (axiosError.response?.status === 401) {
               navigate('/veiculos/publico');
      } else {
        console.error('Erro ao carregar veículos:', axiosError);
        alert('Erro ao carregar veículos');
      }
    }
  };

  useEffect(() => {
    fetchVeiculos();
  }, [location]);

  const handleEditar = (id: string) => {
    navigate(`/editar-veiculo/${id}`);
  };

  const handleExcluir = async (id: string) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este veículo?');
    if (confirmacao) {
      try {
        await api.delete(`/veiculos/${id}`);
        alert('Veículo excluído com sucesso!');
        fetchVeiculos();
      } catch (erro: unknown) {
        const axiosError = erro as AxiosError;

        if (axiosError.response?.status === 401) {
          navigate('/veiculos/publico');
        } else {
          console.error('Erro ao excluir veículo:', axiosError);
          alert('Erro ao excluir o veículo');
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Lista Veículo</h2>
      <div className={styles.tabelaContainer}>
        <div className={styles.botoesContainer}>
          <button className={styles.botaoIncluir} onClick={() => navigate('/cadastro-veiculo')}>
            Incluir
          </button>
        </div>
        <Tabela cabecalhos={cabecalhos} dados={dados} />
      </div>
    </div>
  );
};

export default Veiculo;
