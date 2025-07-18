import React from 'react'
import "./style.css"
import Tramites from '../tramites/Tramites'
import Mvistos from '../masvistos/Mvistos'
import Cursos from '../cursos/Cursos'
import Foro from '../foro/Foro'
import Side from '../../sideContent/side/Side'

import Login from "../../../login/Login";
// import Footer from '../../footer/Footer'


const Home = ({ usuario }) => {
  return (
    <>
      <main>
        <div className='container'>
          <section className='mainContent'>
            <Mvistos />
            <Cursos />
            <Foro preview usuario={usuario} />
          </section>
          <section className='sideContent'>
            <Side />
          </section>
        </div>
      </main>

    </>
  );
};
export default Home;
