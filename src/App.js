import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/header/Header";
import "./App.css";

import Homepages from "./components/home/Homepages";
import Tramitesroute from "./routes/Tramites";

import Singlepages from "./components/SinglePages/Singlepages.jsx";
import Tramites from "./components/home/mainContent/tramites/Tramites.jsx";

import NoticiasSinglePage from "./components/SinglePages/NoticiasSinglePage/NoticiasSinglePage.jsx";
import Formatosroute from "./routes/Formatos.js";

export default function App() {
  return (
    <Router>
      <Header /> {/* Coloca el componente Header aquí si es parte de la navegación */}
      <Routes>
        <Route path="/" element={<Homepages />} />
        <Route path="/tramites" element={<Tramitesroute />} />
        <Route path="/formatos" element={<Formatosroute />} />
        {/* Ruta dinámica para cada trámite */}
        <Route path="/tramite/:id" element={<Singlepages />} />
        <Route path="/Noticia/:id" element={<NoticiasSinglePage />} />
      </Routes>
    </Router>
  );
}
