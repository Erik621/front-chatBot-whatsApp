import React, { useEffect, useState } from "react";
import "./PedidosRecebidos.css";
import PedidoCard from "./PedidoCard";
import {
  getPedidos,
  marcarPedidoComoPronto,
  socket
} from "../../serves/userApi/categoriaApi";

import { io } from "socket.io-client";


interface PedidoRecebido {
  id: number;
  criadoEm: string;
  finalizadoEm?: string | null;
  cliente: {
    nome: string;
    telefone: string;
    endereco: string;
  };
  observacao?: string;
  itens: {
    nomeProduto: string;
    quantidade: number;
    precoUnitario: number;
    adicionais?: {
      nome: string;
      quantidade: number;
      valor: number;
    }[];
  }[];
  pagamento?: {
    formaPagamento: string;
  } | null;
}

const PedidosRecebidos = () => {
  const [pedidos, setPedidos] = useState<PedidoRecebido[]>([]);
  const [filtroData, setFiltroData] = useState<string>("");
  const [mostrarProntos, setMostrarProntos] = useState<boolean>(false);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const dados = await getPedidos();
        setPedidos(dados);
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
      }
    };
    fetchPedidos();

    // Ouvir novos pedidos via websocket
    socket.on("novoPedido", (pedido) => {
      setPedidos((prev) => [pedido, ...prev]);
    });

    return () => {
      socket.off("novoPedido");
    };
  }, []);



  const formatarDataHora = (data: string) => {
    return new Date(data).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calcularTotal = (pedido: PedidoRecebido): number => {
    return pedido.itens.reduce((acc, item) => {
      const adicionaisTotal =
        item.adicionais?.reduce(
          (a, add) => a + add.quantidade * Number(add.valor),
          0
        ) || 0;
      return acc + item.quantidade * Number(item.precoUnitario) + adicionaisTotal;
    }, 0);
  };

  const handleMarcarComoPronto = async (id: number) => {
    try {
      const finalizado = new Date().toISOString();
      console.log(finalizado)

      console.log(await marcarPedidoComoPronto(id))
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, finalizadoEm: finalizado } : p
        )
      );
      console.log(pedidos)
    } catch (err) {
      console.error("Erro ao marcar como pronto:", err);
    }
  };

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const dataPedido = new Date(pedido.criadoEm)
      .toLocaleDateString("pt-BR")
      .split("/")
      .reverse()
      .join("-");

    const passaData = !filtroData || dataPedido === filtroData;
    const passaStatus = mostrarProntos
      ? pedido.finalizadoEm !== null
      : pedido.finalizadoEm === null;

    return passaData && passaStatus;
  });

  return (
    <div className="tela-pedidos">

      <div className="cabecalho-pedidos">
        <h2 className="titulo-pedidos">Pedidos Recebidos</h2>

        <div className="filtros-pedidos">
          <input
            type="date"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={mostrarProntos}
              onChange={() => setMostrarProntos((prev) => !prev)}
            />
            Mostrar pedidos prontos
          </label>
        </div>
      </div>

      <div className="lista-pedidos">
        {pedidosFiltrados.map((pedido) => (
          <PedidoCard
            key={pedido.id}
            pedido={{
              id: pedido.id,
              hora: formatarDataHora(pedido.criadoEm),
              nome: pedido.cliente.nome,
              telefone: pedido.cliente.telefone,
              endereco: pedido.cliente.endereco,
              itens: pedido.itens.map((item) => ({
                quantidade: item.quantidade,
                nome: item.nomeProduto,
                alteracoes: item.adicionais
                  ?.map((a) => `+ ${a.quantidade} ${a.nome}`)
                  .join(", "),
              })),
              total: calcularTotal(pedido),
              pagamento:
                pedido.pagamento?.formaPagamento?.toUpperCase() ||
                "NÃO INFORMADO",
              observacao: pedido.observacao ?? "",
            }}
            onMarcarComoPronto={() => handleMarcarComoPronto(pedido.id)}
            pronto={!!pedido.finalizadoEm}
          />
        ))}
      </div>
    </div>
  );
};

export default PedidosRecebidos;
