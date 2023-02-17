addEventListener("load", init);

function init(){

    let model = document.getElementById("bev-model");
    let hfdKl = document.getElementById("bev-hfdkl");
    let subKl = document.getElementById("bev-subkl");
    let maat = document.getElementById("bev-maat");
    let tekstSchoen = document.getElementById("bev-tekstSchoen");
    let voornaam = document.getElementById("bev-voornaam");
    let achternaam = document.getElementById("bev-achternaam");
    let email = document.getElementById("bev-email");
    let straatnaam = document.getElementById("bev-straatnaam");
    let huisnummer = document.getElementById("bev-huisnummer");
    let gemeente = document.getElementById("bev-gemeente");
    let postcode = document.getElementById("bev-postcode");
    let opmerkingen = document.getElementById("bev-opmerkingen");

    model.innerHTML = getParam("schoen-model");
    hfdKl.innerHTML = getParam("radio-hkl");
    subKl.innerHTML = getParam("radio-skl");
    maat.innerHTML = getParam("radio-maat");
    tekstSchoen.innerHTML = getParam("tekst-schoen");
    voornaam.innerHTML = getParam("vnaam");
    achternaam.innerHTML = getParam("fnaam");
    email.innerHTML = getParam("email");
    straatnaam.innerHTML = getParam("straatnaam");
    huisnummer.innerHTML = getParam("huisnummer");
    gemeente.innerHTML = getParam("gemeente");
    postcode.innerHTML = getParam("postcode");
    opmerkingen.innerHTML = getParam("opmerkingen");


}

function getParam(name){
    let queryString = decodeURIComponent(window.location.search.slice(1));
    let params = queryString.split("&");
    let value = "";

    for (let i=0;i<params.length; i++){
        let parts = params[i].split("=");
        if(parts[0]===name){
            value =parts[1];
            break;
        }
    }
    return value.replace(/\+/g, " ");
}