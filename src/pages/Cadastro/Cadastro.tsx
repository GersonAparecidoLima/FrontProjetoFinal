// src/pages/Cadastro/Cadastro.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../../services/usuario.service';

const Cadastro = () => {
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    senha: '',
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(dados: { [key: string]: string }) {
    try {
      const resultado = await UsuarioService.cadastrar({
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha, // Certifique-se de passar a senha se necessário
      });
      setSucesso(resultado.mensagem || 'Usuário cadastrado com sucesso!');
      setErro('');
      setTimeout(() => {
        navigate('/lista-usuario');
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro('Erro desconhecido');
      }
      setSucesso('');
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  return (
    <div>
      <h2>Cadastrar Usuário</h2>

      {sucesso && <p>{sucesso}</p>}
      {erro && <p>{erro}</p>}

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(dados); }}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={dados.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={dados.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={dados.senha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
