// FrameModal.tsx
import { useState, type JSX } from "react";
import "./FrameModal.css";
import { type Item } from "../ScrollVertical";

interface FrameModalProps {
  item: Item;
  onAdicionarPedido: (item: Item) => void;
  onFechar: () => void; // fechar o modal
  onFinalizarPedido: () => void; // ir para PedidosModal
}

export const FrameModal = ({ item, onAdicionarPedido, onFechar, onFinalizarPedido }: FrameModalProps): JSX.Element => {
  const [mensagemSucesso, setMensagemSucesso] = useState(false);



  return (
    <div className="frame-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-topo">
        <img className="imagem-lanche" alt="Imagem lanche" src={item.imagem} />
        <div className="overlap">
          <div className="nome-lanche">{item.nome}</div>
          <p className="descricao">{item.descricao}</p>
        </div>
      </div>

      <div className="personalizar-titulo">PERSONALIZAR:</div>

      <div className="personalizar-lista">
        {[
          { label: "BACON", max: 4 },
          { label: "CHEDDAR", max: 3 },
          { label: "TOMATE", max: 2 },
          { label: "OVO", max: 1 },
          { label: "HAMBURGUER", max: 1 },
        ].map((item, index) => (
          <div className="personalizar-item" key={index}>
            <span className="max-unidades">{item.max}</span>
            <span className="item-label">{item.label}</span>
            <div className="botoes">
              <button>-</button>
              <span>0</span>
              <button>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="total">
        <span>Total:</span>
        <span className="preco">{item.preco.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}</span>
      </div>
      {mensagemSucesso && (
        <div className="mensagem-sucesso">Pedido adicionado com sucesso!</div>
      )}

      <div className="botoes-acao">
        <button
          className="botao-laranja"
          onClick={() => {
            onAdicionarPedido(item);
            setMensagemSucesso(true);
            setTimeout(() => setMensagemSucesso(false), 2000); // esconde após 2 segundos
          }}

        >
          Adicionar pedido
        </button>
        <button
          className="botao-laranja"
          onClick={onFinalizarPedido}
        >
          Finalizar pedido
        </button>
        <button
          className="botao-laranja"
          onClick={onFechar}
        >Continuar comprando</button>
      </div>
    </div>
  );
};

export default FrameModal;
