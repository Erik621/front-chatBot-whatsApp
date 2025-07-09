// src/pages/TelaInicial.tsx
import React, { useEffect, useState, type JSX } from "react";
import { BadgeNumeroWrapper } from "./BadgeNumeroWrapper";
import { Categorias } from "./Categorias";
import { Logo } from "./Logo";
import { ScrollHorizontal } from "./ScrollHorizontal";
import { ScrollVertical, type Item } from "./ScrollVertical";
import botao from "../../assets/botao.svg";
import carrinho from "../../assets/carrinho.svg";
import casa from "../../assets/casa.svg";
import "./style.css";
import FrameModal, { type Pedido } from "./Modal/FrameModal";
import PedidosModal from "./Modal/PedidosModal";
import FinalizarPedidoModal from "./Modal/FinalizarPedidoModal";
import { getCategorias, type Categoria, type Produto } from "../../serves/userApi/categoriaApi";

export const TelaInicial = (): JSX.Element => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<Item | null>(null);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [mostrarFinalizarModal, setMostrarFinalizarModal] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const dados = await getCategorias();
        setCategorias(dados);
        if (dados.length > 0) {
          setCategoriaSelecionada(dados[0].nome);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategorias();
  }, []);

  const abrirModal = (item: Item) => {
    setItemSelecionado(item);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setItemSelecionado(null);
  };

  const handleCarrinhoClick = () => setMostrarCarrinho(true);
  const fecharCarrinho = () => setMostrarCarrinho(false);
  const abrirFinalizarPedido = () => {
    setMostrarCarrinho(false);
    setMostrarFinalizarModal(true);
  };

  const adicionarAoPedido = (pedido: Pedido) => {
    setPedidos((prev) => [...prev, pedido]);
    setMostrarModal(false);
  };

  const incrementarPedido = (uuid: string) => {
    setPedidos((prev) =>
      prev.map((p) =>
        p.uuid === uuid ? { ...p, quantidade: p.quantidade + 1 } : p
      )
    );
  };

  const decrementarPedido = (uuid: string, forcarRemocao = false) => {
    setPedidos((prev) =>
      prev
        .map((p) => {
          if (p.uuid === uuid) {
            if (p.quantidade === 1 && forcarRemocao) {
              return null; // Remove o item
            } else if (p.quantidade > 1) {
              return { ...p, quantidade: p.quantidade - 1 };
            }
          }
          return p;
        })
        .filter(Boolean) as Pedido[]
    );
  };

  const converterProdutoParaItem = (produto: Produto, categoria: string): Item => {
    const descricaoIngredientes = produto.ingredientes?.length
      ? produto.ingredientes.map((i) => i.nome).join(", ")
      : "";

    return {
      id: produto.id!,
      nome: produto.nome,
      descricao: descricaoIngredientes,
      preco: produto.valor,
      categoria,
      imagem: produto.imagem,
      itens: produto.ingredientes,
    };
  };

  const produtosPromocao: Item[] =
    categorias
      .find((cat) => cat.nome.toLowerCase() === "promoções")
      ?.produtos.map((p) => converterProdutoParaItem(p, "Promoções")) ?? [];

  const produtosFiltrados: Item[] =
    categorias
      .find((cat) => cat.nome === categoriaSelecionada)
      ?.produtos.map((p) => converterProdutoParaItem(p, categoriaSelecionada)) ?? [];

  return (
    <div className="tela-inicial">
      <div className="div-3">
        <div className="top_bar">
          <div className="text_up">Caminho de Casa</div>
          <Logo className="logo-instance" />
        </div>

        {produtosPromocao.length > 0 && (
          <>
            <div className="text_special_category">Promoções:</div>
            <ScrollHorizontal itens={produtosPromocao} onItemClick={abrirModal} />
          </>
        )}

        <div className="conteudo">
          <Categorias
            categorias={categorias.map((cat) => cat.nome)}
            onSelecionarCategoria={setCategoriaSelecionada}
            selecionado={categoriaSelecionada}
          />

          <div className="scroll-area">
            <ScrollVertical
              itens={produtosFiltrados}
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
                  }}
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
            <img className="vector" alt="Botão" src={botao} />
            <img className="vector" alt="Casa" src={casa} />
            <img
              className="vector-2"
              alt="Carrinho"
              src={carrinho}
              onClick={handleCarrinhoClick}
              style={{ cursor: "pointer" }}
            />
            <BadgeNumeroWrapper className="badge-numero-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaInicial;
