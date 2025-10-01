import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./foro.css";
import Heading from "../../../common/Heading/Heading";
import Slider from "react-slick";
import { db } from "../../../../firebase/firebaseConfig";
import Swal from 'sweetalert2';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  doc,
  updateDoc,
  increment,
  setDoc,
  getDoc
} from "firebase/firestore";

const Foro = ({ usuario }) => {
  const [temas, setTemas] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState({});
  const [comentarios, setComentarios] = useState({});
  const [mostrarComentarios, setMostrarComentarios] = useState({});
  const [likesUsuario, setLikesUsuario] = useState({});
  const [nuevoTema, setNuevoTema] = useState({ title: "", desc: "" });

  const toggleComentarios = (temaId) => {
    setMostrarComentarios((prev) => ({
      ...prev,
      [temaId]: !prev[temaId],
    }));
  };

  const obtenerTemas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "temas"));
      const temasFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTemas(temasFirebase);

      // Comentarios accesibles para todos
      for (const tema of temasFirebase) {
        const comentariosSnapshot = await getDocs(
          query(
            collection(db, `temas/${tema.id}/comentarios`),
            orderBy("fecha", "desc")
          )
        );
        const comentariosData = comentariosSnapshot.docs.map((doc) => doc.data());
        setComentarios((prev) => ({ ...prev, [tema.id]: comentariosData }));
      }

      // Likes solo para usuarios verificados
      if (usuario?.emailVerified) {
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

    } catch (error) {
      console.error("Error al cargar temas:", error);
    }
  };

const crearNuevoTema = async () => {
  if (!usuario) {
    return Swal.fire({
      icon: 'warning',
      title: 'Inicia sesión',
      text: 'Debes iniciar sesión para publicar un tema.',
    });
  }

  if (!usuario.emailVerified) {
    return Swal.fire({
      icon: 'warning',
      title: 'Correo no verificado',
      text: 'Verifica tu correo institucional antes de publicar.',
    });
  }

  if (!nuevoTema.title.trim() || !nuevoTema.desc.trim()) {
    return Swal.fire({
      icon: 'info',
      title: 'Campos incompletos',
      text: 'Por favor, completa todos los campos para publicar un tema.',
    });
  }

  try {
    await addDoc(collection(db, "temas"), {
      title: nuevoTema.title,
      desc: nuevoTema.desc,
      fecha: serverTimestamp(),
      likes: 0,
    });

    Swal.fire({
      icon: 'success',
      title: '¡Tema publicado!',
      text: 'Gracias por iniciar una nueva discusión.',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });

    setNuevoTema({ title: "", desc: "" });
    obtenerTemas();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al publicar',
      text: 'Hubo un problema al crear el tema. Inténtalo de nuevo.',
    });
  }
};

const enviarComentario = async (temaId, texto) => {
  if (!usuario) {
    Swal.fire({
      icon: 'warning',
      title: 'Inicia sesión',
      text: 'Debes iniciar sesión para comentar',
    });
    return;
  }

  if (!usuario.emailVerified) {
    Swal.fire({
      icon: 'warning',
      title: 'Correo no verificado',
      text: 'Debes verificar tu correo institucional para realizar esta acción.',
    });
    return;
  }

  if (!texto || texto.trim() === '') {
    Swal.fire({
      icon: 'error',
      title: 'Comentario vacío',
      text: 'Por favor escribe algo antes de comentar.',
    });
    return;
  }

  await addDoc(collection(db, `temas/${temaId}/comentarios`), {
    texto,
    autor: usuario.email,
    fecha: serverTimestamp(),
  });

  // ✅ Alerta automática y sin botón
  Swal.fire({
    icon: 'success',
    title: '¡Comentario enviado!',
    text: 'Tu mensaje ha sido publicado.',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  setNuevoComentario({ ...nuevoComentario, [temaId]: '' });
  obtenerTemas();
};


const darLike = async (temaId) => {
  if (!usuario) {
    return Swal.fire({
      icon: 'warning',
      title: 'Inicia sesión',
      timer: 2000,
      text: 'Debes iniciar sesión para dar like',
    });
    
  }

  if (!usuario.emailVerified) {
    return Swal.fire({
      icon: 'warning',
      title: 'Correo no verificado',
      text: 'Verifica tu correo institucional para dar like',
    });
  }

  const likeDocRef = doc(db, `temas/${temaId}/likes/${usuario.email}`);
  const docSnap = await getDoc(likeDocRef);

  if (docSnap.exists()) {
    return Swal.fire({
      icon: 'info',
      title: 'Ya diste like 😉',
      text: 'Solo puedes dar like una vez por tema.',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }

  await updateDoc(doc(db, "temas", temaId), {
    likes: increment(1),
  });

  await setDoc(likeDocRef, {
    fecha: serverTimestamp(),
  });

  Swal.fire({
    icon: 'success',
    title: '¡Gracias por tu like!',
    text: 'Tu apoyo ayuda a mantener activo el foro.',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  obtenerTemas();
};

  useEffect(() => {
    obtenerTemas();
  }, []);

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

  return (
    <section className="foro">
      <Heading title="Foro" />
      <Link to={`/foro/`} style={{ all: "unset" }}>
        <div className="content">
          <div className="new-topic">
            <h2>Empezar una nueva discusión</h2>
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
                    <h1 className="title">{val.title?.slice(0, 40) || "Sin título"}...</h1>
                    <div className="date">
                      <i className="fas fa-calendar-days"></i>
                      <label>
                        {val.fecha ? val.fecha.toDate().toLocaleDateString() : "Sin fecha"}
                      </label>
                    </div>
                    <p className="desc">
                      {val.desc?.slice(0, 200) || "Sin descripción"}...
                    </p>

                    <div className="comment">
                      <i
                        className="fas fa-thumbs-up"
                        style={{
                          cursor: usuario?.emailVerified ? "pointer" : "default",
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

                    {usuario ? (
                      usuario.emailVerified ? (
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
                      ) : (
                        <div className="foro-login-msg">
                          <i className="fas fa-lock"></i>
                          Verifica tu correo para comentar.
                        </div>
                      )
                    ) : (
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
