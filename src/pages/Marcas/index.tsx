import React from 'react';
import Tabela from '../../components/Tabela/Tabela';
import styles from './index.module.scss'; // import do estilo novo

const Marcas = () => {
  // Cabeçalhos da tabela
  const cabecalhos = ['Marca'];

  // Dados de exemplo - você pode substituir depois por dados reais
  const dados = [
    ['Toyota'],
    ['Honda'],
    ['Ford'],
    ['Chevrolet'],
    ['Volkswagen'],
  ];

  return (
    <div>
      <Tabela cabecalhos={cabecalhos} dados={dados} />

      <div className={styles.botoesContainer}>
        <button className={styles.botao} >Incluir</button>
        <button className={styles.botao} >Alterar</button>
        <button className={styles.botao} >Excluir</button>
      </div>

    </div>
  );
};

export default Marcas;
