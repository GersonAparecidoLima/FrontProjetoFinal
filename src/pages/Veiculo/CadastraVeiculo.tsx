import React from 'react';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico'; // Importando o FormularioGenerico
import styles from './CadastraVeiculo.module.scss';


const CadastraVeiculo = () => {
  // Campos para o formulário de Cadastro de Veículo
  const campos = [
    { label: 'Marca', tipo: 'text', nome: 'marca', valor: '', required: true },
    { label: 'Modelo', tipo: 'text', nome: 'modelo', valor: '', required: true },
    { label: 'Ano', tipo: 'number', nome: 'ano', valor: '', required: true },
    { label: 'Valor', tipo: 'text', nome: 'valor', valor: '', required: true }
  ];

  // Função que é chamada ao enviar o formulário
  const handleCadastroVeiculo = (dados: { [key: string]: string }) => {
    console.log('Cadastro de Veículo:', dados);
    // Lógica de cadastro do veículo (enviar para uma API, salvar no localStorage, etc)
  };

  // Função para cancelar o cadastro
  const handleCancelar = () => {
    console.log('Cadastro cancelado');
    // Lógica para cancelar, pode redirecionar ou limpar o formulário
  };

  return (
    <div>
      <h2>Cadastro de Veículo</h2>
      <FormularioGenerico campos={campos} onSubmit={handleCadastroVeiculo} tipoFormulario="cadastro" />
      
      <div className="botoesContainer">
        <button className={styles.botao} onClick={handleCancelar}>Cadastrar</button>
        <button className={styles.botao} onClick={handleCancelar}>Cancelar</button>
      </div>
    </div>
  );
};

export default CadastraVeiculo;
