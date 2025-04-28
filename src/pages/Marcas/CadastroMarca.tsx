import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import api from '../../services/api'; // <-- Usa o Axios com JWT

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
    console.log('Dados enviados:', dados);

    if (!dados.descricao || dados.descricao.trim().length < 3) {
      alert('A descrição da marca deve ter no mínimo 3 caracteres.');
      return;
    }

    try {
      const resposta = await api.post('/marca', dados); // <-- token enviado automaticamente

      console.log('Marca cadastrada com sucesso:', resposta.data);
      alert('Marca cadastrada com sucesso!');
      navigate('/marcas');
    } catch (erro) {
      console.error('Erro:', erro);
      alert('Erro ao cadastrar a marca');
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
