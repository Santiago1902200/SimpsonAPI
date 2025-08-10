async function obtenerPersonajes() {
    try {
        const respuesta = await fetch("https://rickandmortyapi.com/api/character");
        const data = await respuesta.json();

        // Ahora personajes es data.results
        const personajes = data.results || [];
        mostrarLista(personajes);
    } catch (error) {
        console.error("Error al obtener los personajes:", error);
    }
}

function mostrarLista(personajes) {
    const app = document.getElementById("app");
    app.innerHTML = "";

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    const buscador = document.createElement("input");
        buscador.classList.add("c-buscador");
            buscador.type = "text";
                buscador.placeholder = "Buscar personaje...";
                    buscador.addEventListener("input", (evento) => buscarPersonaje(evento, personajes));

    seccion.innerHTML = generarLista(personajes);

    app.appendChild(buscador);
    app.appendChild(seccion);
}

function generarLista(personajes) {
    let listaHTML = "";
    for (let i = 0; i < personajes.length; i++) {
        let p = personajes[i];
        listaHTML += `
        <div class="c-lista-personaje" onclick="mostrarDetalle('${p.id}')">
            <p>#${p.id}</p>
            <img src="${p.image}" height="80" loading="lazy" alt="${p.name}">
            <p><strong>${p.name}</strong></p>
            <p>Género: ${p.gender}</p>
            <p>Estado: ${p.status}</p>
            <p>Especie: ${p.species}</p>
            <p>Creado: ${new Date(p.created).toLocaleDateString()}</p>
        </div>`;
    }
    return listaHTML;
}

function buscarPersonaje(evento, personajes) {
    const texto = evento.target.value.toLowerCase();
    let listaFiltrada = [];

    if (texto.length >= 3 && isNaN(texto)) {
        listaFiltrada = personajes.filter(p => p.name.toLowerCase().includes(texto));
    } else if (!isNaN(texto) && texto !== "") {
        listaFiltrada = personajes.filter(p => p.id == Number(texto));
    } else {
        listaFiltrada = personajes;
    }

    document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada);
}

obtenerPersonajes();
