class Serie{
    constructor(id, url, name, language, generes, image){
        this.id = id;
        this.url = url;
        this.name = name;
        this.language  = language;
        this.generes = generes;
        this.image = image;
    }

    toJsonString(){
         return JSON.stringify({
            id: this.id,
            url: this.url,
            name: this.name,
            language: this.language,
            generes: this.generes,
            image: this.image
        });
    }

    static createFromJsonString(json) {
        const datos = JSON.parse(json);
        return new Serie(datos.id, datos.url, datos.name, datos.language, datos.generes, datos.image);
    }

    createHtmlElement(){
        const div = document.createElement('div');
        div.className = 'serie';

        const name = document.createElement('h3');
        name.textContent = this.name;

        const language = document.createElement('p');
        language.textContent = this.language;

        const generes = document.createElement('p');
        generes.textContent = this.generes.join(', ');

        const img = document.createElement('img');
        img.src = this.image;
        img.alt = this.name;
        
        img.addEventListener('click', () => {
            window.open(this.url, '_blank');
        });

        const btnGuardar = document.createElement('button');
            btnGuardar.textContent = 'guardar';
            btnGuardar.addEventListener('click', () => {
                Serie.guardarSerie(this);
        });

        div.appendChild(name);
        div.appendChild(language);
        div.appendChild(generes);
        div.appendChild(img);
        div.appendChild(btnGuardar);

        return div;
    
    }

    static guardarSerie(serie) {
        const raw = localStorage.getItem('series_guardadas');
        const guardadas = raw ? JSON.parse(raw) : [];

        const existe = guardadas.some(s => {
            const serieObj = JSON.parse(s);
            return serieObj.id === serie.id;
        });

        if (existe) {
            alert('Esta serie ya fue guardada.');
            return;
        }

        guardadas.push(serie.toJsonString());
        localStorage.setItem('series_guardadas', JSON.stringify(guardadas));
        alert('Serie guardada.');
    }
}