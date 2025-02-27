function buscarPersonaje() {
    let nombrePersonaje = document.getElementById("personajeInput").value;
    let urlApi = `https://thesimpsonsquoteapi.glitch.me/quotes?character=${nombrePersonaje}`;
    fetch(urlApi)
        .then((response) => response.json())
        .then((datosPersonaje) => mostrarPersonaje(datosPersonaje[0]))
        .catch(() => mostrarError());
}

function mostrarPersonaje(datosPersonaje) {
    let infoDiv = document.getElementById("personajeInfo");

    infoDiv.innerHTML = `
    <h2 class="per-name">${datosPersonaje.character.toUpperCase()}</h2>
    <img src="${datosPersonaje.image}" class="per-img">
    <p><strong>${datosPersonaje.quote}</strong></p>`;
}

function mostrarError() {
    let infoDiv = document.getElementById("personajeInfo");
    infoDiv.innerHTML = `
    <p class="per-err"> <strong>Personaje no encontrado. <br> Intenta con otro nombre </strong></p>
`;
}

window.onload = function () {
    document.getElementById("personajeInput").value = "homer simpson";
    buscarPersonaje();
};
