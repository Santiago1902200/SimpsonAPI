let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const toggleFavorito = (id, nombre, imagen) => {
    id = Number(id);
    const esFavorito = favoritos.some(p => Number(p.id) === id);

    if (esFavorito) {
        favoritos = favoritos.filter(p => Number(p.id) !== id);
        document.getElementById(`corazon-${id}`).textContent = '🤍';
    } else {
        favoritos.push({ id, nombre, imagen });
        document.getElementById(`corazon-${id}`).textContent = '❤️';
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
};

const actualizarIconoFavorito = (id) => {
    id = Number(id);
    const corazonIcono = document.getElementById(`corazon-${id}`);
    if (!corazonIcono) return;

    if (favoritos.some(p => Number(p.id) === id)) {
        corazonIcono.textContent = '❤️';
    } else {
        corazonIcono.textContent = '🤍';
    }
};

async function mostrarDetalle(id) {
    id = Number(id);
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await res.json();

    const esFavorito = favoritos.some(p => Number(p.id) === id);

    const app = document.getElementById("app");
    const detalle = `
    <section class="c-detalle">
        <img src="${data.image}" alt="${data.name}" height="150">
        <h2>${data.name}</h2>
        <p><strong>Especie:</strong> ${data.species}</p>
        <p><strong>Estado:</strong> ${data.status}</p>
        <p><strong>Género:</strong> ${data.gender}</p>
        <p><strong>Origen:</strong> ${data.origin.name}</p>
        <button id="favorito-btn-${id}" onclick="toggleFavorito(${id}, '${data.name}', '${data.image}')">
            <span id="corazon-${id}" class="corazon">${esFavorito ? '❤️' : '🤍'}</span> Favorito
        </button>
    </section>
    `;

    app.innerHTML = detalle;
    actualizarIconoFavorito(id);
}
