import React from "react";
import "./PedidosModal.css";


interface Pedido {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

interface PedidosModalProps {
  pedidos: Pedido[];
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onFechar: () => void;
  onFinalizarPedido: () => void; // NOVO
}

const PedidosModal: React.FC<PedidosModalProps> = ({
  pedidos,
  onIncrement,
  onDecrement,
  onFechar,
  onFinalizarPedido
}) => {
  const total = pedidos.reduce((acc, p) => acc + p.preco * p.quantidade, 0);

  return (
    <div className="pedidos-modal">
      <div className="titulo">Seus Pedidos</div>

      <div className="lista-pedidos">
        {pedidos.map((pedido) => (
          <div className="pedido-item" key={pedido.id}>
            <img className="img-lanche" src={pedido.imagem} alt={pedido.nome} />
            <span className="nome-lanche">{pedido.nome}</span>
            <div className="botoes-quantidade">
              <button onClick={() => onDecrement(pedido.id)}>-</button>
              <span>{pedido.quantidade}</span>
              <button onClick={() => onIncrement(pedido.id)}>+</button>
            </div>
            <span className="preco">{pedido.preco.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}</span>
          </div>
        ))}
      </div>

      <div className="total-final">
        <span>TOTAL:</span>
        <span className="valor-total">R$ {total.toFixed(2)}</span>
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
  );
};

export default PedidosModal;
