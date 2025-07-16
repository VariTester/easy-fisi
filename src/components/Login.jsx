// src/components/Login.jsx
import React, { useState } from 'react';
// ✅ CORRECTO
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      onLogin(cred.user); // Llamar a la función pasada desde App.jsx
    } catch (err) {
      setError("Error al iniciar sesión: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={iniciarSesion}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
