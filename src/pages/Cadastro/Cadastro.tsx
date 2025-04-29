import React, { useState } from 'react';
import style from './Cadastro.module.scss';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import UsuarioService from '../../services/usuario.service';


function Cadastro() {
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');

  async function handleSubmit(dados: { [key: string]: string }) {
    try {
      const resultado = await UsuarioService.cadastrarUsuario({

        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
      });

      console.log('Usuário cadastrado com sucesso:', resultado);
      
      setSucesso('Usuário cadastrado com sucesso!');

      setErro('');
    } catch (error) {
      console.error('Erro:', error);
      setErro('Falha ao cadastrar usuário. Tente novamente.');
      setSucesso('');
    }
  }

  const campos = [
    { label: 'Nome', tipo: 'text', nome: 'nome', valor: '', required: true },
    { label: 'Email', tipo: 'email', nome: 'email', valor: '', required: true },
    { label: 'Senha', tipo: 'password', nome: 'senha', valor: '', required: true },
  ];

  return (
    <div className={style.cadastro}>
      <h2>Cadastro de Usuário</h2>

      {sucesso && <p className={style.sucesso}>{sucesso}</p>}
      {erro && <p className={style.erro}>{erro}</p>}

      <FormularioGenerico 
        campos={campos} 
        onSubmit={handleSubmit} 
        tipoFormulario="cadastro" 
      />
    </div>
  );
}

export default Cadastro;
