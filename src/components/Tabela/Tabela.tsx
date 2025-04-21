import React from 'react';
import style from './Tabela.module.scss';

// Definindo os tipos das propriedades que o componente Tabela vai receber
interface TabelaProps {
  cabecalhos: string[]; // Lista de cabeçalhos das colunas (ex: ["Nome", "Email"])
  dados: string[][]; // Dados da tabela (ex: [["João Silva", "joao.silva@example.com"], ...])
}

const Tabela: React.FC<TabelaProps> = ({ cabecalhos, dados }) => {
  return (
    <div className={style.tabelaContainer}>
      <table className={style.tabela}>
        <thead>
          <tr>
            {cabecalhos.map((cabecalho, index) => (
              <th key={index} className={style.cabecalho}>
                {cabecalho}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.map((linha, index) => (
            <tr key={index} className={style.linha}>
              {linha.map((celula, cellIndex) => (
                <td key={cellIndex} className={style.celula}>
                  {celula}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabela;
