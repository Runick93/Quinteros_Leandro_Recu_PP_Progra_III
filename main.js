let cantidadSeries = 6;
let paginaActual = 1;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('siguiente').addEventListener('click', paginaSiguiente);
    document.getElementById('anterior').addEventListener('click', paginaAnterior);

    cargarSeries();
});



async function traerSeries() {
    const inicio = (paginaActual - 1) * cantidadSeries + 1;
    const series = [];

    for (let id = inicio; id < inicio + cantidadSeries; id++) {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        series.push(await response.json());
    }

    return series;
}

function mostrarSeries(seriesData) {
    const contenedor = document.getElementById('series');
    contenedor.innerHTML = '';

    seriesData.forEach(dato => {
        const serie = new Serie(
            dato.id, 
            dato.url, 
            dato.name, 
            dato.language, 
            dato.genres, 
            dato?.image.medium
        );
        contenedor.appendChild(serie.createHtmlElement());
    });
}

async function cargarSeries() {
    const series = await traerSeries();
    mostrarSeries(series);
}



function paginaSiguiente() {
    paginaActual++;
    cargarSeries();
}


function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        cargarSeries();
    }
}