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


/* import React from "react";
import frontViewCheeseburgerWithFries1 from "./front-view-cheeseburger-with-fries-1.png";
import "./style.css";

interface Props {
  className: any;
}

export const Frame = ({ className }: Props): JSX.Element => {
  return (
    <div className={`frame ${className}`}>
      <img
        className="front-view"
        alt="Front view"
        src={frontViewCheeseburgerWithFries1}
      />

      <div className="text-wrapper">X TUDO</div>

      <p className="div">Hambúrguer, bacon, ovo, cheddar, tomate.</p>

      <div className="text-wrapper-2">R$ 28,00</div>
    </div>
  );
};
 */
