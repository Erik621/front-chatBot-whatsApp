// src/serves/categoriaApi.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajuste conforme o ambiente
});

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
  ingredientes?: Ingredientes[];
}

export interface Categoria {
  id?: number;
  nome: string;
  ativa: boolean;
  produtos: Produto[];
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
