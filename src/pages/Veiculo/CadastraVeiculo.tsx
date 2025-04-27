import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import styles from './CadastraVeiculo.module.scss';
import { useNavigate } from 'react-router-dom';

const CadastraVeiculo = () => {
  const formularioRef = useRef<{ submitarFormulario: () => void }>(null);
  const navigate = useNavigate();

  // Estado para armazenar as marcas
  const [opcoesMarca, setOpcoesMarca] = useState<{ label: string, valor: string }[]>([]);

  // Buscando as marcas ao carregar o componente
  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/marca');
        // Mapeando a resposta da API para o formato esperado
        const marcasFormatadas = response.data.map((marca: { id: number, descricao: string }) => ({
          label: marca.descricao,  // Usando a 'descricao' como o texto da opção
          valor: marca.id.toString(), // Convertendo o id para string para manter a consistência
        }));
        setOpcoesMarca(marcasFormatadas);
      } catch (error) {
        console.error('Erro ao buscar marcas:', error);
        alert('Erro ao carregar marcas.');
      }
    };

    fetchMarcas();
  }, []);

  const campos = [
    {
      label: 'Marca do Veículo',
      tipo: 'select',
      nome: 'marca',
      valor: '',
      required: true,
      opcoes: opcoesMarca, // Aqui as opções de marcas são dinâmicas
    },
    {
      label: 'Modelo',
      tipo: 'text',
      nome: 'modelo',
      valor: '',
      required: true,
    },
    {
      label: 'Ano',
      tipo: 'number',
      nome: 'ano',
      valor: '',
      required: true,
    },
    {
      label: 'Valor',
      tipo: 'text',
      nome: 'valor',
      valor: '',
      required: true,
    },
  ];

  const handleCadastroVeiculo = async (dados: { [key: string]: string }) => {
    console.log('Cadastro de Veículo:', dados);

    if (!dados.modelo || dados.modelo.trim().length < 2) {
      alert('O campo "Modelo" é obrigatório e deve conter pelo menos 2 caracteres.');
      return;
    }

    const anoNumero = parseInt(dados.ano);
    if (isNaN(anoNumero) || anoNumero <= 0) {
      alert('O campo "Ano" deve ser um número positivo.');
      return;
    }

    const valorNumero = parseFloat(dados.valor);
    if (isNaN(valorNumero) || valorNumero <= 0) {
      alert('O campo "Valor" deve ser um número válido.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/veiculos', {
        marca: { id: parseInt(dados.marca) },
        modelo: dados.modelo,
        ano: anoNumero,
        valor: valorNumero,
      });

      alert('Veículo cadastrado com sucesso!');
      console.log('Veículo cadastrado:', response.data);
      navigate('/veiculos');
    } catch (error) {
      console.error('Erro ao cadastrar veículo:', error);
      alert('Erro ao cadastrar veículo.');
    }
  };

  const handleCancelar = () => {
    navigate('/veiculos');
  };

  return (
    <div className={styles.container}>
      <h2>Cadastro de Veículo</h2>

      <FormularioGenerico
        campos={campos}
        onSubmit={handleCadastroVeiculo}
        tipoFormulario="cadastro"
        exibirBotao={false}
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
