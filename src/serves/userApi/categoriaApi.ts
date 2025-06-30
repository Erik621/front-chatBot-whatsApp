// src/serves/categoriaApi.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajuste conforme o ambiente
});

// Interfaces
export interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  imagem: string;
  valor: number;
}

export interface Categoria {
  id?: number;
  nome: string;
  ativa: boolean;
  produtos: Produto[];
}

// Categorias
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

// Produtos
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
