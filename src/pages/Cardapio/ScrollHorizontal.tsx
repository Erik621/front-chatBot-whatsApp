import React from "react";
import "./ScrollHorizontal.css";
import {baseURL} from "../../serves/userApi/categoriaApi";

export interface Item {
  id: number;
  nome: string;
  descricao: string; // já vem como os ingredientes concatenados
  preco: number;
  categoria: string;
  imagem: string; // deve conter o caminho relativo tipo "/imagens/arquivo.jpg"
}

interface ScrollHorizontalProps {
  itens: Item[];
  onItemClick: (item: Item) => void;
}

/* const BASE_URL = "http://localhost:3000"; */ // ajuste se seu backend rodar em outra url

export const ScrollHorizontal: React.FC<ScrollHorizontalProps> = ({ itens, onItemClick }) => {
  return (
    <div className="cards-promoes-wrapper">
      {itens.map((item) => (
        <div className="cards-promoes" key={item.id} onClick={() => onItemClick(item)}>
          {item.imagem ? (
            <img
              className="lentil-soup-bowl"
              src={`${baseURL}${item.imagem}`}
              alt={item.nome}
            />
          ) : (
            <div className="lentil-soup-bowl">Sem imagem</div>
          )}
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
