import { useState, type JSX } from "react";
import { v4 as uuidv4 } from "uuid";
import "./FrameModal.css";
import { type Item } from "../ScrollVertical";
import { baseURL } from "../../../serves/userApi/categoriaApi";

interface IngredienteDetalhe {
  nome: string;
  valorIngrediente: number;
  quantMax: number;
}

export interface Pedido {
  uuid: string;
  id: number;
  nome: string;
  imagem: string;
  preco: number;
  quantidade: number;
  adicionais?: IngredienteDetalhe[];
}

interface FrameModalProps {
  item: Item;
  onAdicionarPedido: (item: Pedido) => void;
  onFeedback: (tipo: "sucesso" | "erro", mensagem: string) => void;
  onFechar: () => void;
  onFinalizarPedido: () => void;
}

export const FrameModal = ({
  item,
  onAdicionarPedido,
  onFeedback,
  onFechar,
  onFinalizarPedido,
}: FrameModalProps): JSX.Element => {
  const ingredientesDetalhados: IngredienteDetalhe[] =
    (item.itens as IngredienteDetalhe[]) ?? [];

  const [quantidades, setQuantidades] = useState<Record<string, number>>(
    Object.fromEntries(ingredientesDetalhados.map((i) => [i.nome, 0]))
  );

  const alterarQuantidade = (nome: string, delta: number, max: number) => {
    setQuantidades((prev) => {
      const nova = (prev[nome] ?? 0) + delta;
      if (nova < 0 || nova > max) return prev;
      return { ...prev, [nome]: nova };
    });
  };

  const calcularTotal = (): number => {
    const adicionais = ingredientesDetalhados.reduce((soma, ingrediente) => {
      const qtd = quantidades[ingrediente.nome] || 0;
      return soma + qtd * ingrediente.valorIngrediente;
    }, 0);
    return Number(item.preco) + adicionais;
  };

  const handleAdicionarPedido = () => {
    try {
      const adicionaisSelecionados = ingredientesDetalhados
        .filter((ing) => quantidades[ing.nome] > 0)
        .map((ing) => ({
          nome: ing.nome,
          quantMax: quantidades[ing.nome],
          valorIngrediente: ing.valorIngrediente,
        }));

      onAdicionarPedido({
        uuid: uuidv4(),
        id: item.id,
        nome: item.nome,
        imagem: item.imagem,
        preco: item.preco,
        quantidade: 1,
        adicionais: adicionaisSelecionados,
      });

      // Mostra feedback de sucesso
      onFeedback("sucesso", "Pedido adicionado com sucesso!");
    } catch {
      // Mostra feedback de erro
      onFeedback("erro", "Falha ao adicionar pedido. Tente novamente.");
    }
  };

  return (
    <div className="frame-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-topo">
        {item.imagem ? (
          <img
            className="imagem-lanche"
            src={`${baseURL}${item.imagem}`}
            alt={item.nome}
          />
        ) : (
          <div className="imagem-lanche">Sem imagem</div>
        )}

        <div className="overlap">
          <div className="nome-lanche">{item.nome}</div>
          <p className="descricao">{item.descricao}</p>
        </div>
      </div>

      <div className="personalizar-titulo">PERSONALIZAR:</div>

      <div className="personalizar-lista">
        {ingredientesDetalhados.map((ing, index) => (
          <div className="personalizar-item" key={index}>
            <span className="max-unidades">Máx: {ing.quantMax}</span>
            <span className="item-label">
              {ing.nome} -{" "}
              {ing.valorIngrediente.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <div className="botoes">
              <button onClick={() => alterarQuantidade(ing.nome, -1, ing.quantMax)}>
                -
              </button>
              <span>{quantidades[ing.nome] ?? 0}</span>
              <button onClick={() => alterarQuantidade(ing.nome, +1, ing.quantMax)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="total">
        <span>Total:</span>
        <span className="preco">
          {calcularTotal().toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>

      <div className="botoes-acao">
        <button className="botao-laranja" onClick={handleAdicionarPedido}>
          Adicionar pedido
        </button>
        <button className="botao-laranja" onClick={onFinalizarPedido}>
          Ir para Carrinho
        </button>
        <button className="botao-laranja" onClick={onFechar}>
          Continuar comprando
        </button>
      </div>
    </div>
  );
};

export default FrameModal;
