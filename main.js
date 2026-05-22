let cantidadSeries = 6;

document.addEventListener('DOMContentLoaded', () => {
    cargarSeries();
});



async function traerSeries(pagina) {
    const series = [];

    for (let id = 1; id < cantidadSeries; id++) {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        series.push(await response.json());
    }

    return series;
}

function mostrarSeries(seriesData) {
    const contenedor = document.getElementById('series');
    contenedor.innerHTML = '<p>cargando series...</p>';

    seriesData.forEach(dato => {
        const serie = new Serie(
            dato.id, 
            dato.url, 
            dato.name, 
            dato.language, 
            dato.genres, 
            dato.image.medium
        );
        contenedor.appendChild(serie.createHtmlElement());
    });
}

async function cargarSeries() {
    const series = await traerSeries();
    mostrarSeries(series);
}

function paginaSiguiente(){}

function paginaAnterior(){}