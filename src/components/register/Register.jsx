// src/components/Register.jsx
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarReenviar, setMostrarReenviar] = useState(false);
  const [usuarioPendiente, setUsuarioPendiente] = useState(null);
  const [reenviando, setReenviando] = useState(false);
  const [contador, setContador] = useState(0);

  const navigate = useNavigate();

  // Contador para reenvío de correo
  useEffect(() => {
    let timer;
    if (contador > 0) {
      timer = setTimeout(() => setContador(contador - 1), 1000);
    } else if (contador === 0 && usuarioPendiente) {
      setMostrarReenviar(true);
    }
    return () => clearTimeout(timer);
  }, [contador, usuarioPendiente]);

  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  const validarCampos = () => {
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return false;
    }
    if (!validarCorreo(email)) {
      setError("Formato de correo inválido.");
      return false;
    }
    if (!email.endsWith("@unapiquitos.edu.pe")) {
      setError("Solo se permiten correos institucionales @unapiquitos.edu.pe");
      return false;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    return true;
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();
    setError("");
    setMostrarReenviar(false);
    setUsuarioPendiente(null);

    if (!validarCampos()) return;

    setLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user);

      await Swal.fire({
        icon: "success",
        title: "Cuenta creada con éxito",
        html: `
          <p>Revisa tu <strong>correo institucional</strong> y verifica tu cuenta antes de iniciar sesión.</p>
          <p><em>No olvides revisar la carpeta de spam si no llega el correo.</em></p>
        `,
        confirmButtonText: "Entendido",
        timer: 5000,
        timerProgressBar: true,
      });

      navigate("/iniciarSesion");
    } catch (err) {
      console.error(err);

      // Si ya existe la cuenta
      if (err.code === "auth/email-already-in-use") {
        try {
          const credExistente = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          if (!credExistente.user.emailVerified) {
            setUsuarioPendiente(credExistente.user);
            setMostrarReenviar(true);
            setError(
              "Este correo ya fue registrado pero no está verificado. Puedes reenviar el correo."
            );
            await signOut(auth);
          } else {
            setError("Este correo ya está registrado y verificado. Inicia sesión.");
            await signOut(auth);
          }
        } catch (loginErr) {
          setError(
            "Este correo ya está registrado. Si olvidaste la contraseña, intenta recuperarla."
          );
        }
      } else {
        setError("Error al registrar: intenta más tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  const reenviarVerificacion = async () => {
    if (!usuarioPendiente) return;

    setReenviando(true);
    setMostrarReenviar(false);

    try {
      await sendEmailVerification(usuarioPendiente);

      await Swal.fire({
        icon: "info",
        title: "Correo reenviado",
        html: `
          <p>Se ha reenviado el correo de verificación a <strong>${usuarioPendiente.email}</strong>.</p>
          <p>Revisa tu bandeja de entrada y la carpeta de spam.</p>
        `,
        confirmButtonText: "Ok",
        timer: 5000,
        timerProgressBar: true,
      });

      setContador(60); // Bloquear botón 60s
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "warning",
        title: "No se pudo reenviar",
        html: "<p>Intenta de nuevo más tarde.</p>",
        confirmButtonText: "Ok",
      });
      setContador(60);
    } finally {
      setReenviando(false);
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
          onChange={(e) => setEmail(e.target.value.trim())}
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
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {mostrarReenviar && usuarioPendiente && (
        <button
          onClick={reenviarVerificacion}
          className="reenviar-btn"
          disabled={reenviando || contador > 0}
        >
          {reenviando
            ? "Reenviando..."
            : contador > 0
            ? `Espera ${contador}s`
            : "Reenviar correo de verificación"}
        </button>
      )}

      <p>
        ¿Ya tienes cuenta? <Link to="/iniciarSesion">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Register;
