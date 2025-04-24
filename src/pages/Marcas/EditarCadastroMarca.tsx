import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';

const EditarCadastroMarca = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL
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

  // Carrega a marca existente
  useEffect(() => {
    const fetchMarca = async () => {
      try {
        console.log('ID da marca:', id); // Verifique se o id está correto
        const resposta = await fetch(`http://localhost:3000/marca/${id}`);
        if (!resposta.ok) throw new Error('Erro ao buscar marca');

        const dados = await resposta.json();
        console.log('Dados da marca:', dados);

        setCampos([
          {
            label: 'Marca',
            tipo: 'text',
            nome: 'descricao',
            valor: dados.descricao || '',
            required: true,
          },
        ]);
      } catch (erro) {
        console.error('Erro ao carregar dados da marca:', erro);
        alert('Erro ao carregar dados da marca');
      } finally {
        setCarregando(false);
      }
    };

    if (id) {
      fetchMarca();
    }
  }, [id]);

  // Submete a edição da marca
  const handleSubmit = async (dados: { [key: string]: string }) => {
    console.log('Dados enviados para a API:', dados); // Verifique os dados que estão sendo enviados

    try {
      const resposta = await fetch(`http://localhost:3000/marca/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) {
        const erroResposta = await resposta.json();
        console.log('Erro ao atualizar a marca:', erroResposta); // Logue a resposta do erro para depuração
        throw new Error('Erro ao atualizar a marca');
      }

      const resultado = await resposta.json();
      console.log('Marca atualizada com sucesso:', resultado);
      alert('Marca atualizada com sucesso!');
      navigate('/marcas');
    } catch (erro) {
      console.error('Erro:', erro);
      alert('Erro ao atualizar a marca');
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
