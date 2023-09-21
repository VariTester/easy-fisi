import React from 'react'
import './header.css'

const Head = () => {
  return (
    <> 
        <section className='head'>
            <div className='container flexSB paddingTB'>
                <div className='logo'>
                    {/* <img src='\assets\images\logooficial.png' alt='' /> */}
                    <img src="\images\logos\logooficial.png" alt="" />
                </div>

                <div className='ad'>
                    <img src='\images\logos\logocatblack.png' alt='' />
                </div>
            </div>
        </section>
  </>
  )
}

export default Head