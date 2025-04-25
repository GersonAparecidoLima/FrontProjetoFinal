import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import styles from './CadastraVeiculo.module.scss';
import { useNavigate, useParams } from 'react-router-dom';  // useParams para pegar o ID da URL

const EditarCadastraVeiculo = () => {
  const formularioRef = useRef<{ submitarFormulario: () => void }>(null);
  const navigate = useNavigate();
  const { id } = useParams();  // Usando useParams para obter o ID da URL

  const [ano, setAno] = useState('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [valor, setValor] = useState('');

  // Se um ID for passado pela URL, vamos buscar os dados desse veículo para editar
  useEffect(() => {
    if (id) {
      // Buscar dados do veículo pelo ID
      const fetchVeiculo = async () => {
        try {
          const resposta = await axios.get(`http://localhost:3000/veiculos/${id}`);
          const veiculo = resposta.data;
          
          // Preencher os campos com os dados do veículo
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
  }, [id]); // Recarregar os dados se o ID mudar

  const handleAnoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setAno(value);
    }
  };

  const campos = [
    { label: 'Marca', tipo: 'text', nome: 'marca', valor: marca, required: true, onChange: (e: any) => setMarca(e.target.value) },
    { label: 'Modelo', tipo: 'text', nome: 'modelo', valor: modelo, required: true, onChange: (e: any) => setModelo(e.target.value) },
    { label: 'Ano', tipo: 'number', nome: 'ano', valor: ano, required: true, onChange: handleAnoChange },
    { label: 'Valor', tipo: 'text', nome: 'valor', valor: valor, required: true, onChange: (e: any) => setValor(e.target.value) },
  ];

  const handleCadastroVeiculo = async (dados: { [key: string]: string }) => {
    try {
      if (id) {
        // Caso o ID seja passado, estamos editando um veículo
        const response = await axios.put(`http://localhost:3000/veiculos/${id}`, {
          marca: { id: parseInt(dados.marca) },
          modelo: dados.modelo,
          ano: parseInt(dados.ano),
          valor: parseFloat(dados.valor),
        });
        alert('Veículo atualizado com sucesso!');
        console.log('Veículo atualizado com sucesso:', response.data);
      } else {
        // Caso contrário, estamos criando um novo veículo
        const response = await axios.post('http://localhost:3000/veiculos', {
          marca: { id: parseInt(dados.marca) },
          modelo: dados.modelo,
          ano: parseInt(dados.ano),
          valor: parseFloat(dados.valor),
        });
        alert('Veículo cadastrado com sucesso!');
        console.log('Veículo cadastrado com sucesso:', response.data);
      }
      navigate('/veiculos');
    } catch (error) {
      console.error('Erro ao salvar veículo:', error);
    }
  };

  const handleCancelar = () => {
    navigate('/veiculos');
  };

  return (
    <div>
      <h2>{id ? 'Editar Veículo' : 'Cadastro de Veículo'}</h2>
      <FormularioGenerico
        campos={campos}
        onSubmit={handleCadastroVeiculo}
        tipoFormulario="cadastro"
        exibirBotao={false}  // Oculta botão interno
        ref={formularioRef}
      />

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
