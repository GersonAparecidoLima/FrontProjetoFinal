import React from 'react';
import FormularioGenerico from '../../components/FormularioGenerico/FormularioGenerico'; // Importando o FormularioGenerico

const Login = () => {
  const campos = [
    { label: 'Nome', tipo: 'text', nome: 'nome', valor: '', required: true },
    { label: 'Senha', tipo: 'password', nome: 'senha', valor: '', required: true }
  ];

  const handleLogin = (dados: { [key: string]: string }) => {
    // Lógica de login (validação com API, por exemplo)
    console.log('Dados do login:', dados);
  };

  return (
    <div>
       <h2>Login</h2>
      <FormularioGenerico campos={campos} onSubmit={handleLogin} tipoFormulario="login" />
    </div>
  );
};

export default Login;
