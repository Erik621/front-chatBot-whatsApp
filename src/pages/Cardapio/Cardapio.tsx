import React, { type JSX, useState } from "react";
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


  const itens = [
    {
      id: 1,
      categoria: "Bebidas",
      nome: "X TUDO",
      descricao: "Hambúrguer, bacon, ovo, cheddar, tomate.",
      preco: "R$ 28,00",
    },
    {
      id: 2,
      categoria: "Doces",
      nome: "X SALADA",
      descricao: "Hambúrguer, alface, tomate, maionese.",
      preco: "R$ 22,00",
    },
    {
      id: 3,
      categoria: "Lanches",
      nome: "X BACON",
      descricao: "Hambúrguer, bacon crocante, cheddar.",
      preco: "R$ 25,00",
    },
    {
      id: 4,
      categoria: "Bebidas",
      nome: "X TUDO",
      descricao: "Hambúrguer, bacon, ovo, cheddar, tomate.",
      preco: "R$ 28,00",
    },
    {
      id: 5,
      categoria: "Bebidas",
      nome: "X TUDO",
      descricao: "Hambúrguer, bacon, ovo, cheddar, tomate.",
      preco: "R$ 28,00",
    },
    {
      id: 6,
      categoria: "Bebidas",
      nome: "X TUDO",
      descricao: "Hambúrguer, bacon, ovo, cheddar, tomate.",
      preco: "R$ 28,00",
    },
    {
      id: 7,
      categoria: "Bebidas",
      nome: "X TUDO",
      descricao: "Hambúrguer, bacon, ovo, cheddar, tomate.",
      preco: "R$ 28,00",
    },
    {
      id: 8,
      categoria: "Bebidas",
      nome: "X TUDO",
      descricao: "Hambúrguer, bacon, ovo, cheddar, tomate.",
      preco: "R$ 28,00",
    },
    {
      id: 9,
      categoria: "Bebidas",
      nome: "X TUDO",
      descricao: "Hambúrguer, bacon, ovo, cheddar, tomate.",
      preco: "R$ 28,00",
    },
    {
      id: 10,
      categoria: "Bebidas",
      nome: "X TUDO",
      descricao: "Hambúrguer, bacon, ovo, cheddar, tomate.",
      preco: "R$ 28,00",
    },
    {
      id: 11,
      categoria: "Bebidas",
      nome: "X TUDO",
      descricao: "Hambúrguer, bacon, ovo, cheddar, tomate.",
      preco: "R$ 28,00",
    },
    {
      id: 12,
      categoria: "Bebidas",
      nome: "X TUDO",
      descricao: "Hambúrguer, bacon, ovo, cheddar, tomate.",
      preco: "R$ 28,00",
    },
    {
      id: 13,
      categoria: "Bebidas",
      nome: "X TUDO",
      descricao: "Hambúrguer, bacon, ovo, cheddar, tomate.",
      preco: "R$ 28,00",
    },
    {
      id: 14,
      categoria: "Bebidas",
      nome: "X TUDO",
      descricao: "Hambúrguer, bacon, ovo, cheddar, tomate.",
      preco: "R$ 28,00",
    },

  ];

  return (
    <div className="tela-inicial">
      <div className="div-3">
        <div className="top_bar">
          <div className="text_up">Caminho de Casa</div>
          <Logo className="logo-instance" />
        </div>

        <div className="text_special_category">Promoções:</div>

        <ScrollHorizontal />
        <div className="conteudo">
          <Categorias
            itens={itens}
            onSelecionarCategoria={setCategoriaSelecionada}
            selecionado={categoriaSelecionada}
          />
          <div className="scroll-area">
            <ScrollVertical
              itens={itens}
              categoriaSelecionada={categoriaSelecionada}
            />
          </div>
        </div>
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
