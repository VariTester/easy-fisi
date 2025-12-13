import React, { useEffect, useState } from 'react';
import Heading from '../../../common/Heading/Heading';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./tramites.css";

import Swal from "sweetalert2";

import { Link } from 'react-router-dom'; 
import { 
  FaUserGraduate, 
  FaFileAlt, 
  FaMedal, 
  FaBookOpen, 
  FaClock, 
  FaDollarSign 
} from "react-icons/fa";

import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig"; 
import { getAuth } from "firebase/auth";

const EMPTY_TRAMITE = {
  title: "",
  duracion: "",
  costo: "",
  date: "",
  desc: [{ para1: "" }],
  docsNecesariosData: [{ title: "Documentos necesarios:", para1: "" }],
  details: [{ title: "", para1: "", quote: "" }],
};

const Tramites = () => {

  // ================================
  // STATES
  // ================================
  const [tramites, setTramites] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  const auth = getAuth();

  const [newTramite, setNewTramite] = useState(
  structuredClone(EMPTY_TRAMITE)
);


  // const [newTramite, setNewTramite] = useState({
  //   title: "",
  //   duracion: "",
  //   costo: "",
  //   date: "",
  //   desc: [{ para1: "" }],
  //   docsNecesariosData: [{ title: "Documentos necesarios: ", para1: "" }],
  //   details: [{ title: "", para1: "", quote: "" }],
  // });

  // ================================
  // 🔥 Obtener trámites de Firebase
  // ================================
  useEffect(() => {
    const obtenerTramites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tramites"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTramites(data);
      } catch (error) {
        console.error("Error obteniendo trámites:", error);
      }
    };
    obtenerTramites();
  }, []);

  // ================================
  // 🔥 Obtener correo igual que SINGLEPAGES
  // ================================
  useEffect(() => {
    const user = auth.currentUser;
    if (user) setCurrentUserEmail(user.email);
  }, [auth.currentUser]);

  const canAdd = currentUserEmail === "2175267@unapiquitos.edu.pe";

  // ================================
  // 🔧 Funciones de edición
  // ================================
  const updateNewTramiteField = (path, value) => {
    setNewTramite(prev => {
      const updated = structuredClone(prev);
      let ref = updated;
      for (let i = 0; i < path.length - 1; i++) ref = ref[path[i]];
      ref[path[path.length - 1]] = value;
      return updated;
    });
  };

  const addPara = (section) => {
    const updated = structuredClone(newTramite);
    const lastItem = updated[section][updated[section].length - 1];
    const existingParas = Object.keys(lastItem).filter(k => k.startsWith("para"));
    const nextParaNumber = existingParas.length + 1;
    lastItem[`para${nextParaNumber}`] = "";
    setNewTramite(updated);
  };

const cleanArray = (arr) =>
  arr
    .map(obj => {
      const cleanObj = {};

      Object.keys(obj).forEach(key => {
        if (key === "title" && obj[key]?.trim()) {
          cleanObj[key] = obj[key].trim();
        }

        if (key === "quote" && obj[key]?.trim()) {
          cleanObj[key] = obj[key].trim();
        }

        if (key.startsWith("para") && obj[key]?.trim()) {
          cleanObj[key] = obj[key].trim();
        }
      });

      return cleanObj;
    })
    // 🔥 eliminar objetos sin contenido real
    .filter(obj =>
      Object.keys(obj).some(k =>
        k === "title" || k.startsWith("para") || k === "quote"
      )
    );



// const saveNewTramite = async () => {
//   try {
//     // Guardar en Firebase
//     const docRef = await addDoc(collection(db, "tramites"), newTramite);

//     // 🔥 Actualizar estado SIN refrescar
//     setTramites(prev => [
//       ...prev,
//       { id: docRef.id, ...newTramite }
//     ]);

//     setShowForm(false);

//     // Limpiar formulario
//     setNewTramite({
//       title: "",
//       duracion: "",
//       costo: "",
//       date: "",
//       desc: [{ para1: "" }],
//       docsNecesariosData: [{ title: "", para1: "" }],
//       details: [{ title: "", para1: "", quote: "" }],
//     });

//     // ✅ SweetAlert éxito (igual que Singlepages)
//     Swal.fire({
//       icon: 'success',
//       title: 'Trámite agregado',
//       showConfirmButton: false,
//       timer: 2000,
//       timerProgressBar: true,
//       position: 'top-end',
//       toast: true
//     });

//   } catch (error) {
//     console.error("🔥 ERROR FIREBASE:", error);

//     Swal.fire({
//       icon: 'error',
//       title: 'Error al guardar',
//       text: error.message,
//       showConfirmButton: true
//     });
//   }
// };

  // ================================
  // Render principal
  // ================================

const saveNewTramite = async () => {
  try {
    // VALIDACIÓN
    if (
      !newTramite.title.trim() ||
      !newTramite.duracion.trim() ||
      !newTramite.costo.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos obligatorios",
        text: "Título, duración y costo no pueden estar vacíos",
      });
      return;
    }

    const safeData = {
      title: newTramite.title.trim(),
      duracion: newTramite.duracion.trim(),
      costo: newTramite.costo.trim(),
      date: newTramite.date.trim(),
      desc: cleanArray(newTramite.desc),
      docsNecesariosData: cleanArray(newTramite.docsNecesariosData),
      details: cleanArray(newTramite.details),
    };

    const docRef = await addDoc(collection(db, "tramites"), safeData);

    setTramites(prev => [...prev, { id: docRef.id, ...safeData }]);
    setNewTramite(structuredClone(EMPTY_TRAMITE));
    setShowForm(false);


    Swal.fire({
      icon: 'success',
      title: 'Trámite agregado',
      showConfirmButton: false,
      timer: 2000,
      position: 'top-end',
      toast: true
    });

  } catch (error) {
    console.error("🔥 ERROR FIREBASE:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error al guardar',
      text: error.message
    });
  }
};


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    rows: 6,
    slidesPerRow: 2,
    nextArrow: <div className="arrow next">›</div>,
    prevArrow: <div className="arrow prev">‹</div>,
    responsive: [
      {
        breakpoint: 768,
        settings: { 
          rows: 3,
          slidesPerRow: 1,
        },
      },
    ],
  };

  const iconMap = {
    matricula: <FaUserGraduate />,
    bachiller: <FaMedal />,
    diploma: <FaFileAlt />,
    nivelacion: <FaBookOpen />,
  };

  const getIcon = (title) => {
    const key = title.toLowerCase();
    const match = Object.keys(iconMap).find(k => key.includes(k));
    return match ? iconMap[match] : <FaFileAlt />;
  };

  const toggleForm = () => {
  if (showForm) {
    // 🧹 Si estaba abierto y se cancela → limpiar
    setNewTramite(structuredClone(EMPTY_TRAMITE));
  }
  setShowForm(prev => !prev);
};


  return (
    <section className='tramites'>
      <Heading title="Trámites Universitarios" />

      {/* SOLO SE MUESTRA PARA EL CORREO ADMIN */}
      {canAdd && (
        <div className='addButtons'>
          {/* <button 
            className="btn-add-tramite" 
            onClick={() => setShowForm(prev => !prev)}
          >
            {showForm ? "Cancelar" : "Agregar nuevo trámite"}
          </button> */}
          <button 
            className="btn-add-tramite" 
            onClick={toggleForm}
          >
            {showForm ? "Cancelar" : "Agregar nuevo trámite"}
          </button>
        </div>
      )}

      {!showForm ? (
        <Slider {...settings}>
          {tramites.map((val) => (
            <div className='items' key={val.id}>
              <Link to={`/tramite/${val.id}`} style={{ all: "unset" }}>
                <div className='box shadow'>
                  <div className="icono">{getIcon(val.title)}</div>
                  <div className="text row text-containerSP">
                    <h1 className='title'>{val.title}</h1>
                    <div className="info"><FaClock /> Duración: <span>{val.duracion}</span>días (Aprox)</div>
                    <div className="info"><FaDollarSign /> Costo: <span>{val.costo}</span>soles (Aprox)</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      ) : (
        // ========================
        // FORMULARIO NUEVO TRÁMITE
        // ========================
        <div className="new-tramite-form">

          <input
            type="text"
            placeholder="Título"
            value={newTramite.title}
            onChange={(e) => updateNewTramiteField(["title"], e.target.value)}
          />
          <input
            type="text"
            placeholder="Fecha"
            value={newTramite.date}
            onChange={(e) => updateNewTramiteField(["date"], e.target.value)}
          />
          <input
            type="text"
            placeholder="Duración"
            value={newTramite.duracion}
            onChange={(e) => updateNewTramiteField(["duracion"], e.target.value)}
          />
          <input
            type="text"
            placeholder="Costo"
            value={newTramite.costo}
            onChange={(e) => updateNewTramiteField(["costo"], e.target.value)}
          />

          {/* DESCRIPCIÓN */}
          <h4>Descripción</h4>
          {newTramite.desc.map((val, idx) => (
            <div key={idx}>
              {Object.keys(val).map((key) => (
                <textarea
                  key={key}
                  value={val[key]}
                  onChange={(e) => updateNewTramiteField(["desc", idx, key], e.target.value)}
                  placeholder="Agregar texto"
                />
              ))}
              <button className="btn-add" onClick={() => addPara("desc")}>+</button>
            </div>
          ))}

          {/* DOCUMENTOS NECESARIOS */}
          <h4>Documentos necesarios</h4>
          {newTramite.docsNecesariosData.map((val, idx) => (
            <div key={idx}>
              {/* <input
                type="text"
                placeholder="Título del documento"
                value={val.title}
                onChange={(e) => updateNewTramiteField(["docsNecesariosData", idx, "title"], e.target.value)}
              /> */}
              {Object.keys(val)
                .filter(k => k.startsWith("para"))
                .map((key) => (
                  <textarea
                    key={key}
                    value={val[key]}
                    onChange={(e) => updateNewTramiteField(["docsNecesariosData", idx, key], e.target.value)}
                  />
                ))}
              <button className="btn-add" onClick={() => addPara("docsNecesariosData")}>+</button>
            </div>
          ))}

          {/* PASOS */}
          <h4>Pasos</h4>
          {newTramite.details.map((val, idx) => (
            <div key={idx}>
              <input
                type="text"
                placeholder="Título del paso"
                value={val.title}
                onChange={(e) => updateNewTramiteField(["details", idx, "title"], e.target.value)}
              />

              {Object.keys(val)
                .filter(k => k.startsWith("para"))
                .map((key) => (
                  <textarea
                    key={key}
                    value={val[key]}
                    onChange={(e) => updateNewTramiteField(["details", idx, key], e.target.value)}
                  />
                ))}

                <textarea
                placeholder="Quote (opcional)"
                value={val.quote}
                onChange={(e) => updateNewTramiteField(["details", idx, "quote"], e.target.value)}
              />

              <button className="btn-add" onClick={() => addPara("details")}>+</button>
            </div>
          ))}

          <button className="btn-save" onClick={saveNewTramite}>Guardar nuevo trámite</button>
        </div>
      )}
    </section>
  );
};

export default Tramites;
