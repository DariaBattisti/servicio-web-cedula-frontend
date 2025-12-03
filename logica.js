// Seleccionamos elementos del DOM
const formulario = document.querySelector('.form');
const inputCedula = document.getElementById('cedula');
const mensaje = document.querySelector('.mensaje');

// URL del servicio web en Render
const URL_SERVICIO = "https://servicio-web-cedula-backend-1.onrender.com/validarCedula";

formulario.addEventListener('submit', async function (evento) {
  evento.preventDefault();

  const cedulaOriginal = inputCedula.value;

  if (!cedulaOriginal.trim()) {
    mensaje.textContent = "Debe introducir una cedula.";
    mensaje.style.color = "red";
    return;
  }

  mensaje.textContent = "Consultando servicio web...";
  mensaje.style.color = "rgb(82, 93, 148)";

  try {
    const respuesta = await fetch(URL_SERVICIO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cedula: cedulaOriginal })
    });

    const data = await respuesta.json();

    if (data.valida) {
      mensaje.textContent = data.mensaje + " (" + data.cedula + ")";
      mensaje.style.color = "green";
    } else {
      mensaje.textContent = data.mensaje + (data.cedula ? " (" + data.cedula + ")" : "");
      mensaje.style.color = "red";
    }
  } catch (error) {
    console.error(error);
    mensaje.textContent = "Error al conectar con el servicio web.";
    mensaje.style.color = "red";
  }
});
