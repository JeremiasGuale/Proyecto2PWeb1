import Logo2 from '../../assets/image/logo2.jpg';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';
import '../../assets/css/login.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para la navegación

const LoginAdministrador = () => {
  const navigate = useNavigate(); // Instanciar useNavigate

  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(''); // Para manejar mensajes de error

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar credenciales (reemplazar con lógica real de autenticación)
    if (usuario === 'jeremias' && contrasena === 'jeremias123') {
      navigate('/administrador'); // Navegar a la página de administración
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div>
      <header className="cabecera">
        <nav className="cabecera-logo">
          <a href="/"><img src={Logo} alt="logo" className="imagen-logo" /></a>
        </nav>
        <div className="center-container"><h1 className="titulo">Sistema de entrada y salida de vehículos</h1></div>
        <nav className="cabecera-opciones">
          <ul className="cabecera-opciones-lista">
            <button className="registro-btn"><a id="registro-btn" href="/registro">Registro</a></button>
          </ul>
        </nav>
      </header>
      <main className="contenedor-medio" id="contenedor-medio">
        <section className="panel">
          <div className="panel-login">
            <img className="hero-logo" src={Logo2} alt="hero de uleam" />
            <h2>Administración</h2>
            <form id="login-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="usuario">Usuario:</label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="contrasena">Contraseña:</label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Iniciar Sesión</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button id="boton-login" type="button"><a id="boton-login" href="/login">Iniciar sesión como usuario</a></button>
          </div>
        </section>
      </main>
      <footer className="contenedor-abajo">
        <div className="contenido-abajo">
          <h3 className="contenido-texto">
            © 2024 Universidad Laica Eloy Alfaro de Manabí - Jeremias G.
          </h3>
        </div>
      </footer>
    </div>
  );
};

export default LoginAdministrador;
