import React from 'react';
import ReactDOM from 'react-dom/client'; // Usando a versão correta do ReactDOM para v18
import './index.css'; // Importando os estilos principais
import App from './pages/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App /> {/* Substituindo o Router por App.tsx */}
  </React.StrictMode>
);
