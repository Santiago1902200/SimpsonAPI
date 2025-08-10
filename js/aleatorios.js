var personajesMostrados = JSON.parse(localStorage.getItem("personajesMostrados")) || [];
const totalPersonajes = 826; // Total de personajes según la API

async function mostrarAleatorios() {
    const app = document.getElementById("app");
    let html = '<section class="c-aleatorio c-lista">';

    for (let i = 0; i < 4; i++) {
        let num = Math.floor(Math.random() * totalPersonajes) + 1;

        // Evitar repetidos dentro de la sesión
        let repetido = false;
        for (let x = 0; x < personajesMostrados.length; x++) {
            if (personajesMostrados[x] === num) {
                repetido = true;
                break;
            }
        }

        if (!repetido) {
            personajesMostrados.push(num);
            localStorage.setItem("personajesMostrados", JSON.stringify(personajesMostrados));
        }

        // Obtener personaje desde API
        const res = await fetch(`https://rickandmortyapi.com/api/character/${num}`);
        const data = await res.json();

        html += `
        <div class="c-lista-personaje c-un_aleatorio">
            <p>#${data.id}</p>
            <img src="${data.image}" alt="${data.name}" width="100" height="100">
            <p>${data.name}</p>
        </div>`;
    }

    html += "</section>";
    app.innerHTML = html;
}

