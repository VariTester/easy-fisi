import React, { useState } from 'react';
import Head from './Head';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';
import Swal from "sweetalert2";

const Header = ({ usuario, setUsuario }) => {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();

  const handleCerrarSesion = async () => {
    return Swal.fire({
      icon: "warning",
      title: "¿Cerrar sesión?",
      text: "Se cerrará tu sesión actual.",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await signOut(auth);
        setUsuario(null);
        navigate('/');
      }
    });
  };

  // 🔹 Solo considerar logueado si usuario existe y emailVerified === true
  const estaLogueado = usuario && usuario.emailVerified;

  return (
    <>
      <Head />
      <header>
        <div className="container paddingSmall">
          <nav>
            <ul
              className={navbar ? 'navbar' : 'flex'}
              onClick={() => setNavbar(false)}
            >
              <li><Link to='/'>Inicio</Link></li>
              <li><Link to='/tramites'>Trámites</Link></li>
              <li><Link to='/formatos'>Formatos</Link></li>
              <li><Link to='/foro'>Foro</Link></li>
              <li><Link to='/docentes'>Docentes</Link></li>
              <li><Link to='/quienesSomos'>Quiénes Somos</Link></li>

              {estaLogueado ? (
                <>
                  <li className='userCorreo'>
                    <span>{usuario.email}</span>
                  </li>
                  <li className='iniciosesion'>
                    <button
                      className='cerrarSesionBtn'
                      onClick={handleCerrarSesion}
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              ) : (
                <li className='iniciosesion'>
                  <Link to='/iniciarSesion' className='cerrarSesionBtn'>
                    Iniciar Sesión
                  </Link>
                </li>
              )}
            </ul>

            <button className='barIco' onClick={() => setNavbar(!navbar)}>
              {navbar ? (
                <i className='fa fa-times'></i>
              ) : (
                <i className='fa fa-bars'></i>
              )}
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
