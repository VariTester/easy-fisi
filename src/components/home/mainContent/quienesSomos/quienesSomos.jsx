import React from "react";
import Heading from "../../../common/Heading/Heading";
import "./quienesSomos.css";
import { quienesSomosData } from "../../../../data";

const QuienesSomos = () => {
  return (
    <section className="quienesSomos">
      <Heading title="Quiénes Somos" />
      <div className="quienesSomos-grid">
        {quienesSomosData.map((persona, index) => (
          <div className="quienesSomos-card" key={index}>
            <div className="quienesSomos-img-wrap">
              <img
                src={persona.foto}
                alt={persona.nombre}
                className="quienesSomos-img"
              />
            </div>
            <div className="quienesSomos-info">
              <h2 className="quienesSomos-nombre">{persona.nombre}</h2>
              <p className="quienesSomos-formacion">🎓 {persona.formacion}</p>
              <p className="quienesSomos-exp">🧠 {persona.experiencia}</p>
              {persona.logros.length > 0 && (
                <ul className="quienesSomos-logros">
                  {persona.logros.map((logro, i) => (
                    <li key={i}>🏅 {logro}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuienesSomos;
