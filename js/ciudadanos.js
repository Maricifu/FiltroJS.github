const formulariociudadanos = document.querySelector("#CrearCiudadano");
let ciudadanoz= []

fetch("http://localhost:3000/ciudadanos")
    .then(response=>response.json())
    .then(datazoss=>{
        ciudadanoz= datazoss
    }).catch(error=>{
        console.error('Error al obtener los datos de las asignaturas: ', error)
    })


const FormularioCiudadano= ()=>{
    formulariociudadanos.innerHTML="";
    const div=document.createElement("div")
    div.classList.add("formulariociudadanos")
    div.innerHTML = `
  <form id="FormularioCiudadano">
    <h4>Crear Ciudadano</h4>
            
    <label for="InputNombreCiudadano">Nombre</label> 
    <input type="text" class="form-control" id="InputNombreCiudadano" placeholder="Nombre" required>

    <label for="InputCodigoADN">Codigo de ADN</label> 
    <input type="text" class="form-control" id="InputCodigoADN" placeholder="ADN (solo 0 y 1, máximo 20 dígitos)" required maxlength="20" >


    <label for="InputCelularCiudadano">Celular</label> 
    <input type="number" class="form-control" id="InputCelularCiudadano" placeholder="Ejemplo: 3104819492" required>
  
    <label for="InputDireccionciudadano">Direccion</label>
    <input type="text" class="form-control" id="InputDireccionciudadano" placeholder="Direccion" required>
   
    <div id="botonsubir">
      <button id="submitBtn" class="btn btn-primary" onclick="CrearCiudadano();">Crear</button>
    </div>
  </form>
`;

  formulariociudadanos.append(div)
  const inputCodigoADN = document.getElementById("InputCodigoADN");
    inputCodigoADN.addEventListener("input", validateCodigoADN);
}

const validarFormulario = () => {
    const nombre = document.getElementById("InputNombreCiudadano").value.trim();
    const codigoADN = document.getElementById("InputCodigoADN").value.trim();
    const celular = document.getElementById("InputCelularCiudadano").value.trim();
    const direccion = document.getElementById("InputDireccionciudadano").value.trim();

    // Validar que ningún campo esté vacío
    if (!nombre || !codigoADN || !celular || !direccion) {
        alert("Por favor, complete todos los campos del formulario.");
        return;
    }

    // Validar que el código de ADN contenga solo 0s y 1s
    if (!/^[01]{1,20}$/.test(codigoADN)) {
        alert("El código de ADN solo puede contener 0s y 1s, y tener como máximo 20 dígitos.");
        return;
    }

    // Aquí puedes agregar más validaciones según tus necesidades

    // Si todas las validaciones pasan, puedes enviar el formulario
    CrearCiudadano();
};

    

const validateCodigoADN = () => {
    const inputCodigoADN = document.getElementById("InputCodigoADN");
    const inputValue = inputCodigoADN.value;

    const sanitizedValue = inputValue.replace(/[^01]/g, '');

    const truncatedValue = sanitizedValue.slice(0, 20);

    inputCodigoADN.value = truncatedValue;
}

  class ciudadano{
    constructor(nombre_completo,direccion,celular,codigo_adn){
        this.nombre_completo= nombre_completo
        this.direccion= direccion
        this.celular=celular
        this.codigo_adn=codigo_adn
    }
  }
  
  const Existeciudadano = (codigoADN) => {
    return ciudadanoz.some(ciudadano => ciudadano.codigo_adn === codigoADN);
};
  
  const CrearCiudadano =()=>{
    const NombreCiudadano= document.getElementById("InputNombreCiudadano").value;
    const CodigoADN = document.getElementById("InputCodigoADN").value;
    const CelularCiudadano= document.getElementById("InputCelularCiudadano").value;
    const DireccionCiudadano= document.getElementById("InputDireccionciudadano").value;
  
    if (Existeciudadano(CodigoADN)){
        alert(`Ya existe un ciudadano con el Codigo de ADN ${CodigoADN}. Por favor, ingrese otro ADN.`);
        return;
    }
  
    const newciudadano = new ciudadano(
        NombreCiudadano,  
        DireccionCiudadano,
        CelularCiudadano,
        CodigoADN
        );
  
    fetch("http://localhost:3000/ciudadanos",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newciudadano)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Ciudadano agregada correctamente:", data);
    })
    .catch((error) => {
      console.error("Error al agregar el ciudadano:", error);
    });
  }


  const EnlistarCiudadanos = () => {
    const listaCiudadanos = document.querySelector("#ListaCiudadanos");

    listaCiudadanos.innerHTML = "";

    if (!ciudadanoz || ciudadanoz.length === 0) {
        listaCiudadanos.innerHTML = "No hay ciudadanos registrados.";
        return;
    }

    const table = document.createElement("table");
    table.classList.add("table");

    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Celular</th>
            <th>Código ADN</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    ciudadanoz.forEach(ciudadano => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${ciudadano.nombre_completo}</td>
            <td>${ciudadano.direccion}</td>
            <td>${ciudadano.celular}</td>
            <td>${ciudadano.codigo_adn}</td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    listaCiudadanos.appendChild(table);
};

