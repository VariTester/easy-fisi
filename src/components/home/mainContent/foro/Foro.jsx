import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./foro.css";
import Heading from "../../../common/Heading/Heading";
import Slider from "react-slick";
import { db } from "../../../../firebase/firebaseConfig";

import { doc, updateDoc, increment, setDoc, getDoc } from "firebase/firestore";

import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const Foro = ({ usuario }) => {
  

  const [temas, setTemas] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState({});
  const [comentarios, setComentarios] = useState({});
  const [mostrarComentarios, setMostrarComentarios] = useState({});

  const [likesUsuario, setLikesUsuario] = useState({});

const toggleComentarios = (temaId) => {
  setMostrarComentarios((prev) => ({
    ...prev,
    [temaId]: !prev[temaId],
  }));
};


const darLike = async (temaId) => {
  if (!usuario) return alert("Debes iniciar sesión para dar like");

  const likeDocRef = doc(db, `temas/${temaId}/likes/${usuario.email}`);
  const docSnap = await getDoc(likeDocRef);

  if (docSnap.exists()) {
    alert("Ya diste like a este tema 😉");
    return;
  }

  const temaRef = doc(db, "temas", temaId);
  await updateDoc(temaRef, {
    likes: increment(1),
  });

  await setDoc(likeDocRef, {
    fecha: serverTimestamp(),
  });

  obtenerTemas();
};


const obtenerTemas = async () => {
  const querySnapshot = await getDocs(collection(db, "temas"));
  const temasFirebase = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  setTemas(temasFirebase);

  // Obtener comentarios
  for (const tema of temasFirebase) {
    const comentariosSnapshot = await getDocs(
      query(collection(db, `temas/${tema.id}/comentarios`), orderBy("fecha", "desc"))
    );
    const comentariosData = comentariosSnapshot.docs.map((doc) => doc.data());
    setComentarios((prev) => ({ ...prev, [tema.id]: comentariosData }));
  }

  // Verificar si el usuario ya dio like a cada tema
  if (usuario) {
    const nuevosLikes = {};
    for (const tema of temasFirebase) {
      const likeDocRef = doc(db, `temas/${tema.id}/likes/${usuario.email}`);
      const likeSnap = await getDoc(likeDocRef);
      nuevosLikes[tema.id] = likeSnap.exists();
    }
    setLikesUsuario(nuevosLikes);
  } else {
    setLikesUsuario({});
  }
};


  const enviarComentario = async (temaId, texto) => {
    if (!usuario) return alert("Debes iniciar sesión para comentar");
    if (!texto || texto.trim() === "") return alert("Comentario vacío");

    await addDoc(collection(db, `temas/${temaId}/comentarios`), {
      texto,
      autor: usuario.email,
      fecha: serverTimestamp(),
    });

    alert("Comentario enviado!");
    setNuevoComentario({ ...nuevoComentario, [temaId]: "" });
    obtenerTemas(); // Recargar para mostrar nuevo comentario
  };

  useEffect(() => {
    obtenerTemas();
  }, []);

  // const settings = {
  //   className: "center",
  //   centerMode: true,
  //   infinite: true,
  //   centerPadding: "0",
  //   slidesToShow: 1,
  //   speed: 500,
  //   rows: 2,
  //   slidesPerRow: 1,
  // };

  const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "0",
  slidesToShow: 1,
  speed: 500,
  rows: 2,
  slidesPerRow: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        rows: 1,
        slidesPerRow: 1,
        centerMode: false,
      },
    },
  ],
};

const [nuevoTema, setNuevoTema] = useState({ title: "", desc: "" });

const crearNuevoTema = async () => {
  console.log("Usuario en Foro.jsx:", usuario);

  if (!usuario) return alert("Debes iniciar sesión para publicar un tema");
  if (!nuevoTema.title.trim() || !nuevoTema.desc.trim())
    return alert("Completa todos los campos");

  await addDoc(collection(db, "temas"), {
    title: nuevoTema.title,
    desc: nuevoTema.desc,
    fecha: serverTimestamp(),
    likes: 0,
  });

  alert("Tema creado correctamente");
  setNuevoTema({ title: "", desc: "" });
  obtenerTemas(); // recarga los temas
};


  return (
    <section className="foro">
      <Heading title="Foro para charlar" />
      <Link to={`/foro/`} style={{ all: "unset" }}>
      <div className="content">
        {/* <div className="new-topic">
          <h2>Start a New Topic</h2>
        </div> */}

          <div className="new-topic">
  <h2>Start a New Topic</h2>
  {usuario ? (
    <>
      <input
        className="inputForo"
        type="text"
        placeholder="Título del tema"
        value={nuevoTema.title}
        onChange={(e) => setNuevoTema({ ...nuevoTema, title: e.target.value })}
      />
      <textarea
        className="inputForo"
        placeholder="Descripción del tema"
        value={nuevoTema.desc}
        rows={4}
        onChange={(e) => setNuevoTema({ ...nuevoTema, desc: e.target.value })}
        style={{ resize: "none" }}
      />
      <button className="btnSendForo" onClick={crearNuevoTema}>
        Publicar Tema
      </button>
    </>
  ) : (
    <div className="foro-login-msg">
      <i className="fas fa-lock"></i>
      Inicia sesión para crear un nuevo tema.
    </div>
  )}
</div>

        {temas.length === 0 && (
          <p style={{ textAlign: "center", color: "gray" }}>
            Aún no hay temas en el foro. ¡Sé el primero en crear uno!
          </p>
        )}

        <Slider {...settings}>
          {temas.map((val) => (
            <div key={val.id} className="items">
              <div className="box shadow flexSB">
                <div className="text">
                  <h1 className="title">
                    {val.title?.slice(0, 40) || "Sin título"}...
                  </h1>

                  <div className="date">
                    <i className="fas fa-calendar-days"></i>
                    <label>
                      {val.fecha
                        ? val.fecha.toDate().toLocaleDateString()
                        : "Sin fecha"}
                    </label>
                  </div>

                  <p className="desc">
                    {val.desc?.slice(0, 200) || "Sin descripción"}...
                  </p>

                  <div className="comment">
                  <i
                    className="fas fa-thumbs-up"
                    style={{
                      cursor: usuario ? "pointer" : "default",
                      color: likesUsuario[val.id] ? "green" : "gray",
                    }}
                    onClick={() => {
                      if (!likesUsuario[val.id]) darLike(val.id);
                    }}
                  ></i>

                    <label>{val.likes || 0} Likes / </label>
                    <i
                      className="fas fa-comment"
                      style={{ cursor: "pointer", color: mostrarComentarios[val.id] ? "blue" : "gray" }}
                      onClick={() => toggleComentarios(val.id)}
                    ></i>
                    <label onClick={() => toggleComentarios(val.id)} style={{ cursor: "pointer" }}>
                      {comentarios[val.id]?.length || 0} Comentarios
                    </label>

                  </div>


                    {mostrarComentarios[val.id] &&
                      comentarios[val.id] &&
                      comentarios[val.id].length > 0 && (
                        <div className="comentarios-lista">
                          {comentarios[val.id].map((comentario, idx) => (
                            <div key={idx} className="comentario-item">
                              <strong>{comentario.autor}</strong>: {comentario.texto}
                            </div>
                          ))}
                        </div>
                    )}


                  {usuario && (
                    <div className="comment-section">
                      <input
                        className="inputForo"
                        type="text"
                        placeholder="Escribe un comentario..."
                        value={nuevoComentario[val.id] || ""}
                        onChange={(e) =>
                          setNuevoComentario({
                            ...nuevoComentario,
                            [val.id]: e.target.value,
                          })
                        }
                      />
                      <button
                        className="btnSendForo"
                        onClick={() =>
                          enviarComentario(val.id, nuevoComentario[val.id])
                        }
                      >
                        Send
                      </button>
                    </div>
                  )}

{!usuario && (
  <div className="foro-login-msg">
    <i className="fas fa-lock"></i>
    Inicia sesión para comentar.
  </div>
)}

                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      </Link>
    </section>
  );
};

export default Foro;