import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { tramites } from "../../data"
import './SinglePageSlider/singlepage.css'
import Side from "../home/sideContent/side/Side"
// import SinglePageSlider from './SinglePageSlider/SinglePageSlider'
// import autor1 from "../common/images/autores/author.jpg";
// import noticia1 from "../common/images/hero/direpro1.jpg";

const Singlepages = () =>  {
    const {id} = useParams()
    const [item,setItem] = useState(null)

    useEffect(() => {
        const item = tramites.find((item)=>item.id === parseInt(id))
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

{/* titulo*/} <h1 className='title'>{item.title}</h1> 

              <div className="info">
{/*fecha*/}   <div className="date">
                        <i className='fas fa-calendar-days'></i>
                        <label>{item.date}</label>
                </div>

                <div className="comment">
                        <i className='fas fa-clock'></i>
                        <label>{item.comments}</label>
                </div>

                <div className="comment">
                        <i className='fas fa-dollar'></i>
                        <label>{item.costo}</label>
                </div>
              </div>

{/* Formatos*/} <div className='formats'>
                <h1 className="tittleFormatos">Formatos</h1>
                {item.formatos && item.formatos.length > 0 ? (
                  item.formatos.map((val, index) => {
                    // Extraer la clave del formato (formato11_1, formato11_2, etc.)
                    const formatoKey = Object.keys(val).find(key => key.startsWith("formato"));
                    
                    return (
                      <div key={index} className='text-containerLinks'>
                        {formatoKey && val[formatoKey] ? (
                          <a href={val[formatoKey]} download className='formato-link'>
                            {val.nombre}
                          </a>
                        ) : (
                          <p>No hay formato disponible</p>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p>No hay formatos disponibles</p>
                )}
              </div>

              <div className='desctop'>
                {item.desc.map((val, index) => (
                  <div key={index} className='text-container'>
{/*Introducción*/}{val.para1 && <p className='para1'>{val.para1}</p>} 

{/*FotoRef*/}       {/* Imagen debajo de para1 */}
                    {index === 0 && item.imagenes?.[0]?.img1 && (
                      <img 
                        src={item.imagenes[0].img1} 
                        alt="Imagen relacionada" 
                        className="imagen-estilo"
                      />
                    )}

{/*DocuNece*/}      {val.para2 && <p className='para2'>{val.para2}</p>} 
                    {val.para3 && <p className='para3'>{val.para3}</p>}                
                    {val.para4 && <p className='para4'>{val.para4}</p>} 
                    {val.para5 && <p className='para5'>{val.para5}</p>} 
                  </div>
                ))}
              </div>
              
              {item.desc.map((val) => (
                <p>{val.para3}</p>
              ))}

              <div className='descbot'>
                {item.details.map((data) => {
                  return (
                    <>
{/*Pasos*/}           <h1>{data.title}</h1>
                      <p>{data.para1}</p>
                      <p>{data.para2}</p>
                      <p>{data.para3}</p>
                    </>
                  )
                })}
              </div>

              <div className='quote'>
                <i className='fa fa-quote-left'></i>
                {item.details.map((data) => (
                  <p>{data.quote}</p>
                ))}
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

export default Singlepages