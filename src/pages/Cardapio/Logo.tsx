import React from "react";
import logoCoroa from "../../assets/logo.svg"; // substitua pelo seu real caminho
import "./Logo.css";

export const Logo = ({ className = "" }) => {
  return <img src={logoCoroa} alt="Logo" className={`logo ${className}`} />;
};
