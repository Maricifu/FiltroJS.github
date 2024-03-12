function buscarCulpable(){
    //lista de nombres y cromosomas
    var nombres= ["Pedro", "Juan", "Diego"];
    var cromosomas= [
        "00100101001001101010",
        "00001011011011001010",
        "10100101010011010100"
    ];
    //obtener la secuencia de adn por input
    var secuencia = document.getElementById("dnaInput").value;

    //calcular el porcentaje y encontrar el sospechoso
    var porcentajeMaximo = 0;
    var culpable = "";
    for(var i = 0; i < cromosomas.length; i++) {
        var porcentaje = calcularPP(secuencia, cromosomas[i]);
        if (porcentaje > porcentajeMaximo) {
            porcentajeMaximo = porcentaje;
            culpable = nombres[i];
        }
    }

    //mostrar resultado en html
    var resultadoElement = document.getElementById("resultado");
    resultadoElement.textContent = "El culpable es "+ culpable + " con un parentezco del " + porcentajeMaximo + "%";
}

function calcularPP(secuencia, cromosomas) {
    var genesIguales = 0;
    for (var i = 0; i < secuencia.length; i++) {
        if (secuencia.charAt(i) === cromosomas.charAt(i)) {
            genesIguales++;
        }
    }
    return (genesIguales / secuencia.length) * 100;
}

function validarLongitud() {
    var secuencia = document.getElementById("dnaInput").value;
    if (secuencia.length !== 20) {
        alert("La muestra de ADN debe ser de 20 caracteres. Por favor ingrese de nuevo la muestra correctamente");
        return false;
    }
    return true;
}