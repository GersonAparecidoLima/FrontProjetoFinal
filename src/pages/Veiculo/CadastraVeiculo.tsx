// src/pages/Veiculo/CadastraVeiculo.tsx

import React, { useRef, useState, useEffect } from 'react';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import styles from './CadastraVeiculo.module.scss';
import { useNavigate } from 'react-router-dom';
import VeiculoService from '../../services/veiculo.service';
import MarcaService from '../../services/marca.service';

const CadastraVeiculo = () => {
  const formularioRef = useRef<{ submitarFormulario: () => void }>(null);
  const navigate = useNavigate();
  const [opcoesMarca, setOpcoesMarca] = useState<{ label: string; valor: string }[]>([]);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const marcas = await MarcaService.listarTodas();
        const marcasFormatadas = marcas.map((marca) => ({
          label: marca.descricao,
          valor: marca.id.toString(),
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
      opcoes: opcoesMarca,
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
      await VeiculoService.cadastrar({
        modelo: dados.modelo,
        ano: anoNumero,
        valor: valorNumero,
        marca: {
          id: parseInt(dados.marca),
        },
      });

      alert('Veículo cadastrado com sucesso!');
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
