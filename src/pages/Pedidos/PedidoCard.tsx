// PedidoCard.tsx


interface PedidoItem {
  quantidade: number;
  nome: string;
  alteracoes?: string;
}

interface Pedido {
  id: number;
  hora: string;
  nome: string;
  telefone: string;
  endereco: string;
  itens: PedidoItem[];
  total: number;
  pagamento: string;
}

interface Props {
  pedido: Pedido;
}

const PedidoCard = ({ pedido }: Props) => {
  return (
    <div className="pedido-card">
    <div className="conteudo-e-status">
      <div className="conteudo">
        <div className="cabecalho">
          <span className="pedido-id">Pedido #{pedido.id} – {pedido.hora}</span>
          <span className="cliente-nome">
            <strong>{pedido.nome}</strong> – {pedido.telefone}
          </span>
          <div className="endereco">End: {pedido.endereco}</div>
        </div>
  
        <div className="itens">
          {pedido.itens.map((item, index) => (
            <div className="item" key={index}>
              <span>
                {item.quantidade} – {item.nome}
                {item.alteracoes && (
                  <span className="alteracoes">  Alterações: {item.alteracoes}</span>
                )}
              </span>
            </div>
          ))}
        </div>
  
        <div className="rodape">
          <span className="valor-total">
            VALOR TOTAL:{" "}
            <strong>
              R$ {pedido.total.toLocaleString("pt-BR", {
                style: "decimal",
                minimumFractionDigits: 2,
              })}
            </strong>
          </span>
          <span className="forma-pagamento">{pedido.pagamento.toUpperCase()}</span>
        </div>
      </div>
  
      <label className="status-check">
        <input type="checkbox" />
        <span className="checkmark"></span>
      </label>
    </div>
  </div>
  );
};

export default PedidoCard;
