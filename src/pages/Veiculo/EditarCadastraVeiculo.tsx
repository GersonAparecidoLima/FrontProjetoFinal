import React, { useEffect, useState, useRef } from 'react';
import api from '../../services/api'; // <-- Usa Axios com JWT
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import styles from './CadastraVeiculo.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

const EditarCadastraVeiculo = () => {
  const formularioRef = useRef<{ submitarFormulario: () => void }>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [ano, setAno] = useState<string>('');
  const [modelo, setModelo] = useState<string>('');
  const [marca, setMarca] = useState<string>('');
  const [valor, setValor] = useState<string>('');

  useEffect(() => {
    if (id) {
      const fetchVeiculo = async () => {
        try {
          const resposta = await api.get(`/veiculos/${id}`); // <-- token enviado
          const veiculo = resposta.data;
          setAno(veiculo.ano.toString());
          setModelo(veiculo.modelo);
          setMarca(veiculo.marca.id.toString());
          setValor(veiculo.valor.toString());
        } catch (erro) {
          console.error('Erro ao buscar dados do veículo:', erro);
          alert('Erro ao carregar os dados do veículo');
        }
      };
      fetchVeiculo();
    }
  }, [id]);

  useEffect(() => {
    console.log('Estado atualizado:', { ano, modelo, marca, valor });
  }, [ano, modelo, marca, valor]);

  const handleAnoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setAno(value);
    }
  };

  const campos = [
    {
      label: 'Marca',
      tipo: 'text',
      nome: 'marca',
      valor: marca,
      required: true,
      onChange: (e: any) => setMarca(e.target.value),
    },
    {
      label: 'Modelo',
      tipo: 'text',
      nome: 'modelo',
      valor: modelo,
      required: true,
      onChange: (e: any) => setModelo(e.target.value),
    },
    {
      label: 'Ano',
      tipo: 'number',
      nome: 'ano',
      valor: ano,
      required: true,
      onChange: handleAnoChange,
    },
    {
      label: 'Valor',
      tipo: 'text',
      nome: 'valor',
      valor: valor,
      required: true,
      onChange: (e: any) => setValor(e.target.value),
    },
  ];

  const handleCadastroVeiculo = async (dados: { [key: string]: string }) => {
    try {
      const dadosVeiculo = {
        marca: { id: parseInt(dados.marca) },
        modelo: dados.modelo,
        ano: parseInt(dados.ano),
        valor: parseFloat(dados.valor),
      };

      if (id) {
        const response = await api.put(`/veiculos/${id}`, dadosVeiculo); // <-- token enviado
        alert('Veículo atualizado com sucesso!');
        console.log('Veículo atualizado:', response.data);
      } else {
        const response = await api.post('/veiculos', dadosVeiculo); // <-- token enviado
        alert('Veículo cadastrado com sucesso!');
        console.log('Veículo cadastrado:', response.data);
      }

      navigate('/veiculos');
    } catch (error) {
      console.error('Erro ao salvar veículo:', error);
      alert('Erro ao salvar o veículo');
    }
  };

  const handleCancelar = () => {
    navigate('/veiculos');
  };

  return (
    <div>
      <h2>{id ? 'Editar Veículo' : 'Cadastro de Veículo'}</h2>

      {ano && modelo && marca && valor ? (
        <FormularioGenerico
          campos={campos}
          onSubmit={handleCadastroVeiculo}
          tipoFormulario="cadastro"
          exibirBotao={false}
          ref={formularioRef}
        />
      ) : (
        <p>Carregando dados do veículo...</p>
      )}

      <div className={styles.botoesContainer}>
        <button
          className={styles.botao}
          onClick={() => formularioRef.current?.submitarFormulario()}
        >
          {id ? 'Atualizar' : 'Cadastrar'}
        </button>
        <button className={styles.botao} onClick={handleCancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditarCadastraVeiculo;
