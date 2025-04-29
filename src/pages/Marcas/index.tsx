import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabela from '../../components/Tabela/Tabela';
import styles from './index.module.scss';
import api from '../../services/api'; // Importa o client com token JWT
import { AxiosError } from 'axios';

const Marcas = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cabecalhos = ['Marca', 'Ações'];
  const [dados, setDados] = useState<any[]>([]);

  // Busca as marcas da API protegida
  const fetchMarcas = async () => {
    try {
      const resposta = await api.get('/marca'); // Envia Authorization: Bearer <token>
      const marcas = resposta.data;

      const dadosFormatados = marcas.map((marca: { descricao: string; id: string }) => [
        marca.descricao,
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
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
           // alert('acesso negado.');
           
          } else {
            console.error('Erro ao carregar veículos:', axiosError);
            alert('Erro ao carregar veículos');
          }
        }

    /*
    catch (erro) {
      console.error('Erro ao carregar marcas:', erro);
      alert('Erro ao carregar marcas');
    }
*/

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
        await api.delete(`/marca/${id}`); // Envia Authorization: Bearer <token>
        alert('Marca excluída com sucesso!');
        fetchMarcas(); // Atualiza lista após exclusão
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
        <Tabela cabecalhos={cabecalhos} dados={dados} />
        <div className={styles.botoesContainer}>
          <button className={styles.botao} onClick={() => navigate('/cadastro-marca')}>
            Incluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marcas;
