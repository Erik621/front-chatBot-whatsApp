import { useState, useEffect } from "react";
import "./CadastroProdutos.css";
import { FaCheckCircle, FaPen, FaTrash } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import ProdutoModal from "./Modal/ProdutoModal";
import CategoriaModal from "./Modal/CategoriaModal";
import {
  getCategorias,
  criarCategoria,
  criarProduto,
  editarProduto,
  deletarProduto,
  editarCategoria,
  deletarCategoria,
  type Categoria,
  type Produto,
} from "../../serves/userApi/categoriaApi";

const CadastroProdutos = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [produtoModalVisivel, setProdutoModalVisivel] = useState(false);
  const [produtoEdicao, setProdutoEdicao] = useState<Produto | null>(null);
  const [categoriaModalVisivel, setCategoriaModalVisivel] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | null>(null);

  useEffect(() => {
    getCategorias()
      .then(setCategorias)
      .catch((err) => {
        console.error("Erro ao buscar categorias", err);
      });
  }, []);

  const abrirModalNovoProduto = (categoria: Categoria) => {
    setProdutoEdicao(null);
    setCategoriaSelecionada(categoria);
    setProdutoModalVisivel(true);
  };

  const abrirModalEditarProduto = (produto: Produto, categoria: Categoria) => {
    setProdutoEdicao(produto);
    setCategoriaSelecionada(categoria);
    setProdutoModalVisivel(true);
  };

  const salvarProduto = async (produto: Produto) => {
    if (!categoriaSelecionada) return;
    try {
      if (produtoEdicao && produtoEdicao.id) {
        const atualizado = await editarProduto(produto, categoriaSelecionada.id!);
        setCategorias((prev) =>
          prev.map((cat) =>
            cat.id === categoriaSelecionada.id
              ? {
                  ...cat,
                  produtos: cat.produtos.map((p) =>
                    p.id === produtoEdicao.id ? atualizado : p
                  ),
                }
              : cat
          )
        );
      } else {
        const novoProduto = await criarProduto(produto, categoriaSelecionada.id!);
        setCategorias((prev) =>
          prev.map((cat) =>
            cat.id === categoriaSelecionada.id
              ? { ...cat, produtos: [...cat.produtos, novoProduto] }
              : cat
          )
        );
      }
    } catch (err) {
      console.error("Erro ao salvar produto", err);
    }
    setProdutoModalVisivel(false);
  };

  const salvarCategoria = async (nomeCategoria: string) => {
    try {
      const novaCategoria = await criarCategoria(nomeCategoria);
      setCategorias((prev) => [...prev, novaCategoria]);
    } catch (err) {
      console.error("Erro ao criar categoria", err);
    }
    setCategoriaModalVisivel(false);
  };

  const removerProduto = async (produto: Produto, categoria: Categoria) => {
    if (!produto.id || !categoria.id) return;
    try {
      await deletarProduto(produto.id, categoria.id);
      setCategorias((prev) =>
        prev.map((cat) =>
          cat.id === categoria.id
            ? {
                ...cat,
                produtos: cat.produtos.filter((p) => p.id !== produto.id),
              }
            : cat
        )
      );
    } catch (err) {
      console.error("Erro ao deletar produto", err);
    }
  };

  const removerCategoria = async (categoria: Categoria) => {
    if (!categoria.id) return;
    try {
      await deletarCategoria(categoria.id);
      setCategorias((prev) => prev.filter((c) => c.id !== categoria.id));
    } catch (err) {
      console.error("Erro ao deletar categoria", err);
    }
  };

  return (
    <div className="cadastro-produtos tela-cadastro">
      <div className="top-bar">
        <IoIosArrowBack className="voltar-icon" />
        <h2>Cadastrar Produto</h2>
      </div>

      <div className="categorias-section">
        <h3 className="categorias-titulo">Categorias:</h3>
        <button
          className="botao-pequeno-laranja"
          onClick={() => setCategoriaModalVisivel(true)}
        >
          Adicionar nova categoria +
        </button>
      </div>

      {categorias.map((cat) => (
        <div key={cat.id} className="categoria">
          <div className="categoria-header">
            <h3 className="categoria-titulo laranja">{cat.nome}:</h3>
            <span className="status">
              {cat.ativa ? "Ativa" : "Inativa"} <FaCheckCircle className="check-icon" />
            </span>
            <button onClick={() => removerCategoria(cat)} className="botao-pequeno">
              <FaTrash />
            </button>
          </div>

          <p className="produtos-label">Itens cadastrados:</p>
          {cat.produtos.map((produto) => (
            <div key={produto.id} className="produto-item">
              <span>{produto.nome}</span>
              <div>
                <button onClick={() => abrirModalEditarProduto(produto, cat)}>
                  <FaPen />
                </button>
                <button onClick={() => removerProduto(produto, cat)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          <button
            className="botao-laranja"
            onClick={() => abrirModalNovoProduto(cat)}
          >
            Adicionar Produto +
          </button>
        </div>
      ))}

      <CategoriaModal
        visivel={categoriaModalVisivel}
        onFechar={() => setCategoriaModalVisivel(false)}
        onSalvar={salvarCategoria}
      />

      <ProdutoModal
        visivel={produtoModalVisivel}
        onFechar={() => setProdutoModalVisivel(false)}
        onSalvar={salvarProduto}
        produtoEdicao={produtoEdicao}
      />
    </div>
  );
};

export default CadastroProdutos;
