/* import React from "react";
import "./ScrollVertical.css";

export const ScrollVertical = () => {
  return (
    <div className="scroll-vertical">
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} className="scroll-item">
          Item vertical {i + 1}
        </div>
      ))}
    </div>
  );
};
 */
import React from "react";
import "./ScrollVertical.css";

interface ScrollVerticalProps {
  itens: string[];
}

export const ScrollVertical: React.FC<ScrollVerticalProps> = ({ itens }) => {
  return (
    <div className="scroll-vertical">
      {itens.map((item, index) => (
        <div key={index} className="scroll-item">
          {item}
        </div>
      ))}
    </div>
  );
};
