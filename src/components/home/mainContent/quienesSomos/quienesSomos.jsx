import React from "react";
import Heading from "../../../common/Heading/Heading";
import "./quienesSomos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { quienesSomosData } from "../../../../data";

const QuienesSomos = () => {
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
    <section className="quienesSomoss">
      <Heading title="Nuestro Equipo de Desarrollo" />
      <Slider {...settings}>
        {quienesSomosData.map((quienesSomos, index) => (
          <div className="quienesSomos-card" key={index}>
            <div className="quienesSomos-box">
              <div className="quienesSomos-img-wrap">
                <img src={quienesSomos.foto} alt={quienesSomos.nombre} className="quienesSomos-img" />
              </div>
              <div className="quienesSomos-info">
                <h2 className="quienesSomos-nombre">{quienesSomos.nombre}</h2>
                <p className="quienesSomos-formacion">🎓 {quienesSomos.formacion}</p>
                <p className="quienesSomos-exp">🧠 {quienesSomos.experiencia}</p>
                <ul className="quienesSomos-logros">
                  {quienesSomos.logros.map((logro, i) => (
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

export default QuienesSomos;