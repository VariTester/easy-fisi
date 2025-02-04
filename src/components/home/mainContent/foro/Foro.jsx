import React from "react";
import "./foro.css";
import { foro } from "../../../../data";
import Heading from "../../../common/Heading/Heading";
import Slider from "react-slick";

const Foro = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
  };

  return (
    <>
      <section className="foro">
        <Heading title="Foro para charlar" />
        <div className="content">
          <div className="new-topic">
            <h2>Start a New Topic</h2>
          </div>
          <Slider {...settings}>
            {foro.map((val) => {
              return (
                <div key={val.id} className="items">
                  <div className="box shadow flexSB">
                    {/* Imagen y Categoría */}
                    <div className="images">
                      <div className="img">
                        <img src={val.cover} alt={val.title} />
                      </div>
                      <div className="category category1">
                        <span>{val.catgeory}</span>
                      </div>
                    </div>

                    {/* Contenido del Foro */}
                    <div className="text">
                      <h1 className="title">{val.title.slice(0, 40)}...</h1>

                      {/* Fecha */}
                      <div className="date">
                        {/* <img className="imgAvatar" src={val.cover} alt={val.title}/> */}
                        <i className="fas fa-calendar-days"></i>
                        <label>{val.date}</label>
                      </div>

                      {/* Descripción */}
                      <p className="desc">{val.desc.slice(0, 250)}...</p>

                      {/* Likes y Comentarios */}
                      <div className="comment">
                        <i className="fas fa-thumbs-up"></i>
                        <label>Likes / </label>
                        <i className="fas fa-comment"></i>
                        <label>{val.comments}</label>
                      </div>

                      {/* Input para comentar */}
                      <div className="comment-section">
                        <input
                          className="inputForo"
                          type="text"
                          placeholder="Escribe un comentario..."
                        />
                        <button className="btnSendForo" onClick={() => alert("Comentario enviado!")}>
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Foro;
