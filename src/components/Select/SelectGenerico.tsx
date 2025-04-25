import React from 'react';
import styles from './SelectGenerico.module.scss';

interface Opcao {
  label: string;
  valor: string;
}

interface Props {
  nome: string;
  label: string;
  valor: string;
  required?: boolean;
  opcoes: Opcao[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectGenerico: React.FC<Props> = ({ nome, label, valor, required, opcoes, onChange }) => {
  return (
    <div className={styles.selectContainer}>
      <label htmlFor={nome}>{label}</label>
      <select
        id={nome}
        name={nome}
        value={valor}
        onChange={onChange}
        required={required}
      >
        <option value="">Selecione</option>
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGenerico;
