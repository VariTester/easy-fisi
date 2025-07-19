import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; // 👈 Importar listener
import { auth } from "./firebase/firebaseConfig"; // 👈 Asegurate que la ruta sea correcta

import Header from "./components/common/header/Header";
import "./App.css";

import Homepages from "./components/home/Homepages";
import Tramitesroute from "./routes/Tramites";
import Formatosroute from "./routes/Formatos";
import Fororoute from "./routes/Foro";
import Docentesroute from "./routes/DocentesRoutes";

import Singlepages from "./components/SinglePages/Singlepages";
import NoticiasSinglePage from "./components/SinglePages/NoticiasSinglePage/NoticiasSinglePage";

import Login from "./components/login/Login";
import Register from "./components/register/Register";


export default function App() {
  const [usuario, setUsuario] = useState(null);

// App.js
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUsuario(user); // <-- Acepta usuarios verificados o no
  });
  return () => unsubscribe();
}, []);


  return (
    <>
        <Router>
        <Header usuario={usuario} setUsuario={setUsuario} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Homepages usuario={usuario} />} />
            <Route path="/tramites" element={<Tramitesroute />} />
            <Route path="/docentes" element={<Docentesroute />} />
            <Route path="/formatos" element={<Formatosroute />} />
            <Route path="/tramite/:id" element={<Singlepages />} />
            <Route path="/Noticia/:id" element={<NoticiasSinglePage />} />
            <Route path="/foro" element={<Fororoute usuario={usuario} />} />
            <Route path="/iniciarSesion" element={<Login onLogin={setUsuario} />} />
            <Route path="/registro" element={<Register />} />
          </Routes>
        </div>
    </Router>
    </>

  );
}
