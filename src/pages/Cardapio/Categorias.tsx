import React from "react";
import "./Categorias.css";

interface CategoriasProps {
  categorias: string[];
  selecionado: string;
  onSelecionarCategoria: (categoria: string) => void;
}

export const Categorias: React.FC<CategoriasProps> = ({
  categorias,
  selecionado,
  onSelecionarCategoria,
}) => {
  // Remove "Promoções" da lista de categorias
  const categoriasFiltradas = categorias.filter(
    (cat) => cat.toLowerCase() !== "promoções"
  );

  return (
    <div className="categorias">
      {categoriasFiltradas.map((cat, index) =>
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
