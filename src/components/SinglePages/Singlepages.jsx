import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { tramites } from "../../data"
import "../SinglePages/singlepages.css"
import Side from "../home/sideContent/side/Side"

const Singlepages = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    const foundItem = tramites.find((t) => t.id === parseInt(id))
    window.scrollTo(0, 0)
    if (foundItem) setItem(foundItem)
  }, [id])

  if (!item) return <h1>not found</h1>

  return (
    <main>
      <div className="container">
        <section className="mainContent detailsSP">
          {/* Título */}
          <h1 className="titleSP">{item.title}</h1>

          {/* Info superior */}
          <div className="infoSP">
            <div className="date">
              <i className="fas fa-calendar-days"></i>
              <label>{item.date}</label>
            </div>

            <div className="comment">
              <i className="fas fa-clock"></i>
              <label>{item.comments}</label>
            </div>

            <div className="comment">
              <i className="fas fa-dollar"></i>
              <label>{item.costo}</label>
            </div>
          </div>

          {/* Formatos */}
          <div className="formatsSP">
            <h1 className="tittleFormatosSP">Formatos</h1>
            {item.formatos && item.formatos.length > 0 ? (
              item.formatos.map((val, index) => {
                const formatoKey = Object.keys(val).find((key) =>
                  key.startsWith("formato")
                )
                return (
                  <div key={index} className="text-containerLinksSP">
                    {formatoKey && val[formatoKey] ? (
                  <a
                    href={val[formatoKey]}
                    download={`${val.nombre}.pdf`}  // 👈 fuerza el nombre
                    className="formato-linkSP"
                  >
                    {val.nombre}
                  </a>

                    ) : (
                      <p>No hay formato disponible</p>
                    )}
                  </div>
                )
              })
            ) : (
              <p>No hay formatos disponibles</p>
            )}
          </div>

          {/* Descripción */}
          <div className="desctopSP">
            {item.desc.map((val, index) => (
              <div key={index} className="text-containerSP">
                {val.para1 && <p className="para1SP">{val.para1}</p>}

                {/* Solo muestra imagen si existe */}
                {index === 0 && item.imagenes && item.imagenes.length > 0 && (
                  <div className="imagenes-contenedor">
                    {Object.values(item.imagenes[0])
                      .filter(Boolean) // elimina valores null o undefined
                      .map((imgSrc, i) => (
                        <img
                          key={i}
                          src={imgSrc}
                          alt={`Imagen relacionada ${i + 1}`}
                          className="imagen-estilo"
                        />
                      ))}
                  </div>
                )}


                {Array.from({ length: 20 }, (_, i) => i + 2).map((num) => {
                  const key = `para${num}`
                  return val[key] ? (
                    <p key={key} className={`para${num}SP`}>
                      {val[key]}
                    </p>
                  ) : null
                })}
                {val.docNecesarios && <p className="docNecesarios">{val.docNecesarios}</p>}
              </div>
            ))}
          </div>

                    {/* docNesesarios */}
          <div className="descbotSP">
            {item.docsNecesariosData.map((val, index) => (
              <div key={index} className="text-containerSP">
                <h1>{val.title}</h1>
                {val.para1 && <p className="para1SP">{val.para1}</p>}

                {Array.from({ length: 20 }, (_, i) => i + 2).map((num) => {
                  const key = `para${num}`
                  return val[key] ? (
                    <p key={key} className={`para${num}SP`}>
                      {val[key]}
                    </p>
                  ) : null
                })}
          
              </div>
            ))}
          </div>

          {/* Detalles (Pasos) */}
          <div className="descbotSP">
            {item.details.map((data, index) => (
              <div key={index}>
                <h1>{data.title}</h1>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
                  const key = `para${num}`
                  return data[key] ? (
                    <p key={key} className="parrafo">
                      {data[key]}
                    </p>
                  ) : null
                })}
              </div>
            ))}
          </div>

          {/* Frase final */}
          <div className="quoteSP">
            <i className="fa fa-quote-left"></i>
            {item.details.map((data, index) =>
              data.quote ? <p key={index}>{data.quote}</p> : null
            )}
          </div>
        </section>

        {/* Sidebar */}
        <section className="sideContent">
          <Side />
        </section>
      </div>
    </main>
  )
}

export default Singlepages
