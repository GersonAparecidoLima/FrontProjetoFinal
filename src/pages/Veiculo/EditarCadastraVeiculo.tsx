import React, { useEffect, useState, useRef } from 'react';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import styles from './CadastraVeiculo.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import VeiculoService from '../../services/veiculo.service';
import MarcaService from '../../services/marca.service';

const EditarCadastraVeiculo = () => {
  const formularioRef = useRef<{ submitarFormulario: () => void }>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [ano, setAno] = useState<string>('');
  const [modelo, setModelo] = useState<string>('');
  const [marcaId, setMarcaId] = useState<string>(''); // Salva o ID da marca
  const [valor, setValor] = useState<string>('');
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
        console.error('Erro ao carregar marcas:', error);
        alert('Erro ao carregar marcas.');
      }
    };

    fetchMarcas();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchVeiculo = async () => {
        try {
          const veiculo = await VeiculoService.buscarPorId(id);
          setAno(veiculo.ano.toString());
          setModelo(veiculo.modelo);
          setMarcaId(veiculo.marca.id.toString()); // Aqui usamos o ID corretamente
          setValor(veiculo.valor.toString());
        } catch (erro) {
          console.error('Erro ao buscar dados do veículo:', erro);
          alert('Erro ao carregar os dados do veículo');
        }
      };
      fetchVeiculo();
    }
  }, [id]);

  const handleAnoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setAno(value);
    }
  };

  const campos = [
    {
      label: 'Marca',
      tipo: 'select',
      nome: 'marca',
      valor: marcaId,
      required: true,
      opcoes: opcoesMarca,
      onChange: (e: any) => setMarcaId(e.target.value),
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
        modelo: dados.modelo,
        ano: parseInt(dados.ano),
        valor: parseFloat(dados.valor),
        marca: {
          id: parseInt(dados.marca),
        },
      };

      if (id) {
        await VeiculoService.editar(id, dadosVeiculo);
        alert('Veículo atualizado com sucesso!');
      } else {
        await VeiculoService.cadastrar(dadosVeiculo);
        alert('Veículo cadastrado com sucesso!');
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

      {id && !ano && !modelo && !marcaId && !valor ? (
        <p>Carregando dados do veículo...</p>
      ) : (
        <>
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
              {id ? 'Atualizar' : 'Cadastrar'}
            </button>
            <button className={styles.botao} onClick={handleCancelar}>
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditarCadastraVeiculo;
