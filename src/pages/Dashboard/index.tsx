import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabela from '../../components/Tabela/Tabela';
import styles from './index.module.scss';
import { AxiosError } from 'axios';
import VeiculoService from '../../services/veiculo.service';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const cabecalhosResumo = ['Marca', 'Quantidade', 'Valor Total (R$)'];

  const [dados, setDados] = useState<string[][]>([]);
  const [resumoFormatado, setResumoFormatado] = useState<string[][]>([]);

  const fetchVeiculos = async () => {
    try {
      const veiculos = await VeiculoService.listarTodos();

      const agrupadoPorMarca: Record<string, { quantidade: number; valorTotal: number }> = {};

      const dadosFormatados = veiculos.map((veiculo) => {
        const marca = veiculo.marca?.descricao || 'N/A';
        const valor = typeof veiculo.valor === 'number'
          ? veiculo.valor
          : parseFloat(veiculo.valor as string);

        // Agrupamento por marca
        if (!agrupadoPorMarca[marca]) {
          agrupadoPorMarca[marca] = { quantidade: 0, valorTotal: 0 };
        }

        agrupadoPorMarca[marca].quantidade += 1;
        if (!isNaN(valor)) {
          agrupadoPorMarca[marca].valorTotal += valor;
        }

        return [
          marca,
          veiculo.modelo,
          veiculo.ano.toString(),
          !isNaN(valor) ? valor.toFixed(2) : 'N/A'
        ];
      });

      const resumo = Object.entries(agrupadoPorMarca).map(([marca, info]) => [
        marca,
        info.quantidade.toString(),
        info.valorTotal.toFixed(2)
      ]);

      setDados(dadosFormatados);
      setResumoFormatado(resumo);

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

  return (
    <div className={styles.container}>
      <h2>Dashboard</h2>

      <div className={styles.resumoContainer}>
        <h3>Resumo por Marca</h3>
        <Tabela cabecalhos={cabecalhosResumo} dados={resumoFormatado} />
      </div>
    </div>
  );
};

export default Dashboard;
