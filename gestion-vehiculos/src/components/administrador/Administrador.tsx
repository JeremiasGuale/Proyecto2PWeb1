import React, { useEffect } from 'react';
import Logo from '../../assets/image/LOGO-ULEAM-HORIZONTAL.png';
import jsPDF from 'jspdf';
import '../../assets/css/registro.css';

interface Registro {
  nombre: string;
  apellido: string;
  fechaHoraEntrada: string;
  fechaHoraSalida: string;
  usuarioId: string;
}

const Administrador: React.FC = () => {
  useEffect(() => {
    const listaRegistros = document.getElementById('lista-registros') as HTMLUListElement;

    // Obtener registros completos
    const registrosCompletos: Registro[] = JSON.parse(localStorage.getItem('registrosCompletos') || '[]');
    registrosCompletos.forEach((registro, index) => {
      agregarRegistro(registro, index);
    });

    // Función para agregar registro a la lista
    function agregarRegistro(registro: Registro, index: number) {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>Nombre:</strong> ${registro.nombre} ${registro.apellido}<br>
        <strong>Fecha y Hora de Entrada:</strong> ${new Date(registro.fechaHoraEntrada).toLocaleString()}<br>
        <strong>Fecha y Hora de Salida:</strong> ${new Date(registro.fechaHoraSalida).toLocaleString()}<br>
        <strong>ID de Usuario:</strong> ${registro.usuarioId}<br>
      `;

      // Botón para eliminar registro
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', function() {
        eliminarRegistro(index);
        li.remove(); // Eliminar el elemento de la lista
      });
      li.appendChild(btnEliminar);

      listaRegistros.appendChild(li);
    }

    // Función para eliminar registro
    function eliminarRegistro(index: number) {
      const registrosCompletos: Registro[] = JSON.parse(localStorage.getItem('registrosCompletos') || '[]');
      registrosCompletos.splice(index, 1); // Eliminamos el registro en el índice especificado
      localStorage.setItem('registrosCompletos', JSON.stringify(registrosCompletos));
    }

    // Botón para generar el PDF
    const btnGenerarPDF = document.createElement('button');
    btnGenerarPDF.textContent = 'Generar PDF';
    btnGenerarPDF.addEventListener('click', function() {
      generarPDF();
    });
    listaRegistros.parentNode?.insertBefore(btnGenerarPDF, listaRegistros.nextSibling);

    // Función para generar el PDF
    function generarPDF() {
      const doc = new jsPDF();

      // Iterar sobre los registros para agregarlos al PDF
      registrosCompletos.forEach((registro, index) => {
        const y = 10 + index * 60;
        doc.text(`Nombre: ${registro.nombre} ${registro.apellido}`, 10, y);
        doc.text(`Fecha y Hora de Entrada: ${new Date(registro.fechaHoraEntrada).toLocaleString()}`, 10, y + 10);
        doc.text(`Fecha y Hora de Salida: ${new Date(registro.fechaHoraSalida).toLocaleString()}`, 10, y + 20);
        doc.text(`ID de Usuario: ${registro.usuarioId}`, 10, y + 30);
        doc.text('----------------------------------------', 10, y + 40);
      });

      // Guardar el PDF
      doc.save('registros.pdf');
    }

  }, []);

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
          <ul className="cabecera-opciones-lista">
            <button className="admin-btn"><a id="admin-btn" href="/loginAdministrador">Cerrar sesión</a></button>
          </ul>
        </nav>
      </header>

      <div id="contenedor-medio">
        <h2>Registros de Entrada y Salida</h2>
        <ul id="lista-registros"></ul>
      </div>
    </div>
  );
};

export default Administrador;
