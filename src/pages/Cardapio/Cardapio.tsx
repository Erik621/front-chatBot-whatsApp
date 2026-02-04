import  { useEffect, useState, type JSX } from "react";
import { BadgeNumeroWrapper } from "./BadgeNumeroWrapper";
import { Categorias } from "./Categorias";
import { Logo } from "./Logo";
import { ScrollHorizontal } from "./ScrollHorizontal";
import { ScrollVertical, type Item } from "./ScrollVertical";
import carrinho from "../../assets/carrinho.svg";
import "./style.css";
import FrameModal, { type Pedido } from "./Modal/FrameModal";
import PedidosModal from "./Modal/PedidosModal";
import { getCardapio, type Categoria, type Produto } from "../../serves/userApi/categoriaApi";

export const TelaInicial = (): JSX.Element => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<Item | null>(null);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // Estado para modal de feedback
  const [feedback, setFeedback] = useState<{ tipo: "sucesso" | "erro"; mensagem: string } | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const dados = await getCardapio();
        setCategorias(dados);

        const primeiraCategoria = dados.find(cat => cat.nome.toLowerCase() !== "promoções");

        if (primeiraCategoria) {
          setCategoriaSelecionada(primeiraCategoria.nome);
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

  const adicionarAoPedido = (pedido: Pedido) => {
    setPedidos((prev) => [...prev, pedido]);
    // Não fecha o modal aqui — deixa o usuário decidir
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
              return null;
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
    return {
      id: produto.id!,
      nome: produto.nome,
      descricao: produto.descricao,
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
      .find((cat) => cat.nome.toLowerCase() === categoriaSelecionada.toLowerCase())
      ?.produtos.map((p) => converterProdutoParaItem(p, categoriaSelecionada)) ?? [];

  return (
    <div className="tela-inicial">
      <div className="div-3">
        <div className="top_bar">
          <div className="text_up">Caminho de Casa</div>
          <Logo className="logo-instance" />
        </div>

        <div className="header-spacer" />

        {produtosPromocao.length > 0 && (
          <section className="promo">
            <div className="text_special_category">Promoções:</div>
            <ScrollHorizontal itens={produtosPromocao} onItemClick={abrirModal} />
          </section>
        )}

        <div className="conteudo">
        <div className="scroll-area">

        <div className="categorias-wrapper">
          <Categorias
            categorias={categorias.map((cat) => cat.nome)}
            onSelecionarCategoria={setCategoriaSelecionada}
            selecionado={categoriaSelecionada}
          />
        </div>
          
            {categoriaSelecionada && (
              <ScrollVertical
                itens={produtosFiltrados}
                categoriaSelecionada={categoriaSelecionada}
                onItemClick={abrirModal}
              />
            )}

            {mostrarModal && itemSelecionado && (
              <div className="backdrop" onClick={fecharModal}>
                <FrameModal
                  item={itemSelecionado}
                  onAdicionarPedido={adicionarAoPedido}
                  onFeedback={(tipo, mensagem) => {
                    setFeedback({ tipo, mensagem });
                    setTimeout(() => setFeedback(null), 2000);
                  }}
                  onFechar={fecharModal}
                  onFinalizarPedido={() => {
                    setMostrarModal(false);
                    setMostrarCarrinho(true);
                  }}
                />
              </div>
            )}

            {mostrarCarrinho && (
              <div className="backdrop" onClick={fecharCarrinho}>
                <PedidosModal
                  pedidos={pedidos}
                  onIncrement={incrementarPedido}
                  onDecrement={decrementarPedido}
                  onFechar={fecharCarrinho}
                  onFinalizarPedido={() => {}}
                  onLimparCarrinho={() => setPedidos([])}
                />
              </div>
            )}
          </div>
        </div>

        <div className="menu-inferior">
          <div className="icones">
            {/* <img className="vector" alt="Botão" src={botao} />
            <img className="vector" alt="Casa" src={casa} /> */}
            <div className="icone-carrinho">
            <img
              className="vector-2"
              alt="Carrinho"
              src={carrinho}
              onClick={handleCarrinhoClick}
              style={{ cursor: "pointer" }}
            />
            <BadgeNumeroWrapper className="badge-numero-2" quantidade={pedidos.length} />
            </div>

          </div>
        </div>
      </div>

      {/* Modal de feedback */}
      {feedback && (
        <div className="overlay-modal">
          <div className={`modal-feedback ${feedback.tipo}`}>
            {feedback.mensagem}
          </div>
        </div>
      )}
    </div>
  );
};

export default TelaInicial;
