import React, { useState } from 'react';
import style from './Produto.module.scss';

type Caracteristica = { nome: string; descricao: string };
type Imagem = { url: string; descricao: string };

const Produto = () => {
  const [produto, setProduto] = useState({
    nome: "Monitor",
    valor: 100,
    quantidadeDisponivel: 10,
    descricao: "Monitor com 4 botões programáveis e iluminação RGB.",
    categoria: "Periféricos",
    caracteristicas: [
      { nome: "Sensor", descricao: "Óptico 16000 DPI" },
      { nome: "Conectividade", descricao: "USB com fio" },
    ],
    imagens: [
      { url: "https://exemplo.com/mouse-frontal.jpg", descricao: "Vista frontal do mouse" },
      { url: "https://exemplo.com/mouse-lateral.jpg", descricao: "Vista lateral do mouse" },
    ],
  });

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipo: 'caracteristicas' | 'imagens',
    index: number,
    campo: string
  ) => {
    const novoArray = [...produto[tipo]];
    (novoArray[index] as any)[campo] = e.target.value;
    setProduto({ ...produto, [tipo]: novoArray });
  };

  const handleAddField = (tipo: 'caracteristicas' | 'imagens') => {
    const novoArray = [
      ...produto[tipo],
      tipo === 'caracteristicas' ? { nome: '', descricao: '' } : { url: '', descricao: '' },
    ];
    setProduto({ ...produto, [tipo]: novoArray });
  };

  const handleRemoveField = (tipo: 'caracteristicas' | 'imagens', index: number) => {
    if (tipo === 'caracteristicas') {
      const novoArray = produto.caracteristicas.filter((_, i) => i !== index);
      setProduto({ ...produto, caracteristicas: novoArray });
    } else {
      const novoArray = produto.imagens.filter((_, i) => i !== index);
      setProduto({ ...produto, imagens: novoArray });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do produto:', produto);
    // Aqui você pode fazer o envio para a API
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.formulario}>
        <h4>Produto</h4>

        <label>Nome</label>
        <input
          type="text"
          value={produto.nome}
          onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
          required
        />

        <label>Valor</label>
        <input
          type="number"
          value={produto.valor}
          onChange={(e) => setProduto({ ...produto, valor: +e.target.value })}
          required
        />

        <label>Quantidade Disponível</label>
        <input
          type="number"
          value={produto.quantidadeDisponivel}
          onChange={(e) => setProduto({ ...produto, quantidadeDisponivel: +e.target.value })}
          required
        />

        <label>Descrição</label>
        <textarea
          value={produto.descricao}
          onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
          required
        />

        <label>Categoria</label>
        <input
          type="text"
          value={produto.categoria}
          onChange={(e) => setProduto({ ...produto, categoria: e.target.value })}
          required
        />

        <label>Características</label>
        {produto.caracteristicas.map((caract, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Nome da característica"
              value={caract.nome}
              onChange={(e) => handleArrayChange(e, 'caracteristicas', index, 'nome')}
              required
            />
            <input
              type="text"
              placeholder="Descrição"
              value={caract.descricao}
              onChange={(e) => handleArrayChange(e, 'caracteristicas', index, 'descricao')}
              required
            />
            <button type="button" onClick={() => handleRemoveField('caracteristicas', index)}>
              Remover
            </button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddField('caracteristicas')}>
          Adicionar Característica
        </button>

        <label>Imagens</label>
        {produto.imagens.map((img, index) => (
          <div key={index}>
            <input
              type="url"
              placeholder="URL da imagem"
              value={img.url}
              onChange={(e) => handleArrayChange(e, 'imagens', index, 'url')}
              required
            />
            <input
              type="text"
              placeholder="Descrição da imagem"
              value={img.descricao}
              onChange={(e) => handleArrayChange(e, 'imagens', index, 'descricao')}
              required
            />
            <button type="button" onClick={() => handleRemoveField('imagens', index)}>
              Remover
            </button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddField('imagens')}>
          Adicionar Imagem
        </button>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Produto;
