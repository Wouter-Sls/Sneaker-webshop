addEventListener("load", init);


function init() {
    createPagina(dataInlezen(data));

    let buttonReverse = document.querySelector("#reverse");
    buttonReverse.addEventListener("click", reverse);

}

function dataInlezen(data) {
    let producten = [];
    for (let i = 0; i < data.length; i++) {
        producten[i] = new Product(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5]);
    }
    return producten;
}

function createPagina(producten) {
    let categorieen = getCategorieen(producten);

    addReverse();
    for (let i = 0; i < categorieen.length; i++) {
        if (i === 0) {
            beginArticle();
        } else if (i === categorieen.length - 1) {
            eindigArticle();
        }
        let proCat = new ProductCategorie(categorieen[i]);
        proCat.createHTML(true);
    }
}

class Product {
    constructor(naam, afbeelding, alt, href, categorie, klasse) {
        this._naam = naam;
        this._afbeelding = afbeelding;
        this._alt = alt;
        this._href = href;
        this._klasse = klasse;
        this._categorie = categorie;
    }

    get categorie() {
        return this._categorie;
    }

    getHTMLProduct() {
        let html;
        html = "<section class=\"" + this._klasse + "\" >";
        if (this._href === "#") {
            html += "<img class=\"width-producten\" src=\"" + this._afbeelding + "\" alt=\"" + this._alt + "\">" +
                "<h5>" + this._naam + "</h5>";
        } else {
            html += "<a href=\"" + this._href + "\"><img class=\"width-producten\" src=\"" + this._afbeelding + "\" alt=\"" + this._alt + "\">" +
                "<h5>" + this._naam + "</h5></a>";
        }
        html += "</section>";

        return html;
    }
}

class ProductCategorie {
    constructor(producten) {
        this._categorie = producten[0];
        this._producten = [];
        for (let i = 1; i < producten.length; i++) {
            this._producten[i - 1] = producten[i];
        }
    }

    genereerHTMLProd(reverse) {
        let html = "";
        if (!reverse) {
            for (let i = this._producten.length - 1; i >= 0; i--) {
                html += this._producten[i].getHTMLProduct();
            }
        } else {
            for (let i = 0; i < this._producten.length; i++) {
                html += this._producten[i].getHTMLProduct();
            }
        }

        return html;
    }

    createHTML(reverse) {
        let html;
        let klassen;

        switch (this._categorie) {
            case ("Nike") :
                klassen = "n-nike-naam";
                break;
            case ("Adidas") :
                klassen = "a-adidas-naam";
                break;
            case ("Puma") :
                klassen = "p-puma-naam";
                break;
            case ("Vans") :
                klassen = "v-vans-naam";
                break;
        }

        html = "<section class=\"" + this._categorie.toLowerCase() + "-producten" + "\">" +
            "<h3 class=\"merk-naam " + klassen + "\">" + this._categorie + "</h3>" +
            "<section class=\"flex-producten\">" +
            "<h4 class=\"hidden\">" + this._categorie + "producten" + "</h4>";

        html += this.genereerHTMLProd(reverse);

        html += "</section>" +
            "</section>";
        document.querySelector(".article-producten").insertAdjacentHTML('beforeend', html);
    }
}

function getCategorieen(producten) {
    let categorieen = [[]];

    for (let i = 0; i < producten.length; i++) {

        if (categorieen.length === 1 && categorieen[0].length === 0) {
            categorieen[0][0] = producten[i].categorie;
            categorieen[categorieen.length - 1][1] = producten[i];
        } else {
            let nieuweCat = true;
            for (let j = 0; j < categorieen.length; j++) {
                nieuweCat++;
                if (categorieen[j][0] === producten[i].categorie) {
                    categorieen[j][categorieen[j].length] = producten[i];
                    nieuweCat = false;
                }
            }
            if (nieuweCat) {
                categorieen[categorieen.length] = [];
                categorieen[categorieen.length - 1][0] = producten[i].categorie;
                categorieen[categorieen.length - 1][1] = producten[i];
            }
        }
    }

    console.log(categorieen);
    return categorieen;
}

function addReverse() {
    let html;
    html = "<aside>" +
        "<button id='reverse'\">" +
        "Reverse" +
        "</button>" +
        "<form action='product.html'>" +
        "<input type=\"submit\" value='HTML-pagina'>" +
        "</form>" +
        "</aside>";
    document.querySelector(".main-producten").insertAdjacentHTML('beforeend', html);
}

function beginArticle() {
    let html;
    html = "<article class=\"article-producten\">" +
        "<h2 class=\"hidden\">Producten</h2>";

    document.querySelector(".main-producten").insertAdjacentHTML('beforeend', html);
}

function eindigArticle() {
    document.querySelector(".main-producten").insertAdjacentHTML('beforeend', "</article>");
}

function reverse() {
    document.querySelector(".article-producten").remove();
    console.log(ReversDir.direction);

    let cat = getCategorieen(dataInlezen(data));
    if (ReversDir.direction === true) {
        for (let i = 0; i < cat.length; i++) {
            console.log(i);
            if (i === 0) {
                beginArticle();
            } else if (i === cat.length - 1) {
                eindigArticle();
            }
            let prodCateg = new ProductCategorie(cat[i]);
            prodCateg.createHTML(ReversDir.direction);
        }
    } else {
        for (let i = cat.length - 1; i >= 0; i--) {
            console.log(i);
            if (i === cat.length - 1) {
                beginArticle();
            } else if (i === 0) {
                eindigArticle();
            }
            let proCat = new ProductCategorie(cat[i]);
            proCat.createHTML(ReversDir.direction);
        }
    }

    ReversDir.changeRichting();
}

class ReversDir {
    static direction = false;

    static changeRichting() {
        this.direction = !this.direction;

    }
}