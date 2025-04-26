import React, { useRef, useState } from 'react';
import axios from 'axios';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import styles from './CadastraVeiculo.module.scss';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

const CadastraVeiculo = () => {
  const formularioRef = useRef<{ submitarFormulario: () => void }>(null);
  const navigate = useNavigate();  // Inicializa o hook useNavigate

  // Estado para o campo ano
  const [ano, setAno] = useState('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [valor, setValor] = useState('');

  // Função chamada ao digitar no campo "ano", garantindo que é um número
  const handleAnoChange = (event: React.ChangeEvent<HTMLInputElement>) => {


    const value = event.target.value;

    // Verifica se é um número inteiro positivo ou vazio (para permitir apagar)
    if (/^\d*$/.test(value)) {
      setAno(value);
    }

  };

  // Campos para o formulário de Cadastro de Veículo
  const campos = [
    { label: 'Marca', tipo: 'text', nome: 'marca', valor: marca, required: true, onChange: (e: any) => setMarca(e.target.value) },
    { label: 'Modelo', tipo: 'text', nome: 'modelo', valor: modelo, required: true, onChange: (e: any) => setModelo(e.target.value) },
    { label: 'Ano', tipo: 'number', nome: 'ano', valor: ano, required: true, onChange: handleAnoChange },
    { label: 'Valor', tipo: 'text', nome: 'valor', valor: valor, required: true, onChange: (e: any) => setValor(e.target.value) },
  ];

  // Função para enviar os dados do formulário
  const handleCadastroVeiculo = async (dados: { [key: string]: string }) => {
    console.log('Cadastro de Veículo:', dados);

      if (!dados.modelo || dados.modelo.trim().length < 2) {
        //setErroModelo('O campo "Modelo" é obrigatório e deve conter pelo menos 2 caracteres.');
        alert('O campo "Modelo" é obrigatório e deve conter pelo menos 2 caracteres.');
        return;
      }

      const anoNumero = parseInt(dados.ano);
      if (isNaN(anoNumero) || anoNumero <= 0) {
        alert('O campo "Ano" deve ser um número positivo.');
        return;
      }
      


    try {
      const response = await axios.post('http://localhost:3000/veiculos', {
        marca: { id: parseInt(dados.marca) },
        modelo: dados.modelo,
        ano: parseInt(dados.ano),
        valor: parseFloat(dados.valor),
      });
      alert('Veículo cadastrado com sucesso: ');
      console.log('Veículo cadastrado com sucesso:', response.data);
      navigate('/veiculos');
      // Aqui você pode redirecionar ou limpar os campos após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar veículo:', error);
    }
  };

  // Função para cancelar o cadastro
  const handleCancelar = () => {
    console.log('Cadastro cancelado');
    navigate('/veiculos');
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
        ref={formularioRef}
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
