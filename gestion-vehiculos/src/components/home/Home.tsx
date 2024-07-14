import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png'
import '../../assets/css/index.css'
import React from "react"
const Home = () => {
  return (
    <div>
      <header className="cabecera">
        <nav className="cabecera-logo">
            <a href="./index.html"><img src={Logo} alt="logo" className="imagen-logo"/></a>
        </nav>
        <div className="center-container"><h1 className="titulo">Sistema de entrada y salida de vehículos</h1></div>
        <nav className="cabecera-opciones">
            <ul className="cabecera-opciones-lista">
                <button className="registro-btn"><a id="registro-btn" href="/registro">Registro</a></button>
            </ul>
        </nav>
    </header>
    <main className="medio">
        <section className="principal">
            <div className="container">
                <div className="left-container">
                  <h2>Iniciar sesión como:</h2>
                  <button id="user-btn" className="user-btn"><a id="user-btn" className="user-btn" href='/login'>Usuario</a></button>
                </div>
                
                <div className="right-container">
                    <h2>Iniciar sesión como:</h2>
                    <button id="admin-btn" className="admin-btn"><a id="admin-btn" className="admin-btn" href='/loginAdministrador'>Administrador</a></button>
                </div>
              </div>
        </section>
        <section className="vehicle-management">
            <h2>Control de Entrada y Salida de Vehículos</h2>
            <p>Bienvenido al sistema de control de entrada y salida de vehículos de la Universidad Laica Eloy Alfaro de Manabí (ULEAM). Este sistema tiene como objetivo gestionar de manera eficiente el acceso de vehículos dentro del campus universitario.</p>
            <h3>Funcionalidades:</h3>
            <ul>
                <li>Registro de vehículos autorizados</li>
                <li>Control de acceso mediante identificación de placas</li>
                <li>Registro de entradas y salidas de vehículos</li>
                <li>Generación de reportes de movimiento de vehículos</li>
                <li>Notificaciones de vehículos no autorizados</li>
            </ul>
            <h3>Beneficios:</h3>
            <ul>
                <li>Mayor seguridad dentro del campus</li>
                <li>Mejor control del tráfico vehicular</li>
                <li>Facilita la gestión de estacionamiento</li>
                <li>Registro histórico de movimientos de vehículos</li>
                <li>Reducción de riesgos de robos y accidentes</li>
            </ul>
            <p className="comentario">Para acceder al sistema como usuario autorizado o administrador, por favor utiliza los botones de inicio de sesión correspondientes.</p>
        </section>
    </main>
    <footer className="final">
        uleam ...
    </footer>
    </div>
  )
}

export default Home