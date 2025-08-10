async function conexionLista() {
    const res = await fetch('https://rickandmortyapi.com/api/character');
    const data = await res.json();
    return data.results; // Ahora la API devuelve los personajes en results
}

async function general() {
    const personajes = await conexionLista();
    mostrarLista(personajes);
}
