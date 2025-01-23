import React from 'react';
import { Link } from "react-router-dom";

const Card = ({ item: { id, cover, category, title, authorName, time } }) => {
  return (
    <div className="box">
      <div className="img">
        <img src={cover || "https://via.placeholder.com/300"} alt={title || "Imagen"} />
      </div>
      <div className="text">
        <span className="category">{category || "Sin categoría"}</span>
        <Link to={`/Noticia/${id}`}>
          <h1 className="titleBg">{title || "Título no disponible"}</h1>
        </Link>
        {/* <div className="author flex">
          <span>{authorName ? `by ${authorName}` : "Autor desconocido"}</span>
          <span>{time || "Hace un momento"}</span>
        </div> */}
      </div>
    </div>
  );
};


export default Card;
