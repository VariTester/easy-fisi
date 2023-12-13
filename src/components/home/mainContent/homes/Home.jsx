import React from 'react'
import "./style.css"
import Tramites from '../tramites/Tramites'
import Mvistos from '../masvistos/Mvistos'
import Cursos from '../cursos/Cursos'
import Foro from '../foro/Foro'
import Side from '../../sideContent/side/Side'
const Home = () => {
  return (
    <>
      <main>
        <div className='container'>
            <section className='mainContent'>
                <Mvistos/>
                <Tramites/>
                <Cursos/>
                <Foro/>
 
            </section>

            <section className='sideContent'>
              <Side/>
            </section>
        </div>
      </main>
    </>
  )
}

export default Home