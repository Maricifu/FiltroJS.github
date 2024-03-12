const formularioAdnAnalizar = document.querySelector("#AnalizarADN")


const AnalizarADN= ()=>{
    formularioAdnAnalizar.innerHTML="";
    const div=document.createElement("div")
    div.innerHTML = `
  <form id="FormularioCiudadano">
    <h4>Crear Ciudadano</h4>
            
    <label for="AdnInputInvestigar">Codigo ADN </label> 
    <input type="text" class="form-control" id="AdnInputInvestigar" placeholder="ADN" required>
   
    <div id="botonsubir">
      <button id="submitBtn" class="btn btn-primary" onclick="CompararCiudadano();">Comparar</button>
    </div>
  </form>
`;

formularioAdnAnalizar.append(div)
  
}

// ...

const CompararCiudadano = () => {
    const codigoIngresado = document.getElementById("AdnInputInvestigar").value;
  
    const longitudCodigos = ciudadanoz[0].codigo_adn.length;
    if (codigoIngresado.length !== longitudCodigos) {
      alert("El código de ADN ingresado no tiene la longitud correcta.");
      return;
    }
  
    function calcularSimilitud(codigo1, codigo2) {
      const longitud = codigo1.length;
      let coincidencias = 0;
  
      for (let i = 0; i < longitud; i++) {
        if (codigo1.charAt(i) === codigo2.charAt(i)) {
          coincidencias++;
        }
      }
  
      return (coincidencias / longitud) * 100;
    }
  
    function obtenerCiudadanosSimilares(codigo) {
      return ciudadanoz
        .map((ciudadano) => ({
          nombre: ciudadano.nombre_completo,
          similitud: calcularSimilitud(codigo, ciudadano.codigo_adn),
        }))
        .sort((a, b) => b.similitud - a.similitud)
        .slice(0, 5);
    }
  
    const ciudadanosSimilares = obtenerCiudadanosSimilares(codigoIngresado);
  
    const resultadosDiv = document.createElement("div");
    resultadosDiv.classList.add("resultadosCiudadanos");
    resultadosDiv.innerHTML = "<h4>Ciudadanos más similares:</h4>";
    ciudadanosSimilares.forEach((ciudadano) => {
      resultadosDiv.innerHTML += `<p>${ciudadano.nombre} - Similitud: ${ciudadano.similitud.toFixed(2)}%</p>`;
    });
  
    formularioAdnAnalizar.appendChild(resultadosDiv);
  };
  
  