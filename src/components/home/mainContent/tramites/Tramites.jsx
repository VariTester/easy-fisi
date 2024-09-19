import React from 'react';
import Heading from '../../../common/Heading/Heading';
import { tramites } from '../../../../data';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./tramites.css";
import { Link } from 'react-router-dom'; // Importamos Link


const Tramites = () => {
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{  ...style,
          display: "block",
          background: "black", // Elimina el fondo del cuadrado
          borderRadius: "50%", // Hace que el cuadrado sea un círculo
          // width: "30px", // Ajusta el tamaño del círculo
          // height: "30px", // Ajusta el tamaño del círculo
          // border: "2px solid gray", // Opcional: Agrega un borde gris al círculo
          lineHeight: "20px", // Centra el icono verticalmente
          textAlign: "center", // Centra el icono horizontalmente
          color: "white", // Color del icono
          fontSize: "13px", // Tamaño del icono
          cursor: "pointer",}} // Cambia el cursor cuando se pasa sobre el icono}}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{  ...style,
          display: "block",
          background: "black", // Elimina el fondo del cuadrado
          borderRadius: "50%", // Hace que el cuadrado sea un círculo
          // width: "30px", // Ajusta el tamaño del círculo
          // height: "30px", // Ajusta el tamaño del círculo
          // border: "2px solid gray", // Opcional: Agrega un borde gris al círculo
          lineHeight: "20px", // Centra el icono verticalmente
          textAlign: "center", // Centra el icono horizontalmente
          color: "white", // Color del icono
          fontSize: "13px", // Tamaño del icono
          cursor: "pointer",}} // Cambia el cursor cuando se pasa sobre el icono}}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "20px",
    slidesToShow: 1,
    speed: 500,
    rows: 4,
    slidesPerRow: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 3,

        },
      },
    ],
  };

  return (
    <section className='tramites'>
      <Heading title="Trámites" />
      <Slider {...settings}>
        {tramites.map((val) => {
          return (
            <div className='items' key={val.id}>
              {/* Enlace a la página individual del trámite */}
              <Link to={`/tramite/${val.id}`}>
                <div className='box shadow'>
                  <div className='images row'>
                    <div className='img'>
                      <img src={val.cover} alt={val.title} />
                    </div>
                  </div>
                  <div className="text row">
                    <h1 className='title'>{val.title.slice(0, 40)}...</h1>
                    <div className="date">
                      <i className='fas fa-calendar-days'></i>
                      <label>{val.date}</label>
                    </div>
                    <div className="comment">
                      <i className='fas fa-clock'></i>
                      <label>{val.comments}</label>
                    </div>
                    <div className="comment">
                      <i className='fas fa-dollar'></i>
                      <label>{val.costo}</label>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default Tramites;
