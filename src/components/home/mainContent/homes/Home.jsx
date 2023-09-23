import React from 'react'
import "./style.css"
import Tramites from '../tramites/Tramites'
const Home = () => {
  return (
    <>
      <main>
        <div className='container'>
            <section className='mainContent'>
                <Tramites/>
            </section>

            <section className='sideContent'></section>
        </div>
      </main>
    </>
  )
}

export default Home