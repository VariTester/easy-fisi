import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { noticiasdata } from "../../../data"
import '../NoticiasSinglePage/noticiasSinglepage.css'

import Side from "../../home/sideContent/side/Side"
// import SinglePageSlider from './SinglePageSlider/SinglePageSlider'
// import autor1 from "../common/images/autores/author.jpg";
// import noticia1 from "../common/images/hero/direpro1.jpg";

const NoticiasSinglepagess = () =>  {
    const {id} = useParams()
    const [item,setItem] = useState(null)

    useEffect(() => {
        const item = noticiasdata.find((item)=>item.id === parseInt(id))
        window.scrollTo(0, 0)
        if(item){
            setItem(item)
        }
    },[id])

  return (
    <> 
    {item ? (
        <main>
            {/* <SinglePageSlider/> */}
            <div className='container'>
            <section className='mainContent details'>
              <h1 className='title'>{item.title}</h1>

              <div className="info">
                <div className="date">
                        <i className='fas fa-calendar-days'></i>
                        <label>{item.date}</label>
                </div>

                <div className="comment">
                        <i className='fas fa-clock'></i>
                        <label>{item.comments}</label>
                </div>
              </div>

              {/* <div className='social'>
                <div className='socBox'>
                  <i className='fab fa-facebook-f'></i>
                  <span>SHARE</span>
                </div>
                <div className='socBox'>
                  <i className='fab fa-twitter'></i>
                  <span>TWITTER</span>
                </div>
                <div className='socBox'>
                  <i className='fab fa-pinterest'></i>
                </div>
                <div className='socBox'>
                  <i className='fa fa-envelope'></i>
                </div>
              </div> */}
              
              <div className='desctop'>
                {item.desc.map((val, index) => (
                  <div key={index} className='text-container'>
                    {val.para1 && <p className='para1'>{val.para1}</p>}
                     {/*El de abajo es para habilitar el parrafo en negrita*/}
                    {/* {val.para2 && <p className='para2'>{val.para2}</p>}  */}
                    {val.para3 && <p className='para3'>{val.para3}</p>} 
                    {val.para4 && <p className='para4'>{val.para4}</p>} 
                    {val.para5 && <p className='para5'>{val.para5}</p>} 
                    {/* {val.para6 && <p className='para6'>{val.para6}</p>} 
                    {val.para7 && <p className='para7'>{val.para7}</p>}  */}
                  </div>
                ))}
              </div>

              <div className='quote'>
                <i className='fa fa-quote-left'></i>
                {item.details.map((data) => (
                  <p>{data.quote}</p>
                ))}
              </div>

              {item.desc.map((val) => (
                <p>{val.para6}</p>
              ))}
              
              <img src={item.cover} alt='' />


              <div className='descbot'>
                {item.details.map((data) => {
                  return (
                    <>
                      {/* <h1>{data.title}</h1> */}
                      <p>{data.para1}</p>
                      <p>{data.para2}</p>
                      {/* <p>{data.para3}</p> */}
                    </>
                  )
                })}
              </div>


              
            </section>
            <section className='sideContent'>
              <Side/>
            </section>
          </div>
    </main>

  ) : (
    <h1>not found</h1>
  )}
  </>
  )
  
}

export default NoticiasSinglepagess