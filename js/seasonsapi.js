const limit = 2;
let page = 1;
let episodios = [];

function buscarTemporada() {
    let numeroTemporada = document.getElementById("temporadaInput").value;
    let urlApi = "https://api.tvmaze.com/shows/83/seasons";

    fetch(urlApi)
        .then((response) => response.json())
        .then((seasons) => {
            let season = seasons.find((s) => s.number == numeroTemporada);
            if (!season) {
                mostrarError();
                return;
            }

            return fetch(`https://api.tvmaze.com/seasons/${season.id}/episodes`);
        })
        .then((response) => response.json())
        .then((data) => {
            episodios = data;
            page = 1;
            mostrarTemporada();
        })
        .catch(() => mostrarError());
}

(() => {
    const temporada = document.getElementById("temporadaInput");
    for (let i = 1; i <= 35; i++) {
        let opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = `Temporada ${i}`;
        temporada.appendChild(opcion);
    }
})();

function mostrarTemporada() {
    let infoDiv = document.getElementById("temporadaInfo");
    infoDiv.innerHTML = "";

    let start = (page - 1) * limit;
    let end = start + limit;
    let episodiosPagina = episodios.slice(start, end);

    episodiosPagina.forEach((ep) => {
        let episodioHTML = `
            <div class="episodio">
                <h2>Episodio ${ep.number}: ${ep.name}</h2>
                <p><strong>Fecha de emisión:</strong> ${ep.airdate}</p>
                <p><strong>Descripción:</strong> ${ep.summary ? ep.summary : "Sin descripción"
            }</p>
            </div>
            <hr>
        `;
        infoDiv.innerHTML += episodioHTML;
    });

    infoDiv.innerHTML += `
        <div class="paginacion">
            <button onclick="cambiarPagina(-1)" ${page === 1 ? "disabled" : ""
        }>Anterior</button>
            <button onclick="cambiarPagina(1)" ${end >= episodios.length ? "disabled" : ""
        }>Siguiente</button>
            <br>
            <span> ${page} de ${Math.ceil(episodios.length / limit)}</span>
        </div>
    `;
}

function cambiarPagina(direccion) {
    let totalPaginas = Math.ceil(episodios.length / limit);
    if (page + direccion >= 1 && page + direccion <= totalPaginas) {
        page += direccion;
        mostrarTemporada();
    }
}

function mostrarError() {
    let infoDiv = document.getElementById("temporadaInfo");
    infoDiv.innerHTML = `<p class="per-err"><strong>Temporada no encontrada. <br> Intenta con otra temporada.</strong></p>`;
}
