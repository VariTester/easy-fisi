// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mostrarReenviar, setMostrarReenviar] = useState(false);
  const [recuperandoClave, setRecuperandoClave] = useState(false);
  const [usuarioPendiente, setUsuarioPendiente] = useState(null);
  const [reenviando, setReenviando] = useState(false);
  const [contador, setContador] = useState(0);

  const navigate = useNavigate();

  // Contador de reenvío
  useEffect(() => {
    let timer;
    if (contador > 0) {
      timer = setTimeout(() => setContador(contador - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [contador]);

  // Función de login
  const iniciarSesion = async (e) => {
    e.preventDefault();
    setError('');
    setMostrarReenviar(false);
    setUsuarioPendiente(null);

    if (!email.endsWith('@unapiquitos.edu.pe')) {
      setError('Solo se permiten correos institucionales @unapiquitos.edu.pe');
      return;
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      if (!cred.user.emailVerified) {
        setUsuarioPendiente(cred.user);
        setError(
          'Este correo aún no está verificado. Revisa tu bandeja de entrada o spam.'
        );
        setMostrarReenviar(true);
        await signOut(auth); // cerrar sesión temporal
        return;
      }

      // Usuario verificado: login exitoso
      if (onLogin) onLogin(cred.user);
      navigate('/');
    } catch (err) {
      console.error('🔥 Error:', err.code, err.message);
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No existe una cuenta con este correo.');
          break;
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Correo o contraseña incorrectos.');
          break;
        case 'auth/too-many-requests':
          setError('Demasiados intentos. Intenta de nuevo más tarde.');
          break;
        default:
          setError('Error al iniciar sesión: ' + err.message);
      }
    }
  };

  // Función para reenviar correo de verificación
  const reenviarVerificacion = async () => {
    if (!usuarioPendiente) return;
    setReenviando(true);
    setMostrarReenviar(false);

    try {
      await sendEmailVerification(usuarioPendiente);

      await Swal.fire({
        icon: 'info',
        title: 'Correo reenviado',
        html: `
          <p>Se ha reenviado el correo de verificación a <strong>${usuarioPendiente.email}</strong>.</p>
          <p>Revisa tu bandeja de entrada y la carpeta de spam.</p>
        `,
        confirmButtonText: 'Ok',
        timer: 5000,
        timerProgressBar: true,
      });

      // Reiniciar contador de 60s antes de permitir nuevo reenvío
      setContador(60);
    } catch (err) {
      console.error(err);
      // Mostrar mensaje genérico, no bloqueante
      Swal.fire({
        icon: 'warning',
        title: 'Intenta de nuevo',
        html: `<p>No se pudo reenviar el correo ahora. Espera unos segundos y vuelve a intentarlo.</p>`,
        confirmButtonText: 'Ok',
      });
      setContador(60); // bloquear temporalmente
    } finally {
      setReenviando(false);
    }
  };

  // Función para recuperar contraseña
  const recuperarContraseña = async () => {
    if (!email) {
      setError('Ingresa tu correo institucional para recuperar la contraseña.');
      return;
    }

    if (!email.endsWith('@unapiquitos.edu.pe')) {
      setError('Solo se permiten correos institucionales @unapiquitos.edu.pe');
      return;
    }

    setError('');
    setRecuperandoClave(true);

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        html: `<p>Se ha enviado un correo para restablecer tu contraseña a <strong>${email}</strong>.</p>
               <p>Revisa tu bandeja de entrada y spam.</p>`,
        confirmButtonText: 'Ok',
        timer: 5000,
        timerProgressBar: true,
      });
    } catch (err) {
      setError('Error al enviar el correo de recuperación: ' + err.message);
    } finally {
      setRecuperandoClave(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={iniciarSesion}>
        <input
          type="email"
          placeholder="Correo institucional"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>

      {error && <p className="error">{error}</p>}

      {mostrarReenviar && usuarioPendiente && (
        <div className="reenviar-wrapper">
          <button
            onClick={reenviarVerificacion}
            className="reenviar-btn"
            disabled={reenviando || contador > 0}
          >
            {reenviando
              ? 'Reenviando...'
              : contador > 0
              ? `Espera ${contador}s`
              : 'Reenviar correo de verificación'}
          </button>
        </div>
      )}

      <p>
        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>

      <p style={{ marginTop: '10px' }}>
        ¿Olvidaste tu contraseña?{' '}
        <button
          onClick={recuperarContraseña}
          disabled={recuperandoClave}
          className="link-button"
        >
          {recuperandoClave ? 'Enviando...' : 'Recuperarla'}
        </button>
      </p>
    </div>
  );
}

export default Login;
