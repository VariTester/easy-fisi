import React from 'react'
import Heading from '../../../common/Heading/Heading'
import { tramites } from '../../../../data'

const Tramites = () => {
  return (
    <>
    <section className='tramites'>
        <Heading title="Trámites"/>
        {tramites.map((val)=>{
          return (
            <div className='items'>
              <div className='box shadow'>
                <div className='images row'>
                  <div className='img'>
                    <img src={val.cover} alt="" />
                  </div>
                  <div className="category category1">
                    <span>{val.catgeory}</span>
                  </div>
                </div>
                <div className="text row">
                  <h1 className='title'>{val.title.slice(0, 40)}...</h1>
                  <div className="date">
                    <i className='fas fa-calendar-days'></i>
                    <label htmlFor=''>{val.date}</label>
                  </div>
                  <div className="comment">
                    <i className='fas fa-comment'></i>
                    <label htmlFor=''>{val.date}</label>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </section>
    </>
  )
}

export default Tramites