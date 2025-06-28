import React from "react";
import "./ScrollVertical.css";
//import "./style.css"; // Importa o CSS do .frame


export interface Item {
  id: number;
  categoria: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
}

interface ScrollVerticalProps {
  itens: Item[];
  categoriaSelecionada: string;
  onItemClick: (item: Item) => void; // nova prop
}

export const ScrollVertical: React.FC<ScrollVerticalProps> = ({
  itens,
  categoriaSelecionada,
  onItemClick,
}) => {
  // Filtra os itens com base na categoria selecionada
  const itensFiltrados = itens.filter(item => item.categoria === categoriaSelecionada);

  return (
    <div className="scroll-vertical">
      {itensFiltrados.map((item, index) => (
        <div key={index} className="scroll-item" onClick={() => onItemClick(item)}>
          <div className="framee">
            <img
              className="front-view"
              alt="Front view"
              src={item.imagem}
            />
            <div className="text-wrapperr">{item.nome}</div>
            <p className="div">{item.descricao}</p>
            <div className="text-wrapperr-2">{item.preco.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}</div>
          </div>
        </div>
      ))}
    </div>
  );
};













