// src/components/Register.jsx
import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    if (!validarCampos()) return;

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirige al inicio o login
    } catch (err) {
      setError('Error al registrar: ' + err.message);
    } finally {
      setLoading(false);
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

      <p>
        ¿Ya tienes cuenta? <Link to="/iniciarSesion">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Register;
