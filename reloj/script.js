function actualizarReloj() {
  const reloj = document.getElementById('clock');
  const ahora = new Date();

  let horas = ahora.getHours().toString().padStart(2, '0');
  let minutos = ahora.getMinutes().toString().padStart(2, '0');
  let segundos = ahora.getSeconds().toString().padStart(2, '0');

  reloj.textContent = `${horas}:${minutos}:${segundos}`;
}

// Actualiza cada segundo
setInterval(actualizarReloj, 1000);
actualizarReloj(); // Llamada inicial
