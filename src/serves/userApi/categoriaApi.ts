// src/serves/categoriaApi.ts
import axios from 'axios';
import { io } from "socket.io-client";

const api = axios.create({
  baseURL: 'https://empireofk.com.br/api', // Ajuste conforme o ambiente
});

export const baseURL = 'https://empireofk.com.br/api' 
/* const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajuste conforme o ambiente
});

export const baseURL = 'http://localhost:3000/api' */
// Interfaces
export interface Ingredientes {
  id?: number;
  nome: string;
  idProduto: number;
  quantMax: number;
  valorIngrediente: number;
}

export interface Produto {
  id?: number;
  nome: string;
  imagem: string;
  valor: number;
  descricao: string;
  ingredientes?: Ingredientes[];
}

export interface Categoria {
  id?: number;
  nome: string;
  ativa: boolean;
  produtos: Produto[];
}

// Interfaces já existentes...

export interface PedidoIngrediente {
  nome: string;
  valor: number;
  quantidade: number;
}

export interface PedidoItem {
  nomeProduto: string;
  imagem: string;
  precoUnitario: number;
  quantidade: number;
  adicionais: PedidoIngrediente[];
}

export interface PedidoPayload {
  cliente: {
    nome: string;
    endereco: string;
    telefone: string;
  };
  itens: PedidoItem[];
  
    formaPagamento: string;
  
}

export interface PedidoRetorno {
  id: number;
  criadoEm: string;
  cliente: {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
  };
  itens: PedidoItem[];
  pagamento: {
    id: number;
    formaPagamento: string;
    confirmado: boolean;
  };
}


// ===================== CATEGORIAS =====================
export const getCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get('/categorias');
  return response.data;
};

export const criarCategoria = async (nome: string): Promise<Categoria> => {
  const response = await api.post('/categorias', { nome });
  return response.data;
};

export const editarCategoria = async (id: number, nome: string, ativa: boolean): Promise<Categoria> => {
  const response = await api.put(`/categorias/${id}`, { nome, ativa });
  return response.data;
};

export const deletarCategoria = async (id: number): Promise<void> => {
  await api.delete(`/categorias/${id}`);
};

// ===================== PRODUTOS =====================
export const criarProduto = async (produto: Produto, categoriaId: number): Promise<Produto> => {
  const response = await api.post(`/categorias/${categoriaId}/produtos`, produto);
  return response.data;
};

export const editarProduto = async (produto: Produto, categoriaId: number): Promise<Produto> => {
  if (!produto.id) throw new Error("Produto precisa de ID para editar");
  const response = await api.put(`/categorias/${categoriaId}/produtos/${produto.id}`, produto);
  return response.data;
};

export const deletarProduto = async (produtoId: number, categoriaId: number): Promise<void> => {
  await api.delete(`/categorias/${categoriaId}/produtos/${produtoId}`);
};

// ===================== INGREDIENTES (ITENS) =====================

// Criar ingrediente para um produto
export const adicionarIngrediente = async (
  produtoId: number,
  ingrediente: { nome: string; valorIngrediente: number; quantMax: number }
): Promise<Ingredientes> => {
  const response = await api.post(`/produtos/${produtoId}/ingredientes`, ingrediente);
  return response.data;
};

// Editar ingrediente de um produto
export const editarIngrediente = async (
  ingredienteId: number,
  ingredienteAtualizado: { nome: string; valorIngrediente: number; quantMax: number }
): Promise<Ingredientes> => {
  const response = await api.put(`/ingredientes/${ingredienteId}`, ingredienteAtualizado);
  return response.data;
};

// Deletar ingrediente de um produto
export const deletarIngrediente = async (ingredienteId: number): Promise<void> => {
  await api.delete(`/ingredientes/${ingredienteId}`);
};

// Obter ingredientes de um produto (opcional)
export const listarIngredientes = async (produtoId: number): Promise<Ingredientes[]> => {
  const response = await api.get(`/produtos/${produtoId}/ingredientes`);
  return response.data;
};


// ===================== PEDIDOS =====================

// Criar novo pedido
export const criarPedido = async (pedido: PedidoPayload): Promise<PedidoRetorno> => {
  const response = await api.post('/pedidos', pedido);

  return response.data;
};

// Listar todos os pedidos
export const listarPedidos = async (): Promise<PedidoRetorno[]> => {
  const response = await api.get('/pedidos');
  return response.data;
};

// Buscar pedido por ID
export const buscarPedidoPorId = async (id: number): Promise<PedidoRetorno> => {
  const response = await api.get(`/pedidos/${id}`);
  return response.data;
};

// Confirmar pagamento do pedido
export const confirmarPagamento = async (id: number): Promise<PedidoRetorno> => {
  const response = await api.patch(`/pedidos/${id}/pagamento`);
  return response.data;
};

export const getPedidos = async () => {
  const response = await api.get('/pedidos');
  return response.data;
};
// Marcar pedido como pronto
export const marcarPedidoComoPronto = async (id: number): Promise<void> => {
  const response = await api.patch(`/pedidos/${id}/finalizar`);
  return response.data;
};

// Criar e exportar a conexão do socket
export const socket = io(baseURL, {
  transports: ['websocket'], // força usar websocket puro
});

export default api;