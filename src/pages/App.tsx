import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from '../pages/Cadastro/Cadastro'; // Importando o componente Cadastro
import Produto from '../pages/Produto/Produto'; // Importando o componente Produto
import ListaUsuario from './Cadastro/ListaUsuario'; // Importando o componente ListaUsuario
import Menu from '../components/Menu'; // Importando o componente Menu
import style from './App.module.scss'; // Importando o estilo do App
import EditarCadastro from './Cadastro/EditarCadastro';
import Inicio from './Inicio'; // ou '../pages/Inicio' se estiver em outro lugar
import Veiculo from './Veiculo';
import Login from './Login';

function App() {
  return (
    <Router>
      <div className={style.AppContainer}>
        {/* Usando o componente Menu */}
        <Menu />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/veiculo" element={<Veiculo />} />

          <Route path="/marcas" element={<div>Em breve: Página de Veículo</div>} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<div>Em breve: Página de Veículo</div>} />
          <Route path="/sair" element={<div>Em breve: Página de Veículo</div>} />  

          <Route path="/editar/:id" element={<EditarCadastro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
