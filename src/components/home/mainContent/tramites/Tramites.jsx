import React from 'react'
import Heading from '../../../common/Heading/Heading'
import { tramites } from '../../../../data'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./tramites.css"
const Tramites = () => {
  const settings = {
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 2,
    speed: 500,
    rows: 4,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows:4,
          // infinite: true,
          
        }
      },
    ]
  };
  return (
    <>
    <section className='tramites'>
        <Heading title="Trámites"/>
        <Slider {...settings}>
        {tramites.map((val)=>{
          return (
            <div className='items'>
              <div className='box shadow'>
                <div className='images row'>
                  <div className='img'>
                    <img src={val.cover} alt="" />
                  </div>
                  <div className="category category1">
                    <span>{val.catgeory}</span>
                  </div>
                </div>
                <div className="text row">
                  <h1 className='title'>{val.title.slice(0, 40)}...</h1>
                  <div className="date">
                    <i className='fas fa-calendar-days'></i>
                    <label htmlFor=''>{val.date}</label>
                  </div>
                  <div className="comment">
                    <i className='fas fa-comment'></i>
                    <label htmlFor=''>{val.date}</label>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        </Slider>
    </section>
    </>
  )
}

export default Tramites