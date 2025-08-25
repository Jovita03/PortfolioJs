function convertir() {
  const temp = document.getElementById("temperatura").value;
  const unidad = document.getElementById("unidad").value;
  const resultadoDiv = document.getElementById("resultado");

  if (temp === "") {
    resultadoDiv.textContent = "Por favor introduce un valor.";
    return;
  }

  let resultado;

  if (unidad === "C") {
    // Celsius → Fahrenheit
    resultado = (parseFloat(temp) * 9/5) + 32;
    resultadoDiv.textContent = `${temp} °C = ${resultado.toFixed(2)} °F`;
  } else {
    // Fahrenheit → Celsius
    resultado = (parseFloat(temp) - 32) * 5/9;
    resultadoDiv.textContent = `${temp} °F = ${resultado.toFixed(2)} °C`;
  }
}
