import React, { useRef } from 'react';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import styles from './CadastraVeiculo.module.scss';

const CadastraVeiculo = () => {
  // Referência para acionar o submit externo
  const formularioRef = useRef<{ submitarFormulario: () => void }>(null);

  // Campos para o formulário de Cadastro de Veículo
  const campos = [
    { label: 'Marca', tipo: 'text', nome: 'marca', valor: '', required: true },
    { label: 'Modelo', tipo: 'text', nome: 'modelo', valor: '', required: true },
    { label: 'Ano', tipo: 'number', nome: 'ano', valor: '', required: true },
    { label: 'Valor', tipo: 'text', nome: 'valor', valor: '', required: true },
  ];

  // Função que é chamada ao enviar o formulário
  const handleCadastroVeiculo = (dados: { [key: string]: string }) => {
    console.log('Cadastro de Veículo:', dados);
    // Aqui você pode enviar para uma API ou outro lugar
  };

  // Função para cancelar o cadastro
  const handleCancelar = () => {
    console.log('Cadastro cancelado');
    // Aqui você pode redirecionar, limpar campos, etc.
  };

  return (
    <div>
      <h2>Cadastro de Veículo</h2>

      <FormularioGenerico
        campos={campos}
        onSubmit={handleCadastroVeiculo}
        tipoFormulario="cadastro"
        exibirBotao={false} // Oculta botão interno
        ref={formularioRef} // Ref para acionar o submit externo
      />

      <div className={styles.botoesContainer}>
        <button
          className={styles.botao}
          onClick={() => formularioRef.current?.submitarFormulario()}
        >
          Cadastrar
        </button>
        <button className={styles.botao} onClick={handleCancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CadastraVeiculo;
