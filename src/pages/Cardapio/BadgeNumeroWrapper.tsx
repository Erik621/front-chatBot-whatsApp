//import React from "react";
//import "./BadgeNumeroWrapper.css";

export const BadgeNumeroWrapper = ({ className = "" }) => {
  return (
    <div className={`badge-numero ${className}`}>
      <span className="numero">3</span>
    </div>
  );
};
