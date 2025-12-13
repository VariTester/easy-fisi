import React, { useEffect, useState } from 'react'
import Heading from '../../../common/Heading/Heading'
import Slider from 'react-slick'
import './mvistos.css'
import { Link } from 'react-router-dom'
import { FaUserGraduate, FaFileAlt, FaMedal, FaBookOpen, FaClock, FaDollarSign } from "react-icons/fa"

// Firebase
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../../firebase/firebaseConfig'

const Mvistos = () => {
  const [tramites, setTramites] = useState([])

const settings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  arrows: true,
  adaptiveHeight: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        autoplay: false,
      },
    },
  ],
}

  // 🔹 Diccionario de íconos según título
  const iconMap = {
    matricula: <FaUserGraduate />,
    bachiller: <FaMedal />,
    diploma: <FaFileAlt />,
    nivelacion: <FaBookOpen />,
  }

  const getIcon = (title) => {
    if (!title) return <FaFileAlt /> // evita error si title undefined
    const key = title.toLowerCase()
    const match = Object.keys(iconMap).find(k => key.includes(k))
    return match ? iconMap[match] : <FaFileAlt />
  }

  // 🔥 Traer trámites desde Firebase
  useEffect(() => {
    const fetchTramites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tramites'))
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setTramites(data)
      } catch (err) {
        console.error('Error fetching tramites:', err)
      }
    }

    fetchTramites()
  }, [])

 return (
    <>
    <section className='masVistos'>
        <Heading title="Vista Rápida Trámites"/>
        <div className='content'>
        <Slider {...settings}>
          {tramites.map((val) => (
        <div className="items">
          <Link to={`/tramite/${val.id}`} style={{ all: "unset" }}>
            <div className="box shadow">
              <div className="icono">{getIcon(val.title)}</div>

              <div className="text">
                <h1 className="title">{val.title}</h1>

                <div className="info">
                  <FaClock /> Duración: <span>{val.duracion}</span>días (Aprox)
                </div>

                <div className="info">
                  <FaDollarSign /> Costo: <span>{val.costo}</span>soles (Aprox)
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
