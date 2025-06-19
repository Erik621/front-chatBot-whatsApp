import React from "react";
import "./ScrollVertical.css";
//import "./style.css"; // Importa o CSS do .frame
import hamburge from "../../assets/hamburge.svg";

interface Item {
  nome: string;
  descricao: string;
  preco: string;
  categoria: string; // ADICIONADO: necessário para o filtro
}

interface ScrollVerticalProps {
  itens: Item[];
  categoriaSelecionada: string;
}

export const ScrollVertical: React.FC<ScrollVerticalProps> = ({ itens, categoriaSelecionada }) => {
  // Filtra os itens com base na categoria selecionada
  const itensFiltrados = itens.filter(item => item.categoria === categoriaSelecionada);

  return (
    <div className="scroll-vertical">
      {itensFiltrados.map((item, index) => (
        <div key={index} className="scroll-item">
          <div className="framee">
            <img
              className="front-view"
              alt="Front view"
              src={hamburge}
            />
            <div className="text-wrapperr">{item.nome}</div>
            <p className="div">{item.descricao}</p>
            <div className="text-wrapperr-2">{item.preco}</div>
          </div>
        </div>
      ))}
    </div>
  );
};













/* interface ScrollVerticalProps {
  itens: string[];
}

export const ScrollVertical: React.FC<ScrollVerticalProps> = ({ itens }) => {
  return (
    <div className="scroll-vertical">
      {itens.map((item, index) => (
        <div key={index} className="scroll-item">
          {item}
        </div>
      ))}
    </div>
  );
};
 */