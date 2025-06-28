import React from "react";
import "./Categorias.css";

interface Item {
  id: number;
  categoria: string;
  nome: string;
  descricao: string;
  preco: number;
}

interface CategoriasProps {
  itens: Item[];
  selecionado: string;
  onSelecionarCategoria: (categoria: string) => void;
}

export const Categorias: React.FC<CategoriasProps> = ({
  itens,
  selecionado,
  onSelecionarCategoria,
}) => {
  // Extrai as categorias únicas
  const categoriasUnicas = Array.from(
    new Set(itens.map((item) => item.categoria))
  );

  return (
    <div className="categorias">
      {categoriasUnicas.map((cat, index) =>
        cat === selecionado ? (
          <div
            key={index}
            className="frame"
            onClick={() => onSelecionarCategoria(cat)}
          >
            <div className="text-wrapper">{cat}</div>
            <div className="rectangle" />
          </div>
        ) : (
          <div
            key={index}
            className="div"
            onClick={() => onSelecionarCategoria(cat)}
          >
            {cat}
          </div>
        )
      )}
    </div>
  );
};
