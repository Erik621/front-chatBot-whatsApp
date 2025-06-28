// FinalizarPedidoModal.tsx
import React, { useState } from "react";
import "./FinalizarPedidoModal.css";

interface FinalizarPedidoModalProps {
  onClose: () => void;
}

const FinalizarPedidoModal: React.FC<FinalizarPedidoModalProps> = ({ onClose }) => {
  const [formaPagamento, setFormaPagamento] = useState<string>("");

  return (
    <div className="finalizar-modal" onClick={(e) => e.stopPropagation()}>
      <div className="titulo">Finalize seu Pedido</div>
      <input className="input" type="text" placeholder="Nome completo" />
      <input className="input" type="text" placeholder="Endereço" />
      <input className="input" type="text" placeholder="Telefone: (00) 9 9912-3456" />

      <div className="forma-pagamento-label">Forma de pagamento:</div>
      <div className="forma-pagamento-botoes">
        {['Pix', 'Cartão', 'Dinheiro'].map((forma) => (
          <button
            key={forma}
            className={`botao-pagamento ${formaPagamento === forma ? 'selecionado' : ''}`}
            onClick={() => setFormaPagamento(forma)}
          >
            {forma}
          </button>
        ))}
      </div>

      <button className="botao-finalizar" onClick={onClose}>
        Finalizar Pedido
      </button>
    </div>
  );
};

export default FinalizarPedidoModal;
