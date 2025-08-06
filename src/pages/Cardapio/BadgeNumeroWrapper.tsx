// BadgeNumeroWrapper.tsx
import React from "react";
import "./BadgeNumeroWrapper.css";

interface BadgeNumeroWrapperProps {
  className?: string;
  quantidade: number;
}

export const BadgeNumeroWrapper = ({ className = "", quantidade }: BadgeNumeroWrapperProps) => {
  if (quantidade === 0) return null; // Não mostra a bolinha se não houver pedidos

  return (
    <div className={`badge-numero ${className}`}>
      <span className="numero">{quantidade}</span>
    </div>
  );
};
