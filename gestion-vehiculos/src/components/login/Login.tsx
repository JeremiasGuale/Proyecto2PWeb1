import React, { useState, useEffect } from 'react';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';
import '../../assets/css/login.css'


interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  facultad: string;
  cedula: string;
  correo: string;
  contrasena: string;
}

interface RegistroEntrada {
  usuarioId: string;
  fechaHoraEntrada: string;
  nombre: string;
  apellido: string;
}

interface RegistroCompleto extends RegistroEntrada {
  fechaHoraSalida: string;
}

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [registrosCompletos, setRegistrosCompletos] = useState<RegistroCompleto[]>([]);
  const [] = useState<RegistroEntrada[]>([]);

  useEffect(() => {
    const storedRegistrosCompletos: RegistroCompleto[] = JSON.parse(localStorage.getItem('registrosCompletos') || '[]');
    setRegistrosCompletos(storedRegistrosCompletos);
  }, []);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.correo === correo && usuario.contrasena === contrasena
    );

    if (usuarioEncontrado) {
      localStorage.setItem('userId', usuarioEncontrado.id.toString());
      setUsuario(usuarioEncontrado);
    } else {
      alert('Correo electrónico o contraseña incorrectos.');
    }
  };

  // const mostrarRegistrosCompletos = () => {
  //   const registrosCompletos: RegistroCompleto[] = JSON.parse(localStorage.getItem('registrosCompletos') || '[]');
  //   setRegistrosCompletos(registrosCompletos);
  // };

  const registrarHoraEntrada = () => {
    const usuarioId = localStorage.getItem('userId') || '';
    const fechaHoraEntrada = new Date();

    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((usuario) => usuario.id === parseInt(usuarioId));

    if (usuario) {
      const registroEntrada: RegistroEntrada = {
        usuarioId,
        fechaHoraEntrada: fechaHoraEntrada.toISOString(),
        nombre: usuario.nombre,
        apellido: usuario.apellido,
      };

      const registrosEntrada: RegistroEntrada[] = JSON.parse(localStorage.getItem('registrosEntrada') || '[]');
      registrosEntrada.push(registroEntrada);
      localStorage.setItem('registrosEntrada', JSON.stringify(registrosEntrada));
      alert('Hora de entrada registrada correctamente.');
    } else {
      alert('No se encontró el usuario.');
    }
  };

  const registrarFechaSalida = () => {
    const usuarioId = localStorage.getItem('userId') || '';
    const fechaHoraSalida = new Date();

    const registrosEntrada: RegistroEntrada[] = JSON.parse(localStorage.getItem('registrosEntrada') || '[]');
    const registroEntrada = registrosEntrada.find((registro) => registro.usuarioId === usuarioId);

    if (registroEntrada) {
      const fechaHoraEntrada = new Date(registroEntrada.fechaHoraEntrada);
      const duracionVisitaMs = fechaHoraSalida.getTime() - fechaHoraEntrada.getTime();
      const duracionVisitaMin = duracionVisitaMs / (1000 * 60);

      alert(`Su visita duró ${duracionVisitaMin.toFixed(2)} minutos.`);

      const registroCompleto: RegistroCompleto = {
        ...registroEntrada,
        fechaHoraSalida: fechaHoraSalida.toISOString(),
      };

      const registrosCompletos: RegistroCompleto[] = JSON.parse(localStorage.getItem('registrosCompletos') || '[]');
      registrosCompletos.push(registroCompleto);
      localStorage.setItem('registrosCompletos', JSON.stringify(registrosCompletos));
      setRegistrosCompletos(registrosCompletos);
    } else {
      alert('No se encontró registro de entrada para este usuario.');
    }
  };

  return (
    <div>
      <header className="cabecera">
        <nav className="cabecera-logo">
          <a href="/">
            <img src={Logo} alt="logo" className="imagen-logo" />
          </a>
        </nav>
        <div className="center-container">
          <h1 className="titulo">Sistema de entrada y salida de vehículos</h1>
        </div>
        <nav className="cabecera-opciones">
          <ul className="cabecera-opciones-lista">
            <button className="registro-btn">
              <a id="registro-btn" href="/registro">
                Registro
              </a>
            </button>
          </ul>
          <ul className="cabecera-opciones-lista">
            <button className="admin-btn">
              <a id="admin-btn" href="/loginAdministrador">
                Inicio de sesión de Administración
              </a>
            </button>
          </ul>
          <ul className="cabecera-opciones-lista">
            <button className="admin-btn">
              <a id="admin-btn" href="/login">
                Cerrar sesión
              </a>
            </button>
          </ul>
        </nav>
      </header>

      <div id="contenedor-medio">
        {!usuario ? (
          <div id="seccion-inicio-sesion">
            <h2>Inicio de sesión</h2>
            <form id="inicio-sesion-form" onSubmit={handleLogin}>
              <label htmlFor="correo">Correo electrónico:</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <label htmlFor="contrasena">Contraseña:</label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
              <button type="submit">Iniciar sesión</button>
            </form>
          </div>
        ) : (
          <div id="seccion-perfil">
            <div id="perfil-container">
              <h2>Perfil de {usuario.nombre} {usuario.apellido}</h2>
              <p>Nombre: {usuario.nombre}</p>
              <p>Apellido: {usuario.apellido}</p>
              <p>Facultad: {usuario.facultad}</p>
              <p>Cédula: {usuario.cedula}</p>
              <p>Correo: {usuario.correo}</p>
            </div>
            <button onClick={registrarHoraEntrada}>Registrar hora de entrada</button>
            <button onClick={registrarFechaSalida}>Registrar fecha de salida</button>
          </div>
        )}
      </div>

      <div id="registros-completos" style={{ display: registrosCompletos.length > 0 ? 'block' : 'none' }}>
        <h2>Registros Generales de la institución</h2>
        <ul id="lista-registros-completos">
          {registrosCompletos.map((registro, index) => (
            <li key={index}>
              Nombre: {registro.nombre} {registro.apellido}, Hora de Entrada: {registro.fechaHoraEntrada}, Hora de Salida: {registro.fechaHoraSalida}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Login;
