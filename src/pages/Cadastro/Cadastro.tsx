import React, { useState } from 'react';
import style from './Cadastro.module.scss';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';

function Cadastro() {
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');

  async function handleSubmit(dados: { [key: string]: string }) {
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar usuário');
      }

      const data = await response.json();
      console.log('Usuário cadastrado com sucesso:', data);
      setSucesso(data.mensagem || 'Usuário cadastrado com sucesso!');
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

      {/* Feedback visual */}
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
