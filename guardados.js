let seriesActuales = [];

function mostrarSeries(series) {
    const contenedor = document.getElementById('series');

    if (!series || series.length === 0) {
        contenedor.innerHTML = '<p>No hay series guardadas.</p>';
        return;
    }

    contenedor.innerHTML = '';

    series.forEach(serie => {
        const elemento = serie.createHtmlElement();
        contenedor.appendChild(elemento);
    });
}

function cargarSeriesGuardadas() {
    const guardadas = localStorage.getItem('series_guardadas');

    if (!guardadas) {
        seriesActuales = [];
        mostrarSeries([]);
        return;
    }

    try {
        const arrayDeStrings = JSON.parse(guardadas);
        seriesActuales = arrayDeStrings.map(str => Serie.createFromJsonString(str));
        mostrarSeries(seriesActuales);
    } catch (error) {
        console.error('Error al cargar:', error);
        document.getElementById('series').innerHTML = '<p>Error al cargar las series.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarSeriesGuardadas();
});


