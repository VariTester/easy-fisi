import React , {useState} from 'react'
import Head from "./Head";
import "./header.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from "react-router-dom";

const Header = () => {
const [navbar, setnavbar] = useState(false);
  return (
    <>
    <Head/>
    <header>
      <div className="container paddingSmall">
        <nav>
            <ul className={navbar ? 'navbar':'flex'} onClick={()=>setnavbar(false)}>
                <li><Link to='/'>Inicio</Link></li>
                <li><Link to='/noticias'>Noticias</Link></li>
                {/* <li><Link to='/publicaciones'>Publicacionens</Link></li> */}
                <li><Link to='/tramites'>Trámites</Link></li>
                <li><Link to='/formatos'>Formatos</Link></li>
                <li><Link to='/foro'>Foro</Link></li>
                <li><Link to='/infoDocente'>Info Docente</Link></li>
                <li><Link to='/administrativos'>Administrativos</Link></li>
                <li className='iniciosesion'><Link to='/iniciarSesion'>Iniciar Sesión</Link></li>
            </ul>
            <button className='barIco' onClick={()=> setnavbar(!navbar)}>
            {navbar ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
        </nav>
      </div> 
    </header>
    </>
  )
}

export default Header
