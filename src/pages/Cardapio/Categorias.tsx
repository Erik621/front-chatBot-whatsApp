/* import React from "react";
import "./Categorias.css";

export const Categorias = () => {
  const categorias = ["Bebidas", "Doces", "Lanches", "Higiene", "Limpeza"];
  return (
    <div className="categorias">
      {categorias.map((cat, index) => (
        <div key={index} className="categoria-item">
          {cat}
        </div>
      ))}
    </div>
  );
};
 */
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
  return (
    <div className="categorias">
      {categorias.map((cat, index) =>
        cat === selecionado ? (
          <div key={index} className="frame" onClick={() => onSelecionarCategoria(cat)}>
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
