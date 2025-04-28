import React, { useState } from 'react';
import axios from 'axios';  // Importando axios
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';  // Importando o FormularioGenerico

const Login = () => {
  const [erro, setErro] = useState<string>('');  // Estado para armazenar mensagens de erro

  const campos = [
    { label: 'E-mail', tipo: 'email', nome: 'email', valor: '', required: true },
    { label: 'Senha', tipo: 'password', nome: 'senha', valor: '', required: true }
  ];

  const handleLogin = async (dados: { [key: string]: string }) => {
    try {
      const response = await axios.post('http://localhost:3000/autenticacao/login', {
        email: dados.email,
        senha: dados.senha,
      });
  
      console.log('Login realizado com sucesso:', response.data);
      
      // Salvar o token no sessionStorage
      sessionStorage.setItem('token', response.data.token_acesso);
  
      alert('Login bem-sucedido!');
      
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErro('E-mail ou senha incorretos.');
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      {erro && <div style={{ color: 'red' }}>{erro}</div>}  {/* Exibe a mensagem de erro */}
      <FormularioGenerico campos={campos} onSubmit={handleLogin} tipoFormulario="login" />
    </div>
  );
};

export default Login;
