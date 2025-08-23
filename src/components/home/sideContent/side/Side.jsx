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
      
      <Heading title='Redes Sociales UNAP'/>
        <section className='SocialMedia'>
        <SocialMedia />
      </section>

<Heading title='Whatsapp FISI' />

<section className='subscribe'>
  <a
    href="https://chat.whatsapp.com/Gh65uVJ6GWC9Tk4oKb5tkm"
    target="_blank"
    rel="noopener noreferrer"
    className="animated-link"
  >
    Únete al grupo de WhatsApp
  </a>

  <form
    onSubmit={(e) => {
      e.preventDefault();
      const numeroIngresado = e.target.numero.value.trim();
      if (/^\d{9}$/.test(numeroIngresado)) {
        const mensaje = `Hola, este es mi número para que me agregues al grupo de la FISI: ${numeroIngresado}`;
        const url = `https://wa.me/51992329593?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
        e.target.reset();
      } else {
        alert("Por favor, ingresa un número válido de 9 dígitos");
      }
    }}
  >
    <input
      type="tel"
      name="numero"
      placeholder="O deja tu número para agregarte"
      pattern="[0-9]{9}"
      title="Por favor, ingresa un número de 9 dígitos"
      required
    />
    <button type="submit">
      <i className="fab fa-whatsapp"></i> Enviar
    </button>
  </form>
</section>

{/* 
      <section className='banner'>
        <img src='./images/sidebar-banner-new.jpg' alt='' />
      </section> */}

      <Tpost />

      {/* <section className='catgorys'>
        <Heading title='Catgeorys' />
        {catgeory.map((val) => {
          return (
            <div className='category category1'>
              <span>{val}</span>
            </div>
          )
        })}
      </section> */}

      <section className='gallery'>
        <Heading title='Galería' />
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