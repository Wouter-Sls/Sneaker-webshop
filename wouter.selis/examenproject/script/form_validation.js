addEventListener("load", init);

function init() {
    kleuren();

    let achternaamVeld = document.querySelector("#fnaam");
    let form = document.querySelector("form");
    let emailVeld = document.querySelector("#email");


    achternaamVeld.addEventListener("keyup", validatieAchternaam);
    emailVeld.addEventListener("blur", validatieEmail);


    form.addEventListener("submit", validatieForm);
}

function validatieAchternaam() {
    let inhoud = document.querySelector("#fnaam").value;
    let feedback = document.querySelector("#error_fnaam");

    if (inhoud.length <5) {
        feedback.innerHTML = "De achternaam moet minstens 5 tekens lang zijn!";
        return false;
    }else{
        feedback.innerHTML = "";
    }
    return true;
}

function kleuren(){
    let kleurFnaam = document.getElementById("fnaam");
    let kleurEmail = document.getElementById("email");

    kleurFnaam.style.backgroundColor = "yellow";
    kleurEmail.style.backgroundColor = "orange";

}

function validatieEmail(){
    let inhoud = document.querySelector("#email").value;
    let feedback = document.querySelector("#error_email");

    let regex = new RegExp("^(([a-z]+\.)+[a-z]+\@(student\.kdg\.be|kdg\.be))$");

    if (!inhoud.match(regex)){

        feedback.innerHTML = "Je ingevoerde e-mail behoort niet tot het KdG domein.";
        return false;
    }
    else{
        feedback.innerHTML = "";
    }

    return true;
}

function validatieForm(event) {

    let feedback = document.querySelector("#error_submit");

    if (!validatieAchternaam() || !validatieEmail()) {
        event.preventDefault();

        feedback.innerHTML = "Niet alle velden zijn correct ingevuld.";
    }

}