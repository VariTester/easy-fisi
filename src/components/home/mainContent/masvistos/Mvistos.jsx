import React from 'react'
import Heading from '../../../common/Heading/Heading'
import { ppost, tramites} from '../../../../data'
import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
import './mvistos.css'
import { Link } from 'react-router-dom';
// import "./tramites.css"
const Mvistos = () => {
    const settings = {
        dots: false,
         infinite: true,
         speed: 500,
         slidesToShow: 3,
         slidesToScroll: 1,
         responsive:[
            {
                breakpoint: 800,
                settings:{
                    slidesToShow:2,
                    slidesToScroll:1,
                }
            }
         ]
        // className: "center",
        // centerMode: true,
        // infinite: true,
        // centerPadding: "60px",
        // slidesToShow: 2,
        // speed: 500
    }
  return (
    <>
    <section className='masVistos'>
        <Heading title="Más Vistos"/>
        <div className='content'>
        <Slider {...settings}>
        {tramites
        //aca es para poner los mas vistos
        .filter((val)=> val.masVisto === "1")
        .map((val)=>{
          return (
            <div className='items' key={val.id}>
              {/* Enlace a la página individual de los mas vistos*/}
              {/* <Link to={`/tramite/${val.id}`}> */}
              <Link to={`/tramite/${val.id}`} style={{ all: "unset" }}>
              <div className='box shadow'>
                <div className='images'>
                  <div className='img'>
                    <img src={val.cover} alt="" />
                  </div>
                  <div className="category category1">
                    <span>{val.catgeory}</span>
                  </div>
                </div>
                <div className="text ">
                  <h1 className='title'>{val.title.slice(0, 40)}...</h1>
                  {/* <div className="date">
                    <i className='fas fa-calendar-days'></i>
                    <label htmlFor=''> {val.date}</label>
                  </div>
                  <div className="comment">
                    <i className='fas fa-clock'></i>
                    <label htmlFor=''> {val.comments}</label>
                  </div>
                  <div className="comment">
                    <i className='fas fa-dollar'></i>
                    <label htmlFor=''> {val.costo}</label>
                  </div> */}
                </div>
              </div>
              </Link>
            </div>
          )
        })}
        </Slider>
        </div>
    </section>
    </>
  )
}

export default Mvistos