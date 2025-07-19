// src/components/Login.jsx
import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mostrarReenviar, setMostrarReenviar] = useState(false);
  const [recuperandoClave, setRecuperandoClave] = useState(false);

  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setError('');
    setMostrarReenviar(false);

    try {
      if (!email.endsWith('@unapiquitos.edu.pe')) {
        setError('Solo se permiten correos institucionales @unapiquitos.edu.pe');
        return;
      }

      const cred = await signInWithEmailAndPassword(auth, email, password);

      if (!cred.user.emailVerified) {
        setError(
          'Primero debes verificar tu correo institucional. Revisa tu bandeja de entrada o carpeta de Spam.'
        );
        setMostrarReenviar(true);
        await signOut(auth); // Seguridad: cerrar sesión si no está verificado
        return;
      }

      if (onLogin) onLogin(cred.user);
      navigate('/');
} catch (err) {
  console.error("🔥 Código de error:", err.code); // Para depuración

  if (err.code === 'auth/user-not-found') {
    setError('No existe una cuenta con este correo.');
  } else if (err.code === 'auth/wrong-password') {
    setError('Contraseña incorrecta.');
  } else if (err.code === 'auth/invalid-credential') {
    // ⚠️ Este es el nuevo código cuando pones mal el password en Firebase 10+
    setError('Correo o contraseña incorrectos.');
  } else if (err.code === 'auth/too-many-requests') {
    setError('Demasiados intentos. Intenta de nuevo más tarde.');
  } else {
    setError('Error al iniciar sesión: ' + err.message);
  }
}


  };

  const reenviarVerificacion = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await sendEmailVerification(currentUser);
        alert('📩 Correo de verificación reenviado. Revisa tu bandeja de entrada.');
      } else {
        setError('Primero inicia sesión para reenviar el correo de verificación.');
      }
    } catch (e) {
      console.error(e);
      setError('No se pudo reenviar el correo. Intenta de nuevo más tarde.');
    }
  };

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
      alert('📩 Se ha enviado un correo para restablecer tu contraseña.');
    } catch (error) {
      setError('Error al enviar el correo de recuperación: ' + error.message);
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

      {mostrarReenviar && (
        <div className="reenviar-wrapper">
          <button onClick={reenviarVerificacion} className="reenviar-btn">
            Reenviar verificación
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
