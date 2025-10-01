import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./foro.css";
import Heading from "../../../common/Heading/Heading";
import Slider from "react-slick";
import { db } from "../../../../firebase/firebaseConfig";
import Swal from "sweetalert2";

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
  getDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const Foro = ({ usuario }) => {
  const [temas, setTemas] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState({});
  const [comentarios, setComentarios] = useState({});
  const [mostrarComentarios, setMostrarComentarios] = useState({});
  const [likesUsuario, setLikesUsuario] = useState({});
  const [nuevoTema, setNuevoTema] = useState({ title: "", desc: "" });
  const [menuAbierto, setMenuAbierto] = useState(null);


  const toggleComentarios = (temaId) => {
    setMostrarComentarios((prev) => ({
      ...prev,
      [temaId]: !prev[temaId],
    }));
  };

  const obtenerTemas = () => {
  try {
    // Escuchar temas en tiempo real
    const unsubscribeTemas = onSnapshot(collection(db, "temas"), async (snapshot) => {
      const temasFirebase = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTemas(temasFirebase);

      // Escuchar comentarios de cada tema
      for (const tema of temasFirebase) {
        onSnapshot(
          query(collection(db, `temas/${tema.id}/comentarios`), orderBy("fecha", "desc")),
          (comentariosSnapshot) => {
            const comentariosData = comentariosSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setComentarios((prev) => ({ ...prev, [tema.id]: comentariosData }));
          }
        );
      }

      // Escuchar likes en tiempo real (solo si el usuario está logueado y verificado)
      if (usuario?.emailVerified) {
        for (const tema of temasFirebase) {
          const likeDocRef = doc(db, `temas/${tema.id}/likes/${usuario.email}`);
          onSnapshot(likeDocRef, (likeSnap) => {
            setLikesUsuario((prev) => ({
              ...prev,
              [tema.id]: likeSnap.exists(),
            }));
          });
        }
      }
    });

    return unsubscribeTemas;
  } catch (error) {
    console.error("Error al cargar temas:", error);
  }
};

  const crearNuevoTema = async () => {
    if (!usuario) {
      return Swal.fire({
        icon: "warning",
        title: "Inicia sesión",
        text: "Debes iniciar sesión para publicar un tema.",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }

    if (!usuario.emailVerified) {
      return Swal.fire({
        icon: "warning",
        title: "Correo no verificado",
        text: "Verifica tu correo institucional antes de publicar.",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }

    if (!nuevoTema.title.trim() || !nuevoTema.desc.trim()) {
      return Swal.fire({
        icon: "info",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos para publicar un tema.",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
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
        icon: "success",
        title: "¡Tema publicado!",
        text: "Gracias por iniciar una nueva discusión.",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      setNuevoTema({ title: "", desc: "" });
      obtenerTemas();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al publicar",
        text: "Hubo un problema al crear el tema. Inténtalo de nuevo.",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  const enviarComentario = async (temaId, texto) => {
    if (!usuario) {
      return Swal.fire({
        icon: "warning",
        title: "Inicia sesión",
        text: "Debes iniciar sesión para comentar",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }

    if (!usuario.emailVerified) {
      return Swal.fire({
        icon: "warning",
        title: "Correo no verificado",
        text: "Debes verificar tu correo institucional para realizar esta acción.",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }

    if (!texto || texto.trim() === "") {
      return Swal.fire({
        icon: "error",
        title: "Comentario vacío",
        text: "Por favor escribe algo antes de comentar.",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }

    await addDoc(collection(db, `temas/${temaId}/comentarios`), {
      texto,
      autor: usuario.email,
      fecha: serverTimestamp(),
    });

    Swal.fire({
      icon: "success",
      title: "¡Comentario enviado!",
      text: "Tu mensaje ha sido publicado.",
      showConfirmButton: false,
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });

    setNuevoComentario({ ...nuevoComentario, [temaId]: "" });
    obtenerTemas();
  };

  // 🔹 Toggle Like (da y quita)
const toggleLike = async (temaId) => {
  if (!usuario) {
    return Swal.fire({
      icon: "warning",
      title: "Inicia sesión",
      text: "Debes iniciar sesión para dar like",
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }

  if (!usuario.emailVerified) {
    return Swal.fire({
      icon: "warning",
      title: "Correo no verificado",
      text: "Verifica tu correo institucional para dar like",
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }

  const likeDocRef = doc(db, `temas/${temaId}/likes/${usuario.email}`);
  const docSnap = await getDoc(likeDocRef);

  if (docSnap.exists()) {
    // 👎 Quitar like
    await updateDoc(doc(db, "temas", temaId), { likes: increment(-1) });
    await deleteDoc(likeDocRef);
    setLikesUsuario((prev) => ({ ...prev, [temaId]: false }));
    // También actualizo localmente el contador
    // setTemas((prev) =>
    //   prev.map((t) =>
    //     t.id === temaId ? { ...t, likes: t.likes - 1 } : t
    //   )
    // );
  } else {
    // 👍 Dar like
    await updateDoc(doc(db, "temas", temaId), { likes: increment(1) });
    await setDoc(likeDocRef, { fecha: serverTimestamp() });
    setLikesUsuario((prev) => ({ ...prev, [temaId]: true }));
    // También actualizo localmente el contador
    // setTemas((prev) =>
    //   prev.map((t) =>
    //     t.id === temaId ? { ...t, likes: t.likes + 1 } : t
    //   )
    // );
  }
};


  // 🔹 Borrar comentario
  const borrarComentario = async (temaId, comentarioId) => {
    try {
      await deleteDoc(doc(db, `temas/${temaId}/comentarios/${comentarioId}`));
      Swal.fire("Eliminado", "Tu comentario fue borrado.", "success");
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Tu comentario fue eliminado",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      obtenerTemas();
    } catch (err) {
      Swal.fire("Error", "No se pudo borrar.", "error");
    }
  };

  // 🔹 Editar comentario
  const editarComentario = async (temaId, comentarioId, nuevoTexto) => {
    if (!nuevoTexto.trim()) return;
    try {
      await updateDoc(doc(db, `temas/${temaId}/comentarios/${comentarioId}`), {
        texto: nuevoTexto,
        
      });
      Swal.fire({
        icon: "success",
        title: "Editado",
        text: "Tu comentario fue actualizado",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      
      obtenerTemas();
    } catch (err) {
      Swal.fire("Error", "No se pudo editar", "error");
    }
  };

useEffect(() => {
  const unsubscribe = obtenerTemas();
  return () => {
    if (unsubscribe) unsubscribe(); // cleanup
  };
}, [usuario]);


  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          rows: 1,
          slidesPerRow: 1,
          centerMode: false,
          nextArrow: false,
          prevArrow: false,
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "grey",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          zIndex: 2,
          marginRight: "10px",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "grey",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          zIndex: 2,
          marginLeft: "10px",
        }}
        onClick={onClick}
      />
    );
  }

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
                  onChange={(e) =>
                    setNuevoTema({ ...nuevoTema, title: e.target.value })
                  }
                />
                <textarea
                  className="inputForo"
                  placeholder="Descripción del tema"
                  value={nuevoTema.desc}
                  rows={4}
                  onChange={(e) =>
                    setNuevoTema({ ...nuevoTema, desc: e.target.value })
                  }
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
                      {val.title?.slice(0, 80) || "Sin título"}...
                    </h1>

                      <div className="date">
                        <i className="fas fa-user"></i>
                        <label>
                          {val.autor || "Sin Autor"}
                        </label>
                      </div>

                    <div className="date">
                      <i className="fas fa-calendar-days"></i>
                      <label>
                        {val.fecha
                          ? val.fecha.toDate().toLocaleDateString()
                          : "Sin fecha"}
                      </label>
                    </div>
                    <p className="desc">
                      {val.desc?.slice(0, 1000) || "Sin descripción"}...
                    </p>

                    <div className="comment">
                      <i
                        className="fas fa-thumbs-up"
                        style={{
                          cursor: usuario?.emailVerified ? "pointer" : "default",
                          color: likesUsuario[val.id] ? "#1877F2" : "gray",
                        }}
                        onClick={() => toggleLike(val.id)}
                      ></i>

                      <label>{val.likes || 0} Likes / </label>
                      <i
                        className="fas fa-comment"
                        style={{
                          cursor: "pointer",
                          color: mostrarComentarios[val.id] ? "#1877F2" : "gray",
                        }}
                        onClick={() => toggleComentarios(val.id)}
                      ></i>
                      <label
                        onClick={() => toggleComentarios(val.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {comentarios[val.id]?.length || 0} Comentarios
                      </label>
                    </div>

                    {mostrarComentarios[val.id] &&
                      comentarios[val.id] &&
                      comentarios[val.id].length > 0 && (
                        <div className="comentarios-lista">
                          {comentarios[val.id].map((comentario) => (
<div key={comentario.id} className="comentario-item">
  <div className="comentario-contenido">
    <strong>{comentario.autor}</strong>: {comentario.texto}
  </div>

  {usuario?.email === comentario.autor && (
    <div className="comentario-menu">
      {/* Botón de tres puntos */}
      <button
        className="menu-btn"
        onClick={() =>
          setMenuAbierto(menuAbierto === comentario.id ? null : comentario.id)
        }
      >
        <i className="fas fa-ellipsis-h"></i>
      </button>

      {/* Menú desplegable */}
      {menuAbierto === comentario.id && (
        <div className="menu-opciones">
          <button
            onClick={() => {
              Swal.fire({
                title: "Editar comentario",
                input: "text",
                inputValue: comentario.texto,
                showCancelButton: true,
                confirmButtonText: "Guardar",
              }).then((res) => {
                if (res.isConfirmed) {
                  editarComentario(val.id, comentario.id, res.value);
                }
              });
              setMenuAbierto(null);
            }}
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => {
              borrarComentario(val.id, comentario.id);
              setMenuAbierto(null);
            }}
          >
            🗑️ Borrar
          </button>
        </div>
      )}
    </div>
  )}
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
