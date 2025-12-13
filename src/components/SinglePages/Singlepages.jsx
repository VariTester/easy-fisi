import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../SinglePages/singlepages.css";
import Side from "../home/sideContent/side/Side";
import { tramites } from "../../data";
import Swal from "sweetalert2";

// Firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";

const Singlepages = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  const auth = getAuth();

  const [originalItem, setOriginalItem] = useState(null);//new


  // 🔎 Detectar solo los paraX que sí contienen texto real (solo strings)
  const getExistingParas = (obj) =>
    Object.keys(obj)
      .filter((k) => k.startsWith("para") && typeof obj[k] === "string" && obj[k].trim() !== "")
      .sort((a, b) => parseInt(a.replace("para", "")) - parseInt(b.replace("para", "")));

  // 🔧 Actualizar un campo profundamente (arrays / objetos incluidos)
  const updateField = (path, value) => {
    setItem((prev) => {
      const updated = structuredClone(prev);
      let ref = updated;
      for (let i = 0; i < path.length - 1; i++) {
        ref = ref[path[i]];
      }
      ref[path[path.length - 1]] = value;
      return updated;
    });
  };
const cleanParasObject = (obj) => {
  const cleanObj = {};

  // Copiar campos que NO son paraX (title, quote, etc.)
  Object.keys(obj).forEach((k) => {
    if (!k.startsWith("para")) {
      cleanObj[k] = obj[k];
    }
  });

  // Limpiar y reordenar paras
  const validParas = Object.keys(obj)
    .filter(
      (k) =>
        k.startsWith("para") &&
        typeof obj[k] === "string" &&
        obj[k].trim() !== ""
    )
    .sort(
      (a, b) =>
        parseInt(a.replace("para", "")) -
        parseInt(b.replace("para", ""))
    );

  validParas.forEach((key, index) => {
    cleanObj[`para${index + 1}`] = obj[key].trim();
  });

  return cleanObj;
};

  // 💾 Guardar cambios en Firebase
const saveChanges = async () => {
  try {
    setSaving(true);

    const safeData = {
      title: item.title ?? "",
      duracion: item.duracion ?? "",
      costo: item.costo ?? "",
      date: item.date ?? "",

      desc: Array.isArray(item.desc)
        ? item.desc.map(cleanParasObject)
        : [],

      docsNecesariosData: Array.isArray(item.docsNecesariosData)
        ? item.docsNecesariosData.map(cleanParasObject)
        : [],

      details: Array.isArray(item.details)
        ? item.details.map(cleanParasObject)
        : [],
    };

    const ref = doc(db, "tramites", id);

    await updateDoc(ref, {
      title: safeData.title,
      duracion: safeData.duracion,
      costo: safeData.costo,
      date: safeData.date,
      desc: safeData.desc,
      docsNecesariosData: safeData.docsNecesariosData,
      details: safeData.details
    });


    setItem(prev => ({
      ...prev,
      ...safeData
    }));

    setOriginalItem(prev => ({
      ...prev,
      ...safeData
    }));

    setEditing(false);


    Swal.fire({
      icon: "success",
      title: "Cambios guardados",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      position: "top-end",
      toast: true,
    });
  } catch (error) {
    console.error("🔥 ERROR FIREBASE:", error);
    Swal.fire({
      icon: "error",
      title: "Error al guardar",
      text: error.message,
      showConfirmButton: true,
    });
  }

  setSaving(false);
};


  // 📥 Obtener FIREBASE + data.js (fusión)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = doc(db, "tramites", id);
        const snap = await getDoc(ref);

        const local = tramites.find((x) => String(x.id) === String(id));

        if (snap.exists()) {
          const merged = {
            ...local,
            ...snap.data(),
          };

          setItem(merged);
          setOriginalItem(structuredClone(merged));
        }
        else {
          setItem(local || null);
        }
      } catch (err) {
        console.error(err);
        setItem(null);
      }

      window.scrollTo(0, 0);
      setLoading(false);
    };

    fetchData();

    const user = auth.currentUser;
    if (user) setCurrentUserEmail(user.email);
  }, [id, auth.currentUser]);

  if (loading) return <h1>Cargando...</h1>;
  if (!item) return <h1>Trámite no encontrado</h1>;

  const canEdit = currentUserEmail === "2175267@unapiquitos.edu.pe";

  return (
    <main>
      <div className="container">
        <section className="mainContent detailsSP">
          {/* Botones edición */}
          {canEdit && (
            <div className="editButtons">
              {!editing ? (
                <button className="btn-edit" onClick={() => setEditing(true)}>
                  ✏ Editar
                </button>
              ) : (
                <>
                  <button
                    className="btn-save"
                    onClick={saveChanges}
                    disabled={saving}
                  >
                    {saving ? "Guardando..." : "Guardar ✔"}
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => {
                      setItem(structuredClone(originalItem));
                      setEditing(false);
                    }}
                  >
                    Cancelar
                  </button>

                </>
              )}
            </div>
          )}

          {/* TÍTULO */}
          {!editing ? (
            <h1 className="titleSP">{item.title}</h1>
          ) : (
            <input
              className="editorInput fullWidth"
              value={item.title}
              onChange={(e) => updateField(["title"], e.target.value)}
            />
          )}

          {/* INFO SUPERIOR */}
          <div className="infoSP">
            <div className="infoBox">
              <i className="fas fa-calendar-days"></i>
              {!editing ? (
                <label>{item.date}</label>
              ) : (
                <input
                  className="editorInput"
                  value={item.date}
                  onChange={(e) => updateField(["date"], e.target.value)}
                />
              )}
            </div>
            <div className="infoBox">
              <i className="fas fa-clock"></i>
              {!editing ? (
                <label>Duración: {item.duracion} días (Aprox)</label>
              ) : (
                <input
                  className="editorInput"
                  value={item.duracion}
                  onChange={(e) => updateField(["duracion"], e.target.value)}
                />
              )}
            </div>
            <div className="infoBox">
              <i className="fas fa-dollar"></i>
              {!editing ? (
                <label>Costo: {item.costo} soles (Aprox)</label>
              ) : (
                <input
                  className="editorInput"
                  value={item.costo}
                  onChange={(e) => updateField(["costo"], e.target.value)}
                />
              )}
            </div>
          </div>

          {/* FORMATOS */}
          <div className="formatsSP">
            <h1 className="tittleFormatosSP">Formatos</h1>
            {item.formatos?.length > 0
              ? item.formatos.map((val, index) => {
                  const key = Object.keys(val).find((k) =>
                    k.startsWith("formato")
                  );
                  return (
                    <div key={index} className="text-containerLinksSP">
                      <a
                        href={val[key]}
                        download={`${val.nombre}.pdf`}
                        className="formato-linkSP"
                      >
                        {val.nombre}
                      </a>
                    </div>
                  );
                })
              : "No hay formatos disponibles"}
          </div>

          {/* DESCRIPCIÓN */}
          <div className="desctopSP">
            {item.desc?.map((val, index) => (
              <div key={index} className="text-containerSP">
                {index === 0 && item.imagenes?.length > 0 && (
                  <div className="imagenes-contenedor">
                    {Object.values(item.imagenes[0])
                      .filter(Boolean)
                      .map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          className="imagen-estilo"
                          alt=""
                        />
                      ))}
                  </div>
                )}
                {getExistingParas(val).map((key) =>
                  !editing ? (
                    <p key={key}>{val[key]}</p>
                  ) : (
                    <textarea
                      key={key}
                      className="editorTextarea stableTextarea"
                      value={val[key]}
                      onChange={(e) =>
                        updateField(["desc", index, key], e.target.value)
                      }
                    />
                  )
                )}
              </div>
            ))}
          </div>

{/* DOCUMENTOS NECESARIOS */}
<div className="descbotSP">
  {item.docsNecesariosData?.map((val, index) => {
    // Detectar todos los paraX existentes y ordenarlos
    const paraKeys = Object.keys(val)
      .filter((k) => k.startsWith("para"))
      .sort((a, b) => parseInt(a.replace("para", "")) - parseInt(b.replace("para", "")));

    return (
      <div key={index} className="text-containerSP">
        <h1>{val.title}</h1>
        {paraKeys.map((key) => (
          !editing ? (
            <p key={key}>{val[key]}</p>
          ) : (
            <textarea
              key={key}
              className="editorTextarea stableTextarea"
              value={val[key]}
              onChange={(e) =>
                updateField(["docsNecesariosData", index, key], e.target.value)
              }
            />
          )
        ))}

        {/* Botón para agregar nuevo para */}
        {editing && index === item.docsNecesariosData.length - 1 && (
<button
  className="btn-add"
  onClick={() => {
    const newDocs = [...item.docsNecesariosData];
    const lastDoc = newDocs[newDocs.length - 1];
    const existingParas = Object.keys(lastDoc).filter((k) => k.startsWith("para"));
    const nextParaNumber = existingParas.length + 1;
    lastDoc[`para${nextParaNumber}`] = "";
    setItem({ ...item, docsNecesariosData: newDocs });
  }}
>
  +
</button>
        )}
      </div>
    );
  })}
</div>


{/* PASOS */}
<div className="descbotSP">
  {item.details?.map((val, index) => {
    // Detectar todos los paraX existentes y ordenarlos
    const paraKeys = Object.keys(val)
      .filter((k) => k.startsWith("para"))
      .sort((a, b) => parseInt(a.replace("para", "")) - parseInt(b.replace("para", "")));

    return (
      <div key={index} className="text-containerSP">
        <h1>{val.title}</h1>
        {paraKeys.map((key) => (
          !editing ? (
            <p key={key}>{val[key]}</p>
          ) : (
            <textarea
              key={key}
              className="editorTextarea stableTextarea"
              value={val[key]}
              onChange={(e) =>
                updateField(["details", index, key], e.target.value)
              }
            />
          )
        ))}

        {/* quote siempre al final */}
        {val.quote && !editing && <p className="quoteSP"><i className="fa fa-quote-left"></i>{val.quote}</p>}
        {val.quote && editing && (
          <textarea
            className="editorTextarea stableTextarea"
            value={val.quote}
            onChange={(e) =>
              updateField(["details", index, "quote"], e.target.value)
            }
          />
        )}

        {/* Botón para agregar nuevo para */}
        {editing && index === item.details.length - 1 && (
<button
  className="btn-add"
  onClick={() => {
    const newDetails = [...item.details];
    const lastDetail = newDetails[newDetails.length - 1];
    const existingParas = Object.keys(lastDetail).filter((k) => k.startsWith("para"));
    const nextParaNumber = existingParas.length + 1;
    lastDetail[`para${nextParaNumber}`] = ""; // se agrega antes del quote
    setItem({ ...item, details: newDetails });
  }}
>
  +
</button>
        )}
      </div>
    );
  })}
</div>



        </section>

        <section className="sideContent">
          <Side />
        </section>
      </div>
    </main>
  );
};

export default Singlepages;
