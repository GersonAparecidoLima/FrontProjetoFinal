
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';

const CadastroMarca = () => {
  const navigate = useNavigate(); // Hook para navegação


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
      //setErroModelo('A descrição da marca deve ter no mínimo 3 caracteres.');
      alert('A descrição da marca deve ter no mínimo 3 caracteres.');
      return;
    }

    
    try {
      const resposta = await fetch('http://localhost:3000/marca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) {
        throw new Error('Erro ao cadastrar a marca');
      }

      const resultado = await resposta.json();
      console.log('Marca cadastrada com sucesso:', resultado);
      alert('Marca cadastrada com sucesso!');

      // Redireciona para a página de Marcas após o cadastro
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
