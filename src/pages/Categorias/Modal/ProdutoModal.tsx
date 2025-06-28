import React, { useState, useEffect } from "react";
import "./ProdutoModal.css";

export interface Produto {
  nome: string;
  descricao: string;
  imagem: string;
  valor: number;
}

interface ProdutoModalProps {
  visivel: boolean;
  onFechar: () => void;
  onSalvar: (produto: Produto) => void;
  produtoEdicao?: Produto | null;
}

const ProdutoModal = ({ visivel, onFechar, onSalvar, produtoEdicao }: ProdutoModalProps) => {
  const [form, setForm] = useState<Produto>({
    nome: "",
    descricao: "",
    imagem: "",
    valor: 0
  });

  useEffect(() => {
    if (produtoEdicao) setForm(produtoEdicao);
  }, [produtoEdicao]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSalvar = () => {
    onSalvar(form);
    onFechar();
  };

  if (!visivel) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-conteudo">
        <h2>{produtoEdicao ? "Editar Produto" : "Novo Produto"}</h2>

        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome do produto" />
        <input name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" />
        <input name="imagem" value={form.imagem} onChange={handleChange} placeholder="URL da Imagem" />
        <input name="valor" value={form.valor} onChange={handleChange} placeholder="Valor" type="number" />

        <div className="botoes">
          <button onClick={onFechar}>Cancelar</button>
          <button onClick={handleSalvar}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default ProdutoModal;
