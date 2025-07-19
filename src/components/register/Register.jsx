// src/components/Register.jsx
import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [mostrarReenviar, setMostrarReenviar] = useState(false);
  const [usuarioPendiente, setUsuarioPendiente] = useState(null);

  const navigate = useNavigate();

  const validarCampos = () => {
    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    if (!email.endsWith('@unapiquitos.edu.pe')) {
      setError('Solo se permiten correos institucionales @unapiquitos.edu.pe');
      return false;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    return true;
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();
    setError('');
    setMostrarReenviar(false);
    setUsuarioPendiente(null);

    if (!validarCampos()) return;

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user);

      alert('✅ Cuenta creada. Revisa tu correo institucional y verifica tu cuenta antes de iniciar sesión.');
      navigate('/iniciarSesion');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        try {
          const credExistente = await signInWithEmailAndPassword(auth, email, password);
          if (!credExistente.user.emailVerified) {
            setError('Este correo ya fue registrado pero aún no está verificado.');
            setMostrarReenviar(true);
            setUsuarioPendiente(credExistente.user);
          } else {
            setError('Este correo ya está registrado. Inicia sesión.');
          }
        } catch (loginErr) {
          setError('Este correo ya está registrado. Si olvidaste la contraseña, intenta recuperarla.');
        }
      } else {
        setError('Error al registrar: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const reenviarVerificacion = async () => {
    if (usuarioPendiente) {
      try {
        await sendEmailVerification(usuarioPendiente);
        alert('📩 Correo de verificación reenviado. Revisa tu bandeja de entrada.');
      } catch (e) {
        setError('No se pudo reenviar el correo de verificación. Intenta más tarde.');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={registrarUsuario}>
        <input
          type="email"
          placeholder="Correo electrónico institucional"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña (mínimo 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {mostrarReenviar && (
        <button onClick={reenviarVerificacion} className="reenviar-btn">
          Reenviar correo de verificación
        </button>
      )}

      <p>
        ¿Ya tienes cuenta? <Link to="/iniciarSesion">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Register;
