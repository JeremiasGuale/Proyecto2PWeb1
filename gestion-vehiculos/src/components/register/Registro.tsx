import React, { useState, ChangeEvent, FormEvent } from 'react';
import Logo2 from '../../assets/image/logo2.jpg';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';
import '../../assets/css/registro.css';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  tipoVehiculo: string;
  placaVehiculo: string;
  colorVehiculo: string;
  facultad: string;
  cedula: string;
}

const Registro: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    tipoVehiculo: '',
    placaVehiculo: '',
    colorVehiculo: '',
    facultad: '',
    cedula: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      nombre,
      apellido,
      correo,
      contrasena,
      confirmarContrasena,
      tipoVehiculo,
      placaVehiculo,
      colorVehiculo,
      facultad,
      cedula
    } = formData;

    // Validación de formato de nombre y apellido
    const nombreApellidoVali = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const facultadValiNum = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const correoVali = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cedulaVali = /^\d{10}$/;

    // Validación de datos
    if (
      nombre === '' ||
      apellido === '' ||
      correo === '' ||
      contrasena === '' ||
      confirmarContrasena === '' ||
      tipoVehiculo === '' ||
      placaVehiculo === '' ||
      colorVehiculo === '' ||
      facultad === '' ||
      cedula === ''
    ) {
      alert('Todos los campos son obligatorios.');
      return;
    }
    if (!nombreApellidoVali.test(nombre)) {
      alert('El nombre solo puede contener letras, espacios y vocales con acentos.');
      return;
    }
    if (!nombreApellidoVali.test(apellido)) {
      alert('El apellido solo puede contener letras, espacios y vocales con acentos.');
      return;
    }
    if (!facultadValiNum.test(facultad)) {
      alert('El nombre de la facultad solo debe contener letras');
      return;
    }
    if (!nombreApellidoVali.test(colorVehiculo)) {
      alert('El color del vehículo solo puede contener letras, espacios y vocales con acentos.');
      return;
    }
    if (!correoVali.test(correo)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }
    if (contrasena.length < 4 || contrasena.length > 10) {
      alert('La contraseña debe tener al menos 10 caracteres.');
      return;
    }
    if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    if (!cedulaVali.test(cedula)) {
      alert('Por favor, ingrese una cédula válida de 10 dígitos.');
      return;
    }
    if (placaVehiculo.length !== 4) {
      alert('Por favor, ingrese una placa de vehículo válida de 4 caracteres.');
      return;
    }

    // Guardar datos en el Local Storage
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const nuevoUsuario: Usuario = {
      id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
      nombre,
      apellido,
      correo,
      contrasena,
      tipoVehiculo,
      placaVehiculo,
      colorVehiculo,
      facultad,
      cedula
    };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mensaje de éxito y redirección
    alert('Usuario registrado correctamente, cargando inicio de sesión...');
    window.location.href = '/login'; // Redirigir a la página principal
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
            <button className="volver-btn" id="volver-btn" onClick={() => window.location.href = '/login'}>Volver</button>
          </ul>
        </nav>
      </header>

      <main className="medio">
        <section className="registro">
          <img src={Logo2} alt="logo2" className="logo2" />
          <h2>Registro de Usuario</h2>
          <form id="registro-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="apellido">Apellido:</label>
              <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="correo">Correo electrónico:</label>
              <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="contrasena">Contraseña:</label>
              <input type="password" id="contrasena" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="confirmarContrasena">Confirmar contraseña:</label>
              <input type="password" id="confirmarContrasena" name="confirmarContrasena" value={formData.confirmarContrasena} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="tipoVehiculo">Tipo de vehículo:</label>
              <select id="tipoVehiculo" name="tipoVehiculo" value={formData.tipoVehiculo} onChange={handleChange} required>
                <option value="">Seleccionar...</option>
                <option value="Automovil">Automovil</option>
                <option value="Motocicleta">Motocicleta</option>
                <option value="Camioneta">Camioneta</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="placaVehiculo">Placa del vehículo:</label>
              <input type="text" id="placaVehiculo" name="placaVehiculo" value={formData.placaVehiculo} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="colorVehiculo">Color del vehículo:</label>
              <input type="text" id="colorVehiculo" name="colorVehiculo" value={formData.colorVehiculo} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="facultad">Facultad:</label>
              <input type="text" id="facultad" name="facultad" value={formData.facultad} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="cedula">Cédula de identidad:</label>
              <input type="number" id="cedula" name="cedula" value={formData.cedula} onChange={handleChange} required />
            </div>
            <button type="submit">Registrarse</button>
          </form>
        </section>
      </main>

      <footer className="final">
        ULEAM ...
      </footer>
    </div>
  );
};

export default Registro;
