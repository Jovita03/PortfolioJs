let display = document.getElementById('display');

function agregar(valor) {
  display.value += valor;
}

function borrar() {
  display.value = '';
}

function calcular() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Error';
  }
}
