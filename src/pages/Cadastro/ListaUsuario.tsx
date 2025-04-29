// src/pages/Cadastro/ListaUsuario.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './ListaUsuario.module.scss';
import UsuarioService, { Usuario } from '../../services/usuario.service';

const ListaUsuario = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Tipagem correta de usuários
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  // Função para buscar a lista de usuários
  const fetchUsuarios = async () => {
    try {
      const lista = await UsuarioService.listar();  // Chama o método listar corretamente
      setUsuarios(lista);  // Atualiza o estado com a lista de usuários
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);  // Captura e exibe o erro
      } else {
        setErro('Erro desconhecido');
      }
    }
  };

  // Função para deletar um usuário
  const deletarUsuario = async (id: string) => {
    const confirmar = window.confirm('Você realmente deseja excluir este usuário?');
    if (!confirmar) return;

    try {
      await UsuarioService.deletarUsuario(id); // Deleta o usuário através do serviço
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id)); // Remove o usuário da lista
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);  // Captura e exibe erro de deleção
      }
    }
  };

  // Função para editar um usuário
  const editarUsuario = (id: string) => {
    navigate(`/editar/${id}`);  // Redireciona para a página de edição do usuário
  };

  // useEffect para carregar a lista de usuários quando o componente é montado
  useEffect(() => {
    fetchUsuarios();  // Chama a função de buscar usuários
  }, []);  // Dependência vazia para rodar apenas uma vez no carregamento do componente

  return (
    <div className={style.listaUsuarioContainer}>
      <h2>Lista de Usuários</h2>
      {erro && <p className={style.erro}>{erro}</p>}  {/* Exibe erros se houver */}
      <table className={style.tabelaUsuarios}>
        <thead>
          <tr>
            <th className={style.tituloColuna}>Nome</th>
            <th className={style.tituloColunaAcao}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className={style.usuarioNome}>{usuario.nome}</td>
              <td className={style.colunaAcao}>
                {/* Verificação se id é válido para evitar o erro de undefined */}
                <button
                  className={`${style.botaoAcao} ${style.botaoEditar}`}
                  onClick={() => usuario.id && editarUsuario(usuario.id)} 
                >
                  Alterar
                </button>
                <button
                  className={`${style.botaoAcao} ${style.botaoDeletar}`}
                  onClick={() => usuario.id && deletarUsuario(usuario.id)} 
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUsuario;
