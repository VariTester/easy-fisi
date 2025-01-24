import React from 'react'
import { Link } from 'react-router-dom';

import Heading from '../../../common/Heading/Heading'
import { cursos, tramites } from '../../../../data'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./cursos.css"

const Cursos = () => {
    const settings = {
        className: "center",
        // centerMode: true,
        centerMode: false,
        infinite: true,
        centerPadding: "20px",
        slidesToShow: 2,
        speed: 500,
        rows: 3,
        slidesPerRow: 1,
        responsive: [
          {
            breakpoint: 768,
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
        // slidesToShow: 3,
        // slidesToScroll: 1,
        // vertical: true,
        // verticalSwiping: true,
        
      };
      return (
        <>
        <section className='cursos'>
            <Heading title="Cursos de este Semestre"/>
            <Slider {...settings}>
            {cursos.map((val)=>{
              return (
                <div className='items'>
                  <div className='box shadow'>
                    <div className='images row'>
                      <div className='img'>
                        <img src={val.cover} alt="" />
                      </div>
                      <div className="category category1">
                        <span>{val.nivel}</span>
                      </div>
                    </div>
                    <div className="text row">
                      <h1 className='title'>{val.title.slice(0, 40)}...</h1>
                      <div className="date">
                        <i className='fas fa-chalkboard-teacher'></i>
                        <label htmlFor=''> {val.authorName}</label>
                      </div>
                      <div className="comment">
                        <i className='fas fa-users'></i>
                        <label htmlFor=''> {val.grupo}</label>
                      </div>
                      <div className="comment" key={val.id}>
                        <a href={val.link} target='_blank' rel='noopener noreferrer'>
                          <i className='fab fa-whatsapp'></i>
                          <label htmlFor=''>Link del grupo</label>
                        </a>
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

export default Cursos