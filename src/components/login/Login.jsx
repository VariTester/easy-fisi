// src/components/Login.jsx
import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mostrarReenviar, setMostrarReenviar] = useState(false);

  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setError('');
    setMostrarReenviar(false);

    try {
      // ❌ Si no es correo institucional, no permite login
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

        // ❗ Importante: cerrar sesión si no está verificado
        await signOut(auth);
        return;
      }

      if (onLogin) onLogin(cred.user);
      navigate('/');
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);
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
        <button onClick={reenviarVerificacion} className="reenviar-btn">
          Reenviar verificación
        </button>
      )}

      <p>
        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;
