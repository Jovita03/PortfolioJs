let formato24h = JSON.parse(localStorage.getItem('formato24h')) ?? true;

const reloj = document.getElementById('clock');
const fecha = document.getElementById('fecha');
const btnFormato = document.getElementById('formatoBtn');

btnFormato.addEventListener('click', () => {
  formato24h = !formato24h;
  localStorage.setItem('formato24h', JSON.stringify(formato24h));
  actualizarReloj();
  actualizarTextoBoton();
});

function actualizarTextoBoton() {
  btnFormato.textContent = formato24h ? 'Cambiar a formato 12h' : 'Cambiar a formato 24h';
}

function actualizarFecha() {
  const ahora = new Date();
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  fecha.textContent = ahora.toLocaleDateString('es-MX', opciones);
}

function actualizarReloj() {
  const ahora = new Date();
  let horas = ahora.getHours();
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  const segundos = ahora.getSeconds().toString().padStart(2, '0');
  let sufijo = '';

  if (!formato24h) {
    sufijo = horas >= 12 ? ' PM' : ' AM';
    horas = horas % 12 || 12;
  }

  reloj.textContent = `${horas.toString().padStart(2, '0')}:${minutos}:${segundos}${sufijo}`;
}

// Inicializar
actualizarReloj();
actualizarFecha();
actualizarTextoBoton();
setInterval(actualizarReloj, 1000);
