import React, { useState } from "react";
import "./CadastroProdutos.css";
import { FaCheckCircle, FaPen } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import ProdutoModal, { type Produto } from "./Modal/ProdutoModal";
import CategoriaModal from "./Modal/CategoriaModal";

interface Categoria {
    nome: string;
    ativa: boolean;
    produtos: Produto[];
}

const CadastroProdutos = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([
        {
            nome: "Lanches",
            ativa: true,
            produtos: [{ nome: "X TUDO", descricao: "", imagem: "", valor: 0 }]
        },
        {
            nome: "Sobremesas",
            ativa: true,
            produtos: [{ nome: "Pudim", descricao: "", imagem: "", valor: 0 }]
        },
        {
            nome: "Açaí e Sorvetes",
            ativa: true,
            produtos: [
                { nome: "Açaí", descricao: "", imagem: "", valor: 0 },
                { nome: "Sorvete de Morango", descricao: "", imagem: "", valor: 0 },
                { nome: "Cupuaçu", descricao: "", imagem: "", valor: 0 }
            ]
        }
    ]);

    const [produtoModalVisivel, setProdutoModalVisivel] = useState(false);
    const [produtoEdicao, setProdutoEdicao] = useState<Produto | null>(null);
    const [categoriaModalVisivel, setCategoriaModalVisivel] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);

    const abrirModalNovoProduto = (categoria: string) => {
        setProdutoEdicao(null);
        setCategoriaSelecionada(categoria);
        setProdutoModalVisivel(true);
    };

    const abrirModalEditarProduto = (produto: Produto, categoria: string) => {
        setProdutoEdicao(produto);
        setCategoriaSelecionada(categoria);
        setProdutoModalVisivel(true);
    };

    const salvarProduto = (produto: Produto) => {
        if (produtoEdicao) {
            setCategorias((prev) =>
                prev.map((cat) =>
                    cat.nome === categoriaSelecionada
                        ? {
                              ...cat,
                              produtos: cat.produtos.map((p) =>
                                  p.nome === produtoEdicao.nome ? produto : p
                              )
                          }
                        : cat
                )
            );
        } else {
            setCategorias((prev) =>
                prev.map((cat) =>
                    cat.nome === categoriaSelecionada
                        ? {
                              ...cat,
                              produtos: [...cat.produtos, produto]
                          }
                        : cat
                )
            );
        }
        setProdutoModalVisivel(false);
    };

    return (
        <div className="cadastro-produtos tela-cadastro">
            <div className="top-bar">
                <IoIosArrowBack className="voltar-icon" />
                <h2>Cadastrar Produto</h2>
            </div>

            {/* PROMOÇÕES */}
            <div className="categoria">
                <div className="categoria-header">
                    <h3 className="categoria-titulo laranja">Aba de promoções:</h3>
                    <span className="status">
                        Ativa <FaCheckCircle className="check-icon" />
                    </span>
                </div>
                <p className="produtos-label">Itens cadastrados:</p>
                <div className="produto-item">
                    <span>Caldo de Frango</span>
                    <button
                        onClick={() =>
                            abrirModalEditarProduto(
                                { nome: "Caldo de Frango", descricao: "", imagem: "", valor: 0 },
                                "PROMOÇÕES"
                            )
                        }
                    >
                        <FaPen />
                    </button>
                </div>
                <button
                    className="botao-laranja"
                    onClick={() => abrirModalNovoProduto("PROMOÇÕES")}
                >
                    Adicionar Produto +
                </button>
            </div>

            {/* BOTÃO ADICIONAR CATEGORIA */}
            <div className="categorias-section">
                <h3 className="categorias-titulo">Categorias:</h3>
                <button
                    className="botao-pequeno-laranja"
                    onClick={() => setCategoriaModalVisivel(true)}
                >
                    Adicionar nova categoria +
                </button>
            </div>

            {/* CATEGORIAS DINÂMICAS */}
            {categorias.map((cat, index) => (
                <div key={index} className="categoria">
                    <div className="categoria-header">
                        <h3 className="categoria-titulo laranja">{cat.nome}:</h3>
                        <span className="status">
                            Ativa <FaCheckCircle className="check-icon" />
                        </span>
                    </div>
                    <p className="produtos-label">Itens cadastrados:</p>
                    {cat.produtos.map((produto, i) => (
                        <div key={i} className="produto-item">
                            <span>{produto.nome}</span>
                            <button onClick={() => abrirModalEditarProduto(produto, cat.nome)}>
                                <FaPen />
                            </button>
                        </div>
                    ))}
                    <button
                        className="botao-laranja"
                        onClick={() => abrirModalNovoProduto(cat.nome)}
                    >
                        Adicionar Produto +
                    </button>
                </div>
            ))}

            <CategoriaModal
                visivel={categoriaModalVisivel}
                onFechar={() => setCategoriaModalVisivel(false)}
                onSalvar={(nomeCategoria) => {
                    setCategorias((prev) => [
                        ...prev,
                        { nome: nomeCategoria, ativa: true, produtos: [] }
                    ]);
                    setCategoriaModalVisivel(false);
                }}
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
