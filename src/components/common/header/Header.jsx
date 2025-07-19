import React, { useState } from 'react';
import Head from './Head';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';

// ⬇️ usuario y setUsuario vienen desde App.jsx
const Header = ({ usuario, setUsuario }) => {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();

  const handleCerrarSesion = async () => {
    await signOut(auth);
    setUsuario(null); // Limpia el estado global
    navigate('/');
  };

  const correoVerificado = usuario?.emailVerified;

  return (
    <>
      <Head />
      <header>
        <div className="container paddingSmall">
          <nav>
            <ul className={navbar ? 'navbar' : 'flex'} onClick={() => setNavbar(false)}>
              <li><Link to='/'>Inicio</Link></li>
              <li><Link to='/tramites'>Trámites</Link></li>
              <li><Link to='/formatos'>Formatos</Link></li>
              <li><Link to='/foro'>Foro</Link></li>
              <li><Link to='/infoDocente'>Info Docente</Link></li>
              <li><Link to='/administrativos'>Administrativos</Link></li>

              {correoVerificado ? (
                <>
                  <li className='userCorreo'>
                    <span>{usuario.email}</span>
                  </li>
                  <li className='iniciosesion'>
                    <button className='cerrarSesionBtn' onClick={handleCerrarSesion}>
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              ) : (
                <li className='iniciosesion'>
                  <Link to='/iniciarSesion'>Iniciar Sesión</Link>
                </li>
              )}
            </ul>

            <button className='barIco' onClick={() => setNavbar(!navbar)}>
              {navbar ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
