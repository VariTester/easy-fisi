import React from 'react'
import Heading from '../../../common/Heading/Heading'
import { ppost} from '../../../../data'
import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
import './mvistos.css'
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
        {ppost.map((val)=>{
          return (
            <div className='items'>
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