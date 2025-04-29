// src/services/auth.service.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Você pode mover isso para uma env var se preferir

const AuthService = {
  login: async (email: string, senha: string): Promise<string> => {
    const response = await axios.post(`${BASE_URL}/autenticacao/login`, { email, senha });
    const token = response.data.token_acesso;
    sessionStorage.setItem('token', token);
    return token;
  },
  
  logout: () => {
    sessionStorage.removeItem('token');
  },

  getToken: (): string | null => {
    return sessionStorage.getItem('token');
  },

  isAutenticado: (): boolean => {
    return !!sessionStorage.getItem('token');
  }
};

export default AuthService;
