// src/pages/Cadastro/Modal/IngredientesModal.tsx
import React, { useState } from "react";
import "./IngredientesModal.css";
import { type Ingredientes } from "../../../serves/userApi/categoriaApi";
import {
  adicionarIngrediente,
  editarIngrediente,
  deletarIngrediente,
} from "../../../serves/userApi/categoriaApi";
import { FaPen, FaTrash } from "react-icons/fa";
import EditarIngredienteModal from "./EditarIngredienteModal";

interface IngredientesModalProps {
  visivel: boolean;
  onFechar: () => void;
  ingredientes: Ingredientes[];
  nomeProduto: string;
  produtoId: number;
  onIngredienteAdicionado: (ingrediente: Ingredientes) => void;
}

const IngredientesModal: React.FC<IngredientesModalProps> = ({
  visivel,
  onFechar,
  ingredientes,
  nomeProduto,
  produtoId,
  onIngredienteAdicionado,
}) => {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [quantMax, setQuantMax] = useState("");

  const [ingredienteEditando, setIngredienteEditando] = useState<Ingredientes | null>(null);

  const handleAdicionar = async () => {
    if (!nome || !valor || !quantMax) {
      alert("Preencha todos os campos");
      return;
    }

    const novoIngrediente = {
      nome,
      valorIngrediente: parseFloat(valor),
      quantMax: parseInt(quantMax),
    };

    try {
      const salvo = await adicionarIngrediente(produtoId, novoIngrediente);
      onIngredienteAdicionado(salvo);
      setNome("");
      setValor("");
      setQuantMax("");
    } catch (error) {
      console.error("Erro ao adicionar ingrediente:", error);
      alert("Erro ao adicionar ingrediente.");
    }
  };

  const handleExcluir = async (ingrediente: Ingredientes) => {
    if (!ingrediente.id) return;
    if (!confirm(`Deseja excluir o ingrediente "${ingrediente.nome}"?`)) return;
    try {
      await deletarIngrediente(ingrediente.id);
      alert("Ingrediente excluído com sucesso.");
      window.location.reload(); // ou use um estado para atualizar a lista
    } catch (error) {
      console.error("Erro ao excluir ingrediente:", error);
      alert("Erro ao excluir ingrediente.");
    }
  };

  if (!visivel) return null;

  return (
    <div className="ingredientes-backdrop" onClick={onFechar}>
      <div className="ingredientes-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Ingredientes de {nomeProduto}</h3>

        <ul className="ingredientes-lista">
          {ingredientes.length === 0 ? (
            <li className="sem-ingredientes">Nenhum ingrediente cadastrado ainda.</li>
          ) : (
            ingredientes.map((ing) => (
              <li key={ing.id} className="ingrediente-item">
                <div className="info-esquerda">
                  <strong>{ing.nome}</strong> – R${" "}
                  {Number(ing.valorIngrediente).toFixed(2)} (máx: {ing.quantMax})
                </div>
                <div className="botoes-direita">
                  <button onClick={() => setIngredienteEditando(ing)}>
                    <FaPen />
                  </button>
                  <button onClick={() => handleExcluir(ing)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        <h4>Adicionar novo ingrediente:</h4>
        <input
          type="text"
          placeholder="Nome do ingrediente"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor (ex: 2.50)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade Máxima"
          value={quantMax}
          onChange={(e) => setQuantMax(e.target.value)}
        />

        <div className="botoes-modal">
          <button className="botao-laranja" onClick={handleAdicionar}>
            Adicionar Ingrediente
          </button>
          <button className="botao-branco" onClick={onFechar}>
            Fechar
          </button>
        </div>

        {ingredienteEditando && (
          <EditarIngredienteModal
            ingrediente={ingredienteEditando}
            onFechar={() => setIngredienteEditando(null)}
          />
        )}
      </div>
    </div>
  );
};

export default IngredientesModal;
