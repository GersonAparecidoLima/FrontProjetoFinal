import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from '../pages/Cadastro/Cadastro'; // Importando o componente Cadastro
import Menu from '../components/Menu'; // Importando o componente Menu
import style from './App.module.scss'; // Importando o estilo do App
import EditarCadastro from './Cadastro/EditarCadastro';
import Inicio from './Inicio'; // ou '../pages/Inicio' se estiver em outro lugar
import Veiculo from './Veiculo';
import Login from './Login';
import CadastraVeiculo from './Veiculo/CadastraVeiculo';
import Marcas from './Marcas';
import CadastroMarca from './Marcas/CadastroMarca';
import EditarCadastroMarca from './Marcas/EditarCadastroMarca';
import EditarCadastraVeiculo from './Veiculo/EditarCadastraVeiculo';
import Tarefa from './Tarefa/Tarefa';
import ListaUsuario from './Cadastro/ListaUsuario';
import Logout from './Sair/Logout';
import VeiculoPublico from './Veiculo/indexPublico';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <div className={style.AppContainer}>
        {/* Usando o componente Menu */}
        <Menu />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/veiculos" element={<Veiculo />} />
          <Route path="/veiculos/publico" element={<VeiculoPublico />} />
          <Route path="/cadastro-veiculo" element={<CadastraVeiculo />} />
          <Route path="/editar-veiculo/:id" element={<EditarCadastraVeiculo />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/lista-usuario" element={<ListaUsuario />} />
          <Route path="/cadastro-marca" element={<CadastroMarca />} />
          <Route path="/dashboard" element={<Dashboard />} />          
          <Route path="/sair" element={<Logout />} />
          <Route path="/editar-marca/:id" element={<EditarCadastroMarca />} />
          <Route path="/editar/:id" element={<EditarCadastro />} />
          <Route path="/tarefa" element={<Tarefa />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
