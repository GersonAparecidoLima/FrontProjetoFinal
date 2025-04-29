import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import MarcaService from '../../services/marca.service';

const EditarCadastroMarca = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [carregando, setCarregando] = useState(true);
  const [campos, setCampos] = useState([
    {
      label: 'Marca',
      tipo: 'text',
      nome: 'descricao',
      valor: '',
      required: true,
    },
  ]);

  useEffect(() => {
    const verificarAutenticacao = () => {
      const token = sessionStorage.getItem('token');
      if (!token) navigate('/login');
    };

    const carregarMarca = async () => {
      try {
        if (!id) throw new Error('ID da marca não fornecido');

        const marca = await MarcaService.buscarPorId(id);

        setCampos([
          {
            label: 'Marca',
            tipo: 'text',
            nome: 'descricao',
            valor: marca.descricao || '',
            required: true,
          },
        ]);
      } catch (erro) {
        console.error('Erro ao carregar marca:', erro);
        alert('Erro ao carregar dados da marca.');
      } finally {
        setCarregando(false);
      }
    };

    verificarAutenticacao();
    carregarMarca();
  }, [id, navigate]);

  const handleSubmit = async (dados: { [key: string]: string }) => {
    try {
      if (!id) throw new Error('ID da marca não fornecido');
      await MarcaService.atualizar(id, dados);
      alert('Marca atualizada com sucesso!');
      navigate('/marcas');
    } catch (erro) {
      console.error('Erro ao atualizar marca:', erro);
      alert('Erro ao atualizar a marca.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Editar Marca</h1>
      {carregando ? (
        <p>Carregando marca...</p>
      ) : (
        <FormularioGenerico
          campos={campos}
          onSubmit={handleSubmit}
          tipoFormulario="edicao"
        />
      )}
    </div>
  );
};

export default EditarCadastroMarca;
