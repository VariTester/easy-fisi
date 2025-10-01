import React from 'react'
import Heading from '../../../common/Heading/Heading'
import { ppost, tramites} from '../../../../data'
import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
import './mvistos.css'
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaFileAlt, FaMedal, FaBookOpen, FaClock, FaDollarSign } from "react-icons/fa";
// import "./tramites.css"
const Mvistos = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    rows: 1,
    slidesPerRow: 3,
    
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 768,
        settings: { 
          rows: 1,
          slidesPerRow: 1,
          dots: true,
          autoplay: false,
         },
      },
    ],
  };

      // 🔹 Diccionario de íconos según título
      const iconMap = {
        matricula: <FaUserGraduate />,
        bachiller: <FaMedal />,
        diploma: <FaFileAlt />,
        nivelacion: <FaBookOpen />,
      };
    
      const getIcon = (title) => {
        const key = title.toLowerCase();
        return Object.keys(iconMap).find(k => key.includes(k)) ? iconMap[Object.keys(iconMap).find(k => key.includes(k))] : <FaFileAlt />;
      };

  return (
    <>
    <section className='masVistos'>
        <Heading title="Vista Rápida Trámites"/>
        <div className='content'>
      <Slider {...settings}>
        {tramites.map((val) => (
          <div className='items' key={val.id}>
            <Link to={`/tramite/${val.id}`} style={{ all: "unset" }}>
              <div className='box shadow'>
                <div className="icono">
                  {getIcon(val.title)}
                </div>
                <div className="text row">
                  <h1 className='title'>{val.title}</h1>

                  <div className="info">
                    <FaClock /> <span>{val.comments}</span>
                  </div>

                  <div className="info">
                    <FaDollarSign /> <span>{val.costo}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
        </div>
    </section>
    </>
  )
}

export default Mvistos
