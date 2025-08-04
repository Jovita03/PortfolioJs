let display = document.getElementById('display'); //busca en el html el elemento con el atributo id="display"

function agregar(valor) { //decvlara la funcion y recibe un valor llamado valor 
  display.value += valor; // concatena el valor al contenido actual del display
}

function borrar() {
  display.value = '';// borra el contenido del display asignando una cadena vacia 
}

function calcular() {
  try {//maneja errores en caso de que la expresión no sea válida
    display.value = eval(display.value);
  } catch {// si  la entrada es invalida solo regresa el error
    display.value = 'Error';
  }
}
