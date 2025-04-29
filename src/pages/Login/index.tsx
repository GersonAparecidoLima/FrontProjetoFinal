import React, { useState } from 'react';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico';
import AuthService from '../../services/auth.service';

const Login = () => {
  const [erro, setErro] = useState<string>('');

  const campos = [
    { label: 'E-mail', tipo: 'email', nome: 'email', valor: '', required: true },
    { label: 'Senha', tipo: 'password', nome: 'senha', valor: '', required: true },
  ];

  const handleLogin = async (dados: { [key: string]: string }) => {
    try {
      await AuthService.login(dados.email, dados.senha);
      alert('Login bem-sucedido!');
      // Você pode redirecionar aqui se quiser, ex: navigate('/veiculos');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErro('E-mail ou senha incorretos.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {erro && <div style={{ color: 'red' }}>{erro}</div>}
      <FormularioGenerico campos={campos} onSubmit={handleLogin} tipoFormulario="login" />
    </div>
  );
};

export default Login;
