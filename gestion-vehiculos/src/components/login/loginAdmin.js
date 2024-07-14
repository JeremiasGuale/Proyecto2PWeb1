document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores de usuario y contraseña ingresados
    var usuario = document.getElementById('usuario').value.trim();
    var contrasena = document.getElementById('contrasena').value.trim();

    // Verificar si las credenciales son válidas
    if (usuario === 'jeremias' && contrasena === 'jeremias123') {
        // Credenciales válidas, redirigir a la página de administración
        window.location.href = 'administracion.html'; // Cambiar 'admin.html' por la página de administración
    } else {
        // Credenciales inválidas, mostrar mensaje de error
        alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }
});