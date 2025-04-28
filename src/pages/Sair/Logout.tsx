import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remover o token de acesso do sessionStorage
    sessionStorage.removeItem('token');
    
    // Forçar o redirecionamento para a página de login
    navigate('/login');
  }, [navigate]);  // Garantir que a navegação aconteça apenas uma vez

  return (
    <div>Redirecionando para o login...</div>  // Mensagem informando o usuário
  );
};

export default Logout;
