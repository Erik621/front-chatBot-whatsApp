import React, { type JSX, useState } from "react";
import { BadgeNumeroWrapper } from "./BadgeNumeroWrapper";
import { Categorias } from "./Categorias";
import { Logo } from "./Logo";
import { ScrollHorizontal } from "./ScrollHorizontal";
import { ScrollVertical, type Item } from "./ScrollVertical";
import botao from "../../assets/botao.svg";
import carrinho from "../../assets/carrinho.svg";
import casa from "../../assets/casa.svg";
import "./style.css";
import FrameModal from "./Modal/FrameModal";
import PedidosModal from "./Modal/PedidosModal"; // IMPORTADO
import hamburge from "../../assets/hamburge.svg"
import FinalizarPedidoModal from "./Modal/FinalizarPedidoModal"; // NOVO


export const TelaInicial = (): JSX.Element => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Bebidas");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<Item | null>(null);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false); // NOVO
  const [pedidos, setPedidos] = useState<any[]>([]); // NOVO
  const [mostrarFinalizarModal, setMostrarFinalizarModal] = useState(false);


  const adicionarAoPedido = (item: Item) => {
    setPedidos((prev) => [...prev, item]);
    setMostrarModal(false); // Fecha o modal
  };


  const abrirModal = (item: Item) => {
    setItemSelecionado(item);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setItemSelecionado(null);
  };

  const handleCarrinhoClick = () => {
    setMostrarCarrinho(true);
  };

  const fecharCarrinho = () => {
    setMostrarCarrinho(false);
  };

  const abrirFinalizarPedido = () => {
    setMostrarFinalizarModal(true);
  };


  const incrementarPedido = (id: number) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p))
    );
  };

  const decrementarPedido = (id: number) => {
    setPedidos((prev) =>
      prev.map((p) =>
        p.id === id && p.quantidade > 1
          ? { ...p, quantidade: p.quantidade - 1 }
          : p
      )
    );
  };

  const itens = [
    {
      id: 1,
      categoria: "Bebidas",
      nome: "X TUDO",
      descricao: "Hambúrguer, bacon, ovo, cheddar, tomate.",
      preco: 28.5,
      imagem: hamburge,
    },
    {
      id: 2,
      categoria: "Doces",
      nome: "X SALADA",
      descricao: "Hambúrguer, alface, tomate, maionese.",
      preco: 27.5,
      imagem: hamburge,
    },
    {
      id: 3,
      categoria: "Lanches",
      nome: "X BACON",
      descricao: "Hambúrguer, bacon crocante, cheddar.",
      preco: 28.5,
      imagem: hamburge,
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

        <ScrollHorizontal onItemClick={abrirModal} />

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
              onItemClick={abrirModal}
            />
            {mostrarModal && itemSelecionado && (
              <div className="backdrop" onClick={fecharModal}>
                <FrameModal

                  item={itemSelecionado}
                  onAdicionarPedido={adicionarAoPedido}
                  onFechar={fecharModal}
                  onFinalizarPedido={() => {
                    setMostrarModal(false);
                    setMostrarCarrinho(true);
                  }}/*  */
                />
              </div>
            )}
            {mostrarFinalizarModal && (
              <div className="backdrop" onClick={() => setMostrarFinalizarModal(false)}>
                <FinalizarPedidoModal onClose={() => setMostrarFinalizarModal(false)} />
              </div>
            )}

            {mostrarCarrinho && (
              <div className="backdrop" onClick={fecharCarrinho}>
                <PedidosModal
                  pedidos={pedidos}
                  onIncrement={incrementarPedido}
                  onDecrement={decrementarPedido}
                  onFechar={fecharCarrinho}
                  onFinalizarPedido={abrirFinalizarPedido}
                />
              </div>
            )}
          </div>
        </div>

        <div className="menu-inferior">
          <div className="icones">
            <img className="vector" alt="Vector" src={botao} />
            <img className="vector" alt="Vector" src={casa} />
            <img
              className="vector-2"
              alt="Carrinho"
              src={carrinho}
              onClick={handleCarrinhoClick}
              style={{ cursor: "pointer" }} // clique no ícone do carrinho
            />
            <BadgeNumeroWrapper className="badge-numero-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaInicial;
