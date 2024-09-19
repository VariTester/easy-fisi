import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/header/Header";
import "./App.css";

import Homepages from "./components/home/Homepages";
import Tramitesroute from "./routes/Tramites";

export default function App() {
  return (
    <Router>
      <Header /> {/* Coloca el componente Header aquí si es parte de la navegación */}
      <Routes>
        <Route path="/" element={<Homepages />} />
        <Route path="/tramites" element={<Tramitesroute />} />
        {/* Puedes agregar otras rutas aquí */}
      </Routes>
    </Router>
  );
}
