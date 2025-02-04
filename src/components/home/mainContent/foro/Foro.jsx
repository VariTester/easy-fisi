import React from 'react'
import "./foro.css"
import { foro, ppost } from '../../../../data'
import Heading from '../../../common/Heading/Heading'
import Slider from "react-slick"

const Foro = () => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0",
        slidesToShow: 1,
        speed: 500,
        rows: 2,
        slidesPerRow: 1,
    }
  return (
    <>    
    <section className='foro'>
    <Heading title="Foro para charlar"/> 
    <div className='content'>
    <div>
      Start a New Topic
    </div>
    <Slider {...settings}>
    {foro
    // .filter((val)=> val.catgeory === "fun")
    .map((val)=>{
      return (
        <div className='items'>
          <div className='box shadow flexSB'>
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
              <div className="date">
                <i className='fas fa-calendar-days'></i>
                <label htmlFor=''> {val.date}</label>
              </div>
              <p className='desc'>{val.desc.slice(0,250)}...</p>
              <div className='comment'>
                <i className='fas fa-share'></i>
                <label htmlFor=''>Share / </label>
                <i className='fas fa-comment'></i>
                <label htmlFor=''>{val.comments}</label>
              </div>

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
</section></>
  )
}

export default Foro