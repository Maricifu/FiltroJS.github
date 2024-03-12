const ciudadanosform = document.getElementById("CrearCiudadano")
const enlistarCiudadanos= document.getElementById("ListaCiudadanos")
const analizarCiudadanos= document.getElementById("AnalizarADN")

const ocultartodo = ()=>{
    ciudadanosform.style.display="none"
    enlistarCiudadanos.style.display="none"
    analizarCiudadanos.style.display="none"
}

document.getElementById("Ciudadanos").addEventListener('click', function(){
    ocultartodo()
    ciudadanosform.style.display="block"
    FormularioCiudadano()
})

document.getElementById("enlistarCiudadanos").addEventListener('click', function(){
    ocultartodo()
    enlistarCiudadanos.style.display="block"
    EnlistarCiudadanos()
})

document.getElementById("analisis").addEventListener('click', function(){
    ocultartodo()
    analizarCiudadanos.style.display="block"
    AnalizarADN()
})
