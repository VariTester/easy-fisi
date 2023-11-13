import React from 'react'
import "./style.css"
import Tramites from '../tramites/Tramites'
import Mvistos from '../masvistos/Mvistos'
import Cursos from '../cursos/Cursos'
const Home = () => {
  return (
    <>
      <main>
        <div className='container'>
            <section className='mainContent'>
                <Mvistos/>
                <Tramites/>
                <Cursos/>
 
            </section>

            <section className='sideContent'></section>
        </div>
      </main>
    </>
  )
}

export default Home