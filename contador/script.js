let contador = 0;

function incrementar() {
  contador++;
  actualizarContador();
}

function reiniciar() {
  contador = 0;
  actualizarContador();
}

function actualizarContador() {
  const elemento = document.getElementById('contador');
  elemento.innerText = contador;
  elemento.style.transform = 'scale(1.2)';
  setTimeout(() => {
    elemento.style.transform = 'scale(1)';
  }, 150);
}
