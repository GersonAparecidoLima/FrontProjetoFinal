import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import MarcaService from '../../services/marca.service';

const CadastroMarca = () => {
  const navigate = useNavigate();

  const campos = [
    {
      label: 'Marca',
      tipo: 'text',
      nome: 'descricao',
      valor: '',
      required: true,
    },
  ];

  const handleSubmit = async (dados: { [key: string]: string }) => {
    if (!dados.descricao || dados.descricao.trim().length < 3) {
      alert('A descrição da marca deve ter no mínimo 3 caracteres.');
      return;
    }

    try {
      await MarcaService.criar({ descricao: dados.descricao });
      alert('Marca cadastrada com sucesso!');
      navigate('/marcas');
    } catch (erro) {
      console.error('Erro ao cadastrar marca:', erro);
      alert('Erro ao cadastrar a marca.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cadastro de Marca</h1>
      <FormularioGenerico
        campos={campos}
        onSubmit={handleSubmit}
        tipoFormulario="cadastro"
      />
    </div>
  );
};

export default CadastroMarca;
