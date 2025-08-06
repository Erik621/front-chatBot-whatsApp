import React, { useState } from "react";
import "./PedidosModal.css";
import { type Pedido } from "./FrameModal";
import FinalizarPedidoModal from "./FinalizarPedidoModal";
import { baseURL } from "../../../serves/userApi/categoriaApi";

interface PedidosModalProps {
  pedidos: Pedido[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string, forcarRemocao?: boolean) => void;
  onFechar: () => void;
  onFinalizarPedido: () => void;
  onLimparCarrinho: () => void;
}

const PedidosModal: React.FC<PedidosModalProps> = ({
  pedidos,
  onIncrement,
  onDecrement,
  onFechar,
  onLimparCarrinho,
}) => {
  const [confirmarRemocaoId, setConfirmarRemocaoId] = useState<string | null>(null);
  const [mostrarFinalizarModal, setMostrarFinalizarModal] = useState(false);
  const [observacao, setObservacoes] = useState("");
  const [mensagemAviso, setMensagemAviso] = useState<string | null>(null);

  const calcularTotalPedido = (pedido: Pedido) => {
    const adicionaisTotal =
      pedido.adicionais?.reduce((soma, item) => {
        const valor = Number(item.valorIngrediente);
        const quantidade = Number(item.quantMax);
        return soma + valor * quantidade;
      }, 0) ?? 0;

    return (Number(pedido.preco) + adicionaisTotal) * Number(pedido.quantidade);
  };

  const totalGeral = pedidos.reduce(
    (acc, pedido) => acc + calcularTotalPedido(pedido),
    0
  );

  const handleClickDecrement = (pedido: Pedido) => {
    if (pedido.quantidade === 1) {
      setConfirmarRemocaoId(pedido.uuid);
    } else {
      onDecrement(pedido.uuid);
    }
  };

  const confirmarRemocao = () => {
    if (confirmarRemocaoId) {
      onDecrement(confirmarRemocaoId, true);
      setConfirmarRemocaoId(null);
    }
  };

  const cancelarRemocao = () => {
    setConfirmarRemocaoId(null);
  };

  return (
    <div className="backdrop" onClick={onFechar}>
      <div className="pedidos-modal" onClick={(e) => e.stopPropagation()}>
        <div className="titulo">Seus Pedidos</div>

        <div className="lista-pedidoss">
          {pedidos.length === 0 ? (
            <div className="mensagem-sem-pedidos">
              Adicione um item ao carrinho para finalizar o pedido.
            </div>
          ) : (
            pedidos.map((pedido) => (
              <div className="pedido-item" key={pedido.uuid}>
                {pedido.imagem ? (
                  <img
                    className="img-lanche"
                    src={`${baseURL}${pedido.imagem}`}
                    alt={pedido.nome}
                  />
                ) : (
                  <div className="img-lanche placeholder">Sem imagem</div>
                )}
                <div className="info-pedido">
                  <span className="nome-lanche">{pedido.nome}</span>
                  {pedido.adicionais && pedido.adicionais.length > 0 && (
                    <ul className="adicionais-lista">
                      {pedido.adicionais.map((a, idx) => (
                        <li key={idx} className="adicional-item">
                          - {a.nome} x{a.quantMax} (
                          {a.valorIngrediente.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                          )
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="botoes-quantidade">
                  <button onClick={() => handleClickDecrement(pedido)}>-</button>
                  <span>{pedido.quantidade}</span>
                  <button onClick={() => onIncrement(pedido.uuid)}>+</button>
                </div>

                <span className="preco">
                  {calcularTotalPedido(pedido).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            ))
          )}
        </div>
        <div className="total-final">
          <span>TOTAL:</span>
          <span className="valor-total">
            {totalGeral.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <textarea
          className="input"
          placeholder="Alguma observação sobre o pedido?"
          value={observacao}
          onChange={(e) => setObservacoes(e.target.value)}
        />

        <div className="botoes-acoes">
          <button
            className="botao-laranja"
            onClick={() => {
              if (pedidos.length === 0) {
                setMensagemAviso("Adicione um item ao carrinho para finalizar o pedido.");
                return; // não abre o modal de finalizar
              }
              setMostrarFinalizarModal(true);
            }}
          >
            Finalizar pedido
          </button>
          <button className="botao-branco" onClick={onFechar}>
            Continuar comprando
          </button>
        </div>

        {/* Modal de aviso */}
        {mensagemAviso && (
          <div className="aviso-modal-backdrop" onClick={() => setMensagemAviso(null)}>
            <div className="aviso-modal" onClick={(e) => e.stopPropagation()}>
              <p>{mensagemAviso}</p>
              <button className="botao-laranja" onClick={() => setMensagemAviso(null)}>
                Ok
              </button>
            </div>
          </div>
        )}
      </div>

      {confirmarRemocaoId && (
        <div className="confirmar-modal" onClick={cancelarRemocao}>
          <div className="confirmar-conteudo" onClick={(e) => e.stopPropagation()}>
            <p>Deseja realmente remover este item do pedido?</p>
            <div className="botoes-confirmacao">
              <button className="botao-laranja" onClick={confirmarRemocao}>Sim</button>
              <button className="botao-branco" onClick={cancelarRemocao}>Não</button>
            </div>
          </div>
        </div>
      )}

      {mostrarFinalizarModal && (
        <div className="backdrop" onClick={() => setMostrarFinalizarModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <FinalizarPedidoModal
              pedidos={pedidos}
              observacao={observacao}
              onClose={() => setMostrarFinalizarModal(false)}
              onPedidoFinalizado={() => {
                setMostrarFinalizarModal(false);
                onLimparCarrinho();
                onFechar();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PedidosModal;
