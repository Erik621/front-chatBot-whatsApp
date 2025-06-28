import React from "react";
import "./PedidosRecebidos.css";
import PedidoCard from "./PedidoCard";

const pedidosExemplo = [
  {
    id: 1234,
    hora: "18:30",
    nome: "JOÃO SILVA",
    telefone: "77 91234-5678",
    endereco: "Rua Radial Norte B, 10",
    itens: [
      { quantidade: 2, nome: "X TUDO", alteracoes: "+ 2 bacon, + 1 ovo" },
      { quantidade: 1, nome: "Coca 500ml" },
      { quantidade: 2, nome: "Pudim" },
    ],
    total: 62.9,
    pagamento: "Cartão",
  },
  {
    id: 1234,
    hora: "18:30",
    nome: "JOÃO SILVA",
    telefone: "77 91234-5678",
    endereco: "Rua Radial Norte B, 10",
    itens: [
      { quantidade: 2, nome: "X TUDO", alteracoes: "+ 2 bacon, + 1 ovo" },
      { quantidade: 1, nome: "Coca 500ml" },
      { quantidade: 2, nome: "Pudim" },
    ],
    total: 62.9,
    pagamento: "Cartão",
  },
  {
    id: 12345,
    hora: "18:30",
    nome: "JOÃO SILVA",
    telefone: "77 91234-5678",
    endereco: "Rua Radial Norte B, 10",
    itens: [
      { quantidade: 2, nome: "X TUDO", alteracoes: "+ 2 bacon, + 1 ovo" },
      { quantidade: 1, nome: "Coca 500ml" },
      { quantidade: 2, nome: "Pudim" },
    ],
    total: 62.9,
    pagamento: "Cartão",
  },
  {
    id: 123456,
    hora: "18:30",
    nome: "JOÃO SILVA",
    telefone: "77 91234-5678",
    endereco: "Rua Radial Norte B, 10",
    itens: [
      { quantidade: 2, nome: "X TUDO", alteracoes: "+ 2 bacon, + 1 ovo" },
      { quantidade: 1, nome: "Coca 500ml" },
      { quantidade: 2, nome: "Pudim" },
    ],
    total: 62.9,
    pagamento: "Cartão",
  },
  {
    id: 123456,
    hora: "18:30",
    nome: "JOÃO SILVA",
    telefone: "77 91234-5678",
    endereco: "Rua Radial Norte B, 10",
    itens: [
      { quantidade: 2, nome: "X TUDO", alteracoes: "+ 2 bacon, + 1 ovo" },
      { quantidade: 1, nome: "Coca 500ml" },
      { quantidade: 2, nome: "Pudim" },
    ],
    total: 62.9,
    pagamento: "Cartão",
  },
  // pode adicionar mais objetos de pedido aqui...
];

const PedidosRecebidos = () => {
  return (
    <div className="tela-pedidos">
      <h2 className="titulo-pedidos">Pedidos Recebidos</h2>
      <div className="lista-pedidos">
        {pedidosExemplo.map((pedido) => (
          <PedidoCard key={pedido.id} pedido={pedido} />
        ))}
      </div>
    </div>
  );
};

export default PedidosRecebidos;