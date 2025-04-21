import React, { useState, forwardRef, useImperativeHandle } from 'react';
import style from './FormularioGenerico.module.scss';

interface Campo {
  label: string;
  tipo: string;
  nome: string;
  valor: string;
  required: boolean;
}

interface Props {
  campos: Campo[];
  onSubmit: (dados: { [key: string]: string }) => void;
  tipoFormulario: string;
  exibirBotao?: boolean;
}

// Componente com forwardRef para permitir submit externo
const FormularioGenerico = forwardRef(function FormularioGenerico(
  { campos, onSubmit, tipoFormulario, exibirBotao = true }: Props,
  ref
) {
  const [dadosFormulario, setDadosFormulario] = useState<Record<string, string>>(
    campos.reduce((acc, campo) => {
      acc[campo.nome] = campo.valor || '';
      return acc;
    }, {} as Record<string, string>)
  );

  const [erros, setErros] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosFormulario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};

    campos.forEach((campo) => {
      if (campo.required && !dadosFormulario[campo.nome]) {
        novosErros[campo.nome] = `${campo.label} é obrigatório.`;
      }
    });

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validarFormulario()) {
      onSubmit(dadosFormulario);
    }
  };

  // Expõe a função de submit para o componente pai via ref
  useImperativeHandle(ref, () => ({
    submitarFormulario: () => {
      if (validarFormulario()) {
        onSubmit(dadosFormulario);
      }
    },
  }));

  return (
    <form className={style.formularioGenerico} onSubmit={handleSubmit}>
      {campos.map((campo) => (
        <div key={campo.nome} className={style.inputContainer}>
          <label htmlFor={campo.nome}>{campo.label}</label>
          <input
            type={campo.tipo}
            name={campo.nome}
            id={campo.nome}
            value={dadosFormulario[campo.nome]}
            onChange={handleInputChange}
            required={campo.required}
          />
          {erros[campo.nome] && <div className={style.popError}>{erros[campo.nome]}</div>}
        </div>
      ))}

      {exibirBotao && (
        <button type="submit" className={style.submitButton}>
          {tipoFormulario === 'cadastro' ? 'Cadastrar' : 'Enviar'}
        </button>
      )}
    </form>
  );
});

export default FormularioGenerico;
