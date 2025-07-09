// src/components/ScrollHorizontal.tsx
import React from "react";
import "./ScrollHorizontal.css";

export interface Item {
  id: number;
  nome: string;
  descricao: string; // já vem como os ingredientes concatenados
  preco: number;
  categoria: string;
  imagem: string;
}

interface ScrollHorizontalProps {
  itens: Item[];
  onItemClick: (item: Item) => void;
}

export const ScrollHorizontal: React.FC<ScrollHorizontalProps> = ({ itens, onItemClick }) => {
  return (
    <div className="cards-promoes-wrapper">
      {itens.map((item) => (
        <div className="cards-promoes" key={item.id} onClick={() => onItemClick(item)}>
          <img className="lentil-soup-bowl" alt={item.nome} src={item.imagem} />
          <div className="text-wrapper">{item.nome}</div>
          <div className="preco-produto">
            {Number(item.preco).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
