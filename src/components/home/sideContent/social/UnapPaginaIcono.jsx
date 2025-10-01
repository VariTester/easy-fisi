import React from "react";
import logoUnap from "../../../../assets/images/LOGOUNAPP.png";

const UnapPaginaIcono = () => {
  return (
    <div className="social-icon-link">
      <img src={logoUnap} alt="Mi Logo" className="icono-personal" />
      <a href="https://enlinea.unapiquitos.edu.pe" target="_blank" rel="noopener noreferrer">
        Página Oficial
      </a>
    </div>
  );
};

export default UnapPaginaIcono;
