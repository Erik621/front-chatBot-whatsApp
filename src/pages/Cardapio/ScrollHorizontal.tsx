import React from "react";
import "./ScrollHorizontal.css";
import image from "../../assets/caldo.svg";

interface Item {
  id: number,
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
}

interface ScrollHorizontalProps {
  onItemClick: (item: Item) => void;
}

export const ScrollHorizontal: React.FC<ScrollHorizontalProps> = ({ onItemClick }) => {
  const itensPromocionais: Item[] = Array.from({ length: 10 }, (_, i) => ({
    id: 1,
    nome: `Caldo de Frango ${i + 1}`,
    descricao: "Delicioso caldo de frango caseiro.",
    preco: 10.5,
    categoria: "Promoções",
    imagem: image,
  }));

  return (
    <div className="cards-promoes-wrapper">
      {itensPromocionais.map((item, i) => (
        <div className="cards-promoes" key={i} onClick={() => onItemClick(item)}>
          <img className="lentil-soup-bowl" alt="Lentil soup bowl" src={item.imagem} />
          <div className="text-wrapper">{item.nome}</div>
          <div className="div">{item.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}</div>
        </div>
      ))}
    </div>
  );
};
