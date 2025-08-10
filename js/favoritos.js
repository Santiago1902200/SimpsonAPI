// favoritos.js

function mostrarFavoritos() {
    const app = document.getElementById("app");
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    app.innerHTML = ""; // limpiar contenido

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    if (favoritos.length === 0) {
        app.innerHTML = "<p>No tienes personajes favoritos todavía 🤍</p>";
        return;
    }

    favoritos.forEach(p => {
        const item = document.createElement("div");
        item.classList.add("c-lista-personaje");
        item.innerHTML = `
            <div onclick="mostrarDetalle(${p.id})">
                <p>#${p.id}</p>
                <img src="${p.imagen}" height="80" alt="${p.nombre}">
                <p><strong>${p.nombre}</strong></p>
            </div>
        `;
        seccion.appendChild(item);
    });

    app.appendChild(seccion);
}
