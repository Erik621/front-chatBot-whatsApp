import React, { JSX,useState } from "react";
import { BadgeNumeroWrapper } from "./BadgeNumeroWrapper";
import { Categorias } from "./Categorias";
import { Logo } from "./Logo";
import { ScrollHorizontal } from "./ScrollHorizontal";
import { ScrollVertical } from "./ScrollVertical";
import image from "./image.svg";
import "./style.css";
//import vector from "./vector.svg"; 

export const TelaInicial = (): JSX.Element => {


  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Bebidas");

  const itensPorCategoria: Record<string, string[]> = {
    Bebidas: ["Coca-Cola", "Suco de Laranja", "Água", "Chá Verde"],
    Doces: ["Brigadeiro", "Bolo", "Bala", "Chocolate"],
    Lanches: ["Hambúrguer", "Pastel", "Pizza", "Coxinha"],
    Higiene: ["Sabonete", "Shampoo", "Escova de dentes", "Desodorante"],
    Limpeza: ["Detergente", "Desinfetante", "Álcool", "Esponja"],
    Caldos: ["Caldo de frango", "Caldo de frango", "Caldo de frango", "Caldo de frango"],
  }; 

  return (
    <div className="tela-inicial">
      <div className="div-3">
        <div className="top_bar">
          <div className="text_up">Caminho de Casa</div>
          <Logo className="logo-instance" />
        </div>

        <div className="text_special_category">Promoções:</div>

        <ScrollHorizontal />
         <Categorias
                categorias={Object.keys(itensPorCategoria)}
                onSelecionarCategoria={setCategoriaSelecionada}
                selecionado={categoriaSelecionada}
              />
              <ScrollVertical itens={itensPorCategoria[categoriaSelecionada]} />
        <div className="menu-inferior">
          <div className="icones">
            <div className="group-2">
              <div className="rectangle-3" />

              <div className="rectangle-4" />

              <div className="rectangle-5" />
            </div>

            <img className="vector" alt="Vector" src={image} />

            <img className="vector-2" alt="Vector" src={image} />

            <BadgeNumeroWrapper className="badge-numero-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaInicial
