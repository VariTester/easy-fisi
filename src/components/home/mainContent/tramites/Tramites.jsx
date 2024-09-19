import React from 'react'
import Heading from '../../../common/Heading/Heading'
import { tramites } from '../../../../data'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./tramites.css"
const Tramites = () => {
  const settings = {
    dots: false,
    className: "center",
    // centerMode: true,
    centerMode: false,
    infinite: true,
    centerPadding: "20px",
    slidesToShow: 1,
    speed: 500,
    rows: 4,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows:3,
          // infinite: true,
          
        }
      },
    ]
    //esto es para pooner en vertical
    
    // dots: false,
    // infinite: true,
    // slidesToShow: 5,
    // slidesToScroll: 3,
    // vertical: true,
    // verticalSwiping: true,
    
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
                  {/* <div className="category category1">
                    <span>{val.catgeory}</span>
                  </div> */}
                </div>
                <div className="text row">
                  <h1 className='title'>{val.title.slice(0, 40)}...</h1>
                  <div className="date">
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