import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useLocation
import Tabela from '../../components/Tabela/Tabela'; // Importa o componente de tabela
import styles from './index.module.scss'; // Importa os estilos

const Marcas = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Captura a localização da rota

  const cabecalhos = ['Marca'];
  const [dados, setDados] = useState<string[][]>([]);

  // Função para buscar as marcas da API
  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const resposta = await fetch('http://localhost:3000/marca');
        if (!resposta.ok) {
          throw new Error('Erro ao buscar marcas');
        }

        const marcas = await resposta.json();

        // Transforma os dados para o formato aceito pela tabela
        const dadosFormatados = marcas.map((marca: { descricao: string }) => [marca.descricao]);
        setDados(dadosFormatados);
      } catch (erro) {
        console.error('Erro ao carregar marcas:', erro);
        alert('Erro ao carregar marcas');
      }
    };

    fetchMarcas(); // Chama a função ao montar o componente ou ao mudar de rota
  }, [location]); // Atualiza sempre que a rota mudar (ex: após voltar do cadastro)

  return (
    <div>
      <Tabela cabecalhos={cabecalhos} dados={dados} /> {/* Renderiza a tabela com os dados */}

      <div className={styles.botoesContainer}>
        {/* Botão para ir ao cadastro de nova marca */}
        <button className={styles.botao} onClick={() => navigate('/cadastro-marca')}>
          Incluir
        </button>

        {/* Botões ainda não implementados */}
        <button className={styles.botao}>Alterar</button>
        <button className={styles.botao}>Excluir</button>
      </div>
    </div>
  );
};

export default Marcas;
