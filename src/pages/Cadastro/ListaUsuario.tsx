import React, { useEffect, useState } from 'react';
import style from './ListaUsuario.module.scss';
import { useNavigate } from 'react-router-dom';
import UsuarioService, { Usuario } from '../../services/usuario.service';

const ListaUsuario = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const fetchUsuarios = async () => {
    try {
      const lista = await UsuarioService.listarUsuarios();
      setUsuarios(lista);
    } catch (error) {
      if (error instanceof Error) setErro(error.message);
      else setErro('Erro desconhecido');
    }
  };

  const deletarUsuario = async (id: string) => {
    const confirmar = window.confirm('Você realmente deseja excluir este usuário?');
    if (!confirmar) return;

    try {
      await UsuarioService.deletarUsuario(id);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    } catch (error) {
      if (error instanceof Error) setErro(error.message);
    }
  };

  const editarUsuario = (id: string) => {
    navigate(`/editar/${id}`);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className={style.listaUsuarioContainer}>
      <h2>Lista de Usuários</h2>
      {erro && <p className={style.erro}>{erro}</p>}
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
                <button
                  className={`${style.botaoAcao} ${style.botaoEditar}`}
                  onClick={() => editarUsuario(usuario.id)}
                >
                  Alterar
                </button>
                <button
                  className={`${style.botaoAcao} ${style.botaoDeletar}`}
                  onClick={() => deletarUsuario(usuario.id)}
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
