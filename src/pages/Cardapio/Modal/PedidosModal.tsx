import React, { useState } from "react";
import "./PedidosModal.css";
import { type Pedido } from "./FrameModal";

interface PedidosModalProps {
  pedidos: Pedido[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string, forcarRemocao?: boolean) => void;
  onFechar: () => void;
  onFinalizarPedido: () => void;
}

const PedidosModal: React.FC<PedidosModalProps> = ({
  pedidos,
  onIncrement,
  onDecrement,
  onFechar,
  onFinalizarPedido,
}) => {
  const [confirmarRemocaoId, setConfirmarRemocaoId] = useState<string | null>(null);

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
          {pedidos.map((pedido) => (
            <div className="pedido-item" key={pedido.uuid}>
              <img className="img-lanche" src={pedido.imagem} alt={pedido.nome} />
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
          ))}
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

        <div className="botoes-acoes">
          <button className="botao-laranja" onClick={onFinalizarPedido}>
            Finalizar pedido
          </button>
          <button className="botao-branco" onClick={onFechar}>
            Continuar comprando
          </button>
        </div>
      </div>

      {/* Modal de confirmação */}
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
    </div>
  );
};

export default PedidosModal;
