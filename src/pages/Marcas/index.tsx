import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabela from '../../components/Tabela/Tabela';
import styles from './index.module.scss';
import MarcaService, { Marca } from '../../services/marca.service';
import { AxiosError } from 'axios';

const Marcas = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cabecalhos = ['Marca', 'Ações'];
  const [dados, setDados] = useState<any[]>([]);

  const fetchMarcas = async () => {
    try {
      const marcas = await MarcaService.listarTodas();

      const dadosFormatados = marcas.map((marca: Marca) => [
        marca.descricao,
        <div
          key={marca.id}
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}
        >
          <button
            className={`${styles.botao} ${styles.alterar}`}
            onClick={() => handleAlterar(marca.id)}
          >
            Alterar
          </button>
          <button
            className={`${styles.botao} ${styles.excluir}`}
            onClick={() => handleExcluir(marca.id)}
          >
            Excluir
          </button>
        </div>
      ]);

      setDados(dadosFormatados);
    } catch (erro: unknown) {
      const axiosError = erro as AxiosError;
      if (axiosError.response?.status === 401) {
        navigate('/');
      } else {
        console.error('Erro ao carregar marcas:', axiosError);
        alert('Erro ao carregar marcas');
      }
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, [location]);

  const handleAlterar = (id: string) => {
    navigate(`/editar-marca/${id}`);
  };

  const handleExcluir = async (id: string) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir esta marca?');
    if (confirmacao) {
      try {
        await MarcaService.excluir(id);
        alert('Marca excluída com sucesso!');
        fetchMarcas();
      } catch (erro) {
        console.error('Erro ao excluir marca:', erro);
        alert('Erro ao excluir a marca');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabelaContainer}>
        <h2>Lista Marca</h2>
        <div className={styles.botoesContainer}>
          <button className={styles.botao} onClick={() => navigate('/cadastro-marca')}>
            Incluir
          </button>
        </div>
        <Tabela cabecalhos={cabecalhos} dados={dados} />
      </div>
    </div>
  );
};

export default Marcas;
