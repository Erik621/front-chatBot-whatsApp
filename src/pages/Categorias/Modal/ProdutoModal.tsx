import React, { useState, useEffect } from "react";
import api from "../../../serves/userApi/categoriaApi";
import "./ProdutoModal.css";

export interface Produto {
  id?: number;
  nome: string;
  imagem: string;
  valor: number;
  descricao: string;
}

interface ProdutoModalProps {
  visivel: boolean;
  onFechar: () => void;
  onSalvar: (produto: Produto) => void;
  produtoEdicao?: Produto | null;
}

const ProdutoModal = ({ visivel, onFechar, onSalvar, produtoEdicao }: ProdutoModalProps) => {
  const [form, setForm] = useState<Produto>({
    nome: "",
    imagem: "",
    valor: 0,
    descricao: "",
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (produtoEdicao) {
      setForm(produtoEdicao);
    } else {
      setForm({ nome: "", imagem: "", valor: 0, descricao: "" });
    }
    setFile(null);
  }, [produtoEdicao, visivel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "valor" ? (value ? parseFloat(value) : 0) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      console.log("Arquivo selecionado:", e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const handleUploadImagem = async (): Promise<string> => {
    if (!file) return form.imagem;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      return response.data.caminho;
    } catch (err) {
      console.error('Erro ao enviar imagem', err);
      return form.imagem;
    }
  };

  const handleSalvar = async () => {
    if (!form.nome.trim()) {
      alert("Nome do produto é obrigatório");
      return;
    }

    const caminhoImagem = await handleUploadImagem();

    onSalvar({
      ...form,
      imagem: caminhoImagem
    });
    onFechar();
  };

  if (!visivel) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-conteudo">
        <h2>{produtoEdicao ? "Editar Produto" : "Novo Produto"}</h2>

        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome do produto"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {form.imagem && (
          <div>
            <p>Imagem Atual:</p>
            <img
              src={`http://localhost:3000${form.imagem}`}
              alt="Imagem atual"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
        )}

        <input
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          placeholder="Descrição do produto"
        />

        <input
          name="valor"
          value={form.valor}
          onChange={handleChange}
          placeholder="Valor"
          type="number"
          step="0.01"
          min="0"
        />

        <div className="botoes">
          <button onClick={onFechar}>Cancelar</button>
          <button onClick={handleSalvar}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default ProdutoModal;
