import React, { useState } from "react";
import "./EditarIngredienteModal.css";
import { type Ingredientes, editarIngrediente } from "../../../serves/userApi/categoriaApi";

interface EditarIngredienteModalProps {
  ingrediente: Ingredientes;
  onFechar: () => void;
}

const EditarIngredienteModal: React.FC<EditarIngredienteModalProps> = ({
  ingrediente,
  onFechar,
}) => {
  const [nome, setNome] = useState(ingrediente.nome);
  const [valor, setValor] = useState(String(ingrediente.valorIngrediente));
  const [quantMax, setQuantMax] = useState(String(ingrediente.quantMax));

  const handleSalvar = async () => {
    if (!nome || !valor || !quantMax) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const atualizado: Ingredientes = {
        ...ingrediente,
        nome,
        valorIngrediente: parseFloat(valor),
        quantMax: parseInt(quantMax),
      };

      await editarIngrediente(ingrediente.id!, atualizado);
      alert("Ingrediente atualizado com sucesso!");
      onFechar();
      window.location.reload(); // ou use estado global/contexto para evitar reload
    } catch (error) {
      console.error("Erro ao editar ingrediente:", error);
      alert("Erro ao editar ingrediente.");
    }
  };

  return (
    <div className="editar-ingrediente-backdrop" onClick={onFechar}>
      <div className="editar-ingrediente-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Editar Ingrediente</h3>

        <input
          type="text"
          placeholder="Nome"
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
          <button className="botao-laranja" onClick={handleSalvar}>
            Salvar Alterações
          </button>
          <button className="botao-branco" onClick={onFechar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarIngredienteModal;
