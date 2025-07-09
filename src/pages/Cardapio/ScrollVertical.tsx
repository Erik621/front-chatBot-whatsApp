// src/components/ScrollVertical.tsx
import React from "react";
import "./ScrollVertical.css";
import "./style.css";
export interface Item {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
  itens?: {
    nome: string;
    valorIngrediente: number;
    quantMax: number;
  }[];
}

interface ScrollVerticalProps {
  itens: Item[];
  categoriaSelecionada: string;
  onItemClick: (item: Item) => void;
}

export const ScrollVertical: React.FC<ScrollVerticalProps> = ({
  itens,
  categoriaSelecionada,
  onItemClick,
}) => {
  const itensFiltrados = itens.filter(
    (item) => item.categoria.toLowerCase() === categoriaSelecionada.toLowerCase()
  );

  return (
    <div className="scroll-vertical">
      {itensFiltrados.map((item) => (
        <div key={item.id} className="scroll-item" onClick={() => onItemClick(item)}>
          <div className="framee">
            <img className="front-view" alt={item.nome} src={item.imagem} />
            <div className="text-wrapperr">{item.nome}</div>
            <p className="div">{item.descricao}</p>
            <div className="text-wrapperr-2">
              {Number(item.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
