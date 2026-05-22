class Series{
    constructor(id, url, name, languaje, generes, image){
        this.id = id;
        this.url = url;
        this.name = name;
        this.languaje = languaje;
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

        div.appendChild(name);
        div.appendChild(language);
        div.appendChild(generes);
        div.appendChild(img);

        return div;
    }
}