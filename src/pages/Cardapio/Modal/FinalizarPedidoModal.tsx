import React, { useState } from "react";
import "./FinalizarPedidoModal.css";
import { type Pedido } from "./FrameModal";
import { criarPedido } from "../../../serves/userApi/categoriaApi";

interface FinalizarPedidoModalProps {
  pedidos: Pedido[];
  observacao: string; // <- adicionada aqui
  onClose: () => void;
  onPedidoFinalizado: () => void;
}

const FinalizarPedidoModal: React.FC<FinalizarPedidoModalProps> = ({
  pedidos,
  observacao,
  onClose,
  onPedidoFinalizado,
}) => {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");

  const handleFinalizar = async () => {
    if (!nome || !endereco || !telefone || !formaPagamento) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const pedidoPayload = {
        cliente: { nome, endereco, telefone },
        formaPagamento,
        observacao,  // <- incluímos aqui as observações
        itens: pedidos.map((pedido) => ({
          nomeProduto: pedido.nome,
          imagem: pedido.imagem,
          precoUnitario: Number(pedido.preco),
          quantidade: pedido.quantidade,
          adicionais: pedido.adicionais?.map((a) => ({
            nome: a.nome,
            valor: Number(a.valorIngrediente),
            quantidade: a.quantMax,
          })) ?? [],
        })),
      };

      await criarPedido(pedidoPayload);

      alert("Pedido realizado com sucesso!");
      onPedidoFinalizado();
      onClose();
    } catch (error: any) {
      console.error("Erro ao enviar pedido:", error);

      const mensagemBackend =
        error?.response?.data?.message ||
        error?.message ||
        null;

      if (
        mensagemBackend &&
        mensagemBackend.toLowerCase().includes('fechado')
      ) {
        alert(
          `❌ Estamos fechados no momento.\n` +
          `🕒 Funcionamos de terça a domingo, das 14h às 22h.\n` +
          `📲 Você pode conferir nosso cardápio enquanto isso.`
        );
      } else {
        alert("❌ Erro ao enviar pedido. Tente novamente.");
      }
    }

  };

  return (
    <div className="finalizar-modal" onClick={(e) => e.stopPropagation()}>
      <div className="titulo">Finalize seu Pedido</div>
      <input
        className="input"
        type="text"
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />

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

      <button className="botao-finalizar" onClick={handleFinalizar}>
        Finalizar Pedido
      </button>
    </div>
  );
};

export default FinalizarPedidoModal;
