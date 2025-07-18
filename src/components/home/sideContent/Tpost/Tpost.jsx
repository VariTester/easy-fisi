import React, { useEffect, useState } from "react";
import Heading from "../../../common/Heading/Heading";
import "./tpost.css";

const Tpost = () => {
  const [trabajos, setTrabajos] = useState([]);

  useEffect(() => {
    const fetchTrabajos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/trabajos");
        const data = await response.json();
        setTrabajos(data);
      } catch (error) {
        console.error("Error al cargar trabajos:", error);
      }
    };

    fetchTrabajos();
  }, []);

  return (
    <section className="tpost">
      <Heading title="Oportunidad Laboral" />
      {trabajos.length === 0 && <p>Cargando trabajos...</p>}
      {trabajos.map((trabajo, index) => (
        <a
          href={trabajo.link}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
          className="box flexSB"
        >
          <div className="img">
            {trabajo.imagen ? (
              <img src={trabajo.imagen} alt={trabajo.titulo} />
            ) : (
              <div className="placeholder-img">Sin imagen</div>
            )}
          </div>
          <div className="text">
            <h1 className="title">{trabajo.titulo.slice(0, 40)}...</h1>
            <span>PortalTrabajos.pe</span>
          </div>
        </a>
      ))}
    </section>
  );
};

export default Tpost;
