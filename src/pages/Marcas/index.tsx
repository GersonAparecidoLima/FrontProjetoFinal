import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabela from '../../components/Tabela/Tabela';
import styles from './index.module.scss';

const Marcas = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cabecalhos = ['Marca', 'Ações'];
  const [dados, setDados] = useState<any[]>([]);

  // Função para buscar as marcas da API
  const fetchMarcas = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/marca');
      if (!resposta.ok) {
        throw new Error('Erro ao buscar marcas');
      }

      const marcas = await resposta.json();
      const dadosFormatados = marcas.map((marca: { descricao: string, id: string }) => [
        marca.descricao,
        <>
          <button 
            className={`${styles.botao} ${styles.alterar}`} 
            onClick={() => handleAlterar(marca.id)}>
            Alterar
          </button>
          <button 
            className={`${styles.botao} ${styles.excluir}`} 
            onClick={() => handleExcluir(marca.id)}>
            Excluir
          </button>
        </>
      ]);
      setDados(dadosFormatados);
    } catch (erro) {
      console.error('Erro ao carregar marcas:', erro);
      alert('Erro ao carregar marcas');
    }
  };

  useEffect(() => {
    fetchMarcas(); // Chama a função ao montar o componente ou ao mudar de rota
  }, [location]);

  const handleAlterar = (id: string) => {
    navigate(`/editar-marca/${id}`);
  };

  const handleExcluir = async (id: string) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir esta marca?');
    if (confirmacao) {
      try {
        const resposta = await fetch(`http://localhost:3000/marca/${id}`, {
          method: 'DELETE',
        });
        if (!resposta.ok) {
          throw new Error('Erro ao excluir a marca');
        }
        alert('Marca excluída com sucesso!');
        // Atualiza o estado para remover a marca excluída da lista
        setDados(dados.filter((marca) => marca[1].props.children[1].props.onClick !== handleExcluir));
      } catch (erro) {
        console.error('Erro ao excluir marca:', erro);
        alert('Erro ao excluir a marca');
      }
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.tabelaContainer}>
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
