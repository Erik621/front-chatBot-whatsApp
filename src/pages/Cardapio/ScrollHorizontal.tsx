import React from "react";
import "./ScrollHorizontal.css";
import image from "./image.svg"

export const ScrollHorizontal = () => {
  return (
    <div className="cards-promoes-wrapper">
    {Array.from({ length: 10 }, (_, i) => (
      <div className="cards-promoes" key={i}>
        <img
          className="lentil-soup-bowl"
          alt="Lentil soup bowl"
          src={image}
        />

        <div className="text-wrapper">Caldo de Frango {i + 1}</div>
        <div className="div">R$ 5,00</div>
      </div>
    ))}
  </div>
  );
};

