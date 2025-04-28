import axios from 'axios';

// Criação da instância axios com a URL base do servidor
const api = axios.create({
  baseURL: 'http://localhost:3000', // Defina a URL base do seu servidor
});

// Interceptor para adicionar o token JWT nas requisições
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token'); // Recupera o token do sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho da requisição
  }
  return config; // Retorna a configuração da requisição
});

export default api;
