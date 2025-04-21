import React from 'react';
import Tabela from '../../components/Tabela/Tabela'; // Caminho certo pro seu componente

const Veiculo = () => {
  const cabecalhos = ['Marca', 'Modelo', 'Ano', 'Valor'];
  const dados = [
    ['Chevrolet', 'Onix', '2022', 'R$ 65.000,00'],
    ['Volkswagen', 'Gol', '2021', 'R$ 55.000,00'],
    ['Toyota', 'Corolla', '2023', 'R$ 120.000,00'],
    ['Honda', 'Civic', '2020', 'R$ 90.000,00'],
    ['Ford', 'Ka', '2019', 'R$ 45.000,00'],
    ['Hyundai', 'HB20', '2022', 'R$ 70.000,00'],
    ['Fiat', 'Argo', '2021', 'R$ 60.000,00']
  ];

  return (
    <div>    
      <Tabela cabecalhos={cabecalhos} dados={dados} />
    </div>
  );
};

export default Veiculo;
