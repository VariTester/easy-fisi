import React from "react";
import Heading from "../../../common/Heading/Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./docentes.css";
import { docentesData } from "../../../../data";

const Docentes = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 2,
    // slidesPerRow: 1,
    arrows: false,
        responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,

        },
      },
    ],
  };

  return (
    <section className="docentes">
      <Heading title="Nuestro Equipo Docente" />
      <Slider {...settings}>
        {docentesData.map((docente, index) => (
          <div className="docente-card" key={index}>
            <div className="docente-box">
              <div className="docente-img-wrap">
                <img src={docente.foto} alt={docente.nombre} className="docente-img" />
              </div>
              <div className="docente-info">
                <h2 className="docente-nombre">{docente.nombre}</h2>
                <p className="docente-formacion">🎓 {docente.formacion}</p>
                <p className="docente-exp">🧠 {docente.experiencia}</p>
                <ul className="docente-logros">
                  {docente.logros.map((logro, i) => (
                    <li key={i}>🏅 {logro}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Docentes;
