import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import api from '../../services/api'; // Importando a api configurada com JWT

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

  // Função para verificar se o usuário está autenticado
  const verificarAutenticacao = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      // Se não tiver token, redireciona para a página de login
      navigate('/login');
    }
  };

  // Carrega a marca existente
  useEffect(() => {
    verificarAutenticacao(); // Verifica se o usuário está autenticado

    const fetchMarca = async () => {
      try {
        console.log('ID da marca:', id); // Verifique se o id está correto
        const resposta = await api.get(`/marca/${id}`); // Usando a API com o token JWT
        if (!resposta) throw new Error('Erro ao buscar marca');

        const dados = resposta.data; // Correção aqui: use resposta.data
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
  }, [id, navigate]);

  // Submete a edição da marca
  const handleSubmit = async (dados: { [key: string]: string }) => {
    console.log('Dados enviados para a API:', dados);

    try {
      const resposta = await api.put(`/marca/${id}`, dados); // Usando a API com o token JWT

      if (!resposta) {
        console.error('Erro ao atualizar a marca: Não recebeu resposta da API');
        throw new Error('Erro ao atualizar a marca');
      }

      const resultado = resposta.data; // Correção aqui: use resposta.data
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
