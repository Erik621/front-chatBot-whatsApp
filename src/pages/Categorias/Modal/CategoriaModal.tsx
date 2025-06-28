import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";


interface CategoriaModalProps {
  visivel: boolean;
  onFechar: () => void;
  onSalvar: (nomeCategoria: string) => void;
  nomeEdicao?: string;
}

const CategoriaModal: React.FC<CategoriaModalProps> = ({
  visivel,
  onFechar,
  onSalvar,
  nomeEdicao = "",
}) => {
  const [nome, setNome] = useState("");

  useEffect(() => {
    setNome(nomeEdicao);
  }, [nomeEdicao, visivel]);

  if (!visivel) return null;

  return (
    <div className="modal-backdrop" onClick={onFechar}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-topo">
          <h3>{nomeEdicao ? "Editar Categoria" : "Nova Categoria"}</h3>
          <IoMdClose className="fechar-icon" onClick={onFechar} />
        </div>
        <div className="modal-conteudo">
          <label htmlFor="nomeCategoria">Nome da categoria:</label>
          <input
            type="text"
            id="nomeCategoria"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome"
            className="input-texto"
          />
        </div>
        <div className="modal-botoes">
          <button className="botao-laranja" onClick={() => onSalvar(nome)}>
            Salvar
          </button>
          <button className="botao-branco" onClick={onFechar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriaModal;
