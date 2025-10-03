import React, { useState } from "react";
import Heading from "../../../common/Heading/Heading";
import "./quienesSomos.css";
import { quienesSomosData } from "../../../../data";
import { motion, AnimatePresence } from "framer-motion";

const QuienesSomos = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % quienesSomosData.length);
  };

  return (
    <section className="quienesSomos">
      <Heading title="Quiénes Somos" />

      {/* --- GRID PARA PC --- */}
      <div className="quienesSomos-grid">
        {quienesSomosData.map((persona, i) => (
          <div className="quienesSomos-card" key={i}>
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
                  {persona.logros.map((logro, j) => (
                    <li key={j}>🏅 {logro}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- CARRUSEL SOLO PARA MÓVIL --- */}
      <div className="quienesSomos-carousel">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="quienesSomos-card"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="quienesSomos-img-wrap">
              <img
                src={quienesSomosData[index].foto}
                alt={quienesSomosData[index].nombre}
                className="quienesSomos-img"
              />
            </div>
            <div className="quienesSomos-info">
              <h2 className="quienesSomos-nombre">
                {quienesSomosData[index].nombre}
              </h2>
              <p className="quienesSomos-formacion">
                🎓 {quienesSomosData[index].formacion}
              </p>
              <p className="quienesSomos-exp">
                🧠 {quienesSomosData[index].experiencia}
              </p>
              {quienesSomosData[index].logros.length > 0 && (
                <ul className="quienesSomos-logros">
                  {quienesSomosData[index].logros.map((logro, j) => (
                    <li key={j}>🏅 {logro}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        <button className="quienesSomos-btn" onClick={handleNext}>
          ➡️ Ver siguiente.
        </button>
      </div>
    </section>
  );
};

export default QuienesSomos;
