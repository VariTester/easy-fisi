import React from 'react'
import Heading from '../../../common/Heading/Heading'

import Slider from "react-slick"

import "./side.css"
import { gallery } from '../../../../data'
import Tpost from "../Tpost/Tpost"
import SocialMedia from "../social/SocialMedia"

const Side = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    // fade: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // waitForAnimate: false

  }

  const catgeory = ["world", "travel", "sport", "fun", "health", "fashion", "business", "technology"]
  return (
    <>
      {/* <Heading title='Stay Connected' />
      <SocialMedia /> */}

      <Heading title='Whatsapp' />

      <section className='subscribe'>
        <form action=''>
        <a
      href="https://chat.whatsapp.com/Gh65uVJ6GWC9Tk4oKb5tkm"
      target="_blank"
      rel="noopener noreferrer"
      className="animated-link"
    >
      Únete al grupo de WhatsApp
    </a>
          <input type='tel' placeholder='O deja tu número para agregarte'pattern="[0-9]{9}" title='"Por favor, ingresa un número de 9 dígitos' required 
 />
          <button>
            <i className='fab fa-whatsapp'></i> Enviar
          </button>
        </form>
      </section>

      <section className='banner'>
        <img src='./images/sidebar-banner-new.jpg' alt='' />
      </section>

      <Tpost />

      <section className='catgorys'>
        <Heading title='Catgeorys' />
        {/*<div className='items'>{allCat}</div>*/}
        {catgeory.map((val) => {
          return (
            <div className='category category1'>
              <span>{val}</span>
            </div>
          )
        })}
      </section>

      <section className='gallery'>
        <Heading title='Gallery' />
        <Slider {...settings}>
          {gallery.map((val) => {
            return (
              <div className='img'>
                <img src={val.cover} alt='' />
              </div>
            )
          })}
        </Slider>
      </section>
    </>
  )
}

export default Side