import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tabela from '../../components/Tabela/Tabela';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

const Veiculo = () => {
  const [dados, setDados] = useState<string[][]>([]);
  const navigate = useNavigate();

  // Adicionar "Valor" e "Ação" ao cabeçalho da tabela
  const cabecalhos = ['Marca ID', 'Modelo', 'Ano', 'Valor', 'Ação'];

  useEffect(() => {
    // Requisição para buscar os veículos
    axios.get('http://localhost:3000/veiculos')
      .then(response => {
        console.log(response.data); // Verifique a resposta para conferir os dados
        const veiculos = response.data;
        const dadosFormatados = veiculos.map((v: any) => [
          v.marca?.id?.toString() || 'N/A', // Garantir que o valor não seja indefinido
          v.modelo,
          v.ano.toString(),
          // Garantir que 'valor' seja um número
          typeof v.valor === 'number' && !isNaN(v.valor) ? v.valor.toFixed(2) :
          !isNaN(parseFloat(v.valor)) ? parseFloat(v.valor).toFixed(2) : 'N/A', // Tratar caso 'valor' seja string numérica
          // Adicionar os botões Editar e Excluir
          <div key={v.id}>
            <button
              className={styles.botao}
              onClick={() => handleEditar(v.id)} // Editar (exemplo de id do veículo)
            >
              Editar
            </button>
            <button
              className={styles.botao}
              onClick={() => handleExcluir(v.id)} // Excluir (exemplo de id do veículo)
            >
              Excluir
            </button>
          </div>
        ]);
        setDados(dadosFormatados);
      })
      .catch(error => {
        console.error('Erro ao buscar veículos:', error);
      });
  }, []);

  // Função para navegar para a tela de edição
  const handleEditar = (id: string) => {
    navigate(`/editar-veiculo/${id}`);
  };

  // Função para excluir o veículo
  const handleExcluir = (id: string) => {
    if (window.confirm('Você tem certeza que deseja excluir este veículo?')) {
      axios.delete(`http://localhost:3000/veiculos/${id}`)
        .then(() => {
          // Atualizar a tabela após a exclusão
          setDados(dados.filter((veiculo: any) => veiculo.id !== id));
          alert('Veículo excluído com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao excluir veículo:', error);
        });
    }
  };

  return (
    <div>
      {/* Renderizando a Tabela */}
      <Tabela cabecalhos={cabecalhos} dados={dados} />

      {/* Container para os botões de navegação */}
      <div className={styles.botoesContainer}>
        <button className={styles.botao} onClick={() => navigate('/cadastro-veiculo')}>
          Incluir
        </button>
      </div>

      {/* Optional: Renderizar os botões fora da tabela, caso necessário */}
      {/* 
      <div>
        {dados.map((item, index) => (
          <div key={index}>
            <button
              className={styles.botao}
              onClick={() => handleEditar(item[0])}
            >
              Editar
            </button>
            <button
              className={styles.botao}
              onClick={() => handleExcluir(item[0])}
            >
              Excluir
            </button>
          </div>
        ))}
      </div> 
      */}
    </div>
  );
};

export default Veiculo;
