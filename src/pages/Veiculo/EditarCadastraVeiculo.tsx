import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import styles from './CadastraVeiculo.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

const EditarCadastraVeiculo = () => {
  const formularioRef = useRef<{ submitarFormulario: () => void }>(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Usando useParams para obter o ID da URL

  // Estado para os dados do veículo
  const [ano, setAno] = useState<string>('');
  const [modelo, setModelo] = useState<string>('');
  const [marca, setMarca] = useState<string>(''); // Apenas o ID da marca como string
  const [valor, setValor] = useState<string>('');

  // Função para carregar os dados do veículo ao editar
  useEffect(() => {
    if (id) {
      const fetchVeiculo = async () => {
        try {
          const resposta = await axios.get(`http://localhost:3000/veiculos/${id}`);
          const veiculo = resposta.data;
          console.log('Veículo carregado:', veiculo); // Adicionei para depuração

          // Preencher os campos com os dados do veículo
          setAno(veiculo.ano.toString());
          setModelo(veiculo.modelo);
          setMarca(veiculo.marca.id.toString());  // Marca como ID
          setValor(veiculo.valor.toString());  // Valor como string
        } catch (erro) {
          console.error('Erro ao buscar dados do veículo:', erro);
          alert('Erro ao carregar os dados do veículo');
        }
      };
      fetchVeiculo();
    }
  }, [id]);  // Recarregar os dados se o ID mudar

  // Adicionando useEffect para verificar o estado atualizado
  useEffect(() => {
    console.log('Estado atualizado:', { ano, modelo, marca, valor });
  }, [ano, modelo, marca, valor]);  // Esse efeito será chamado quando qualquer estado mudar

  // Função para validar e alterar o ano
  const handleAnoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setAno(value);
    }
  };

  // Campos do formulário
  const campos = [
    { label: 'Marca', tipo: 'text', nome: 'marca', valor: marca, required: true, onChange: (e: any) => setMarca(e.target.value) },
    { label: 'Modelo', tipo: 'text', nome: 'modelo', valor: modelo, required: true, onChange: (e: any) => setModelo(e.target.value) },
    { label: 'Ano', tipo: 'number', nome: 'ano', valor: ano, required: true, onChange: handleAnoChange },
    { label: 'Valor', tipo: 'text', nome: 'valor', valor: valor, required: true, onChange: (e: any) => setValor(e.target.value) },
  ];

  // Função para cadastrar ou editar o veículo
  const handleCadastroVeiculo = async (dados: { [key: string]: string }) => {
    try {
      const dadosVeiculo = {
        marca: { id: parseInt(dados.marca) },  // Marca como ID numérico
        modelo: dados.modelo,
        ano: parseInt(dados.ano),
        valor: parseFloat(dados.valor),
      };

      if (id) {
        const response = await axios.put(`http://localhost:3000/veiculos/${id}`, dadosVeiculo);
        alert('Veículo atualizado com sucesso!');
        console.log('Veículo atualizado com sucesso:', response.data);
      } else {
        const response = await axios.post('http://localhost:3000/veiculos', dadosVeiculo);
        alert('Veículo cadastrado com sucesso!');
        console.log('Veículo cadastrado com sucesso:', response.data);
      }
      navigate('/veiculos');
    } catch (error) {
      console.error('Erro ao salvar veículo:', error);
      alert('Erro ao salvar o veículo');
    }
  };

  // Função para cancelar a edição ou cadastro e voltar à lista
  const handleCancelar = () => {
    navigate('/veiculos');
  };

  return (
    <div>
      <h2>{id ? 'Editar Veículo' : 'Cadastro de Veículo'}</h2>
      
      {/* Verificar estado do formulário antes de renderizar */}
      {ano && modelo && marca && valor ? (
        <FormularioGenerico
          campos={campos}
          onSubmit={handleCadastroVeiculo}
          tipoFormulario="cadastro"
          exibirBotao={false}  // Oculta botão interno
          ref={formularioRef}
        />
      ) : (
        <p>Carregando dados do veículo...</p> // Mensagem de carregamento
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
