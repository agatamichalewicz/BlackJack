var SumaKrupiera = 0;
var SumaGracz = 0;
var kartykrupier = 0;
var kartygracz = 0; 
var hidden;
var stol;
var CanHit = true;

window.onload = function() {
    buildstol();
    tasowanie();
    playBlackjack();
}

function buildstol() {
    let value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let typ = ["C", "D", "H", "S"];
    stol = [];

    for (let i = 0; i < typ.length; i++) {
        for (let j = 0; j < value.length; j++) {
            stol.push(value[j] + "-" + typ[i]); 
        }
    }

}
// Funkcja do tasowania kart
function tasowanie() {
    for (let i = 0; i < stol.length; i++) {
        let j = Math.floor(Math.random() * stol.length); 
        let temp = stol[i];
        stol[i] = stol[j];
        stol[j] = temp;
    }
    console.log(stol);
}
//Funkcja gry
function playBlackjack() {
    hidden = stol.pop();
    SumaKrupiera += getValue(hidden);
    kartykrupier += sprawdzvalue(hidden);
    while (SumaKrupiera < 17) {
    let cardImg = document.createElement("img");
        let card = stol.pop();
        cardImg.src = "./karty/" + card + ".png";
        SumaKrupiera += getValue(card);
        kartykrupier += sprawdzvalue(card);
        document.getElementById("kartykrupiera").append(cardImg);
    }
    console.log(SumaKrupiera);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = stol.pop();
        cardImg.src = "./karty/" + card + ".png";
        SumaGracz += getValue(card);
        kartygracz += sprawdzvalue(card);
        document.getElementById("kartygracza").append(cardImg);
    }

    console.log(SumaGracz);
    document.getElementById("dobierz").addEventListener("click", dobierz);
    document.getElementById("zostan").addEventListener("click", stop);

}
//Funkcja dobierania
function dobierz() {
    if (!CanHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = stol.pop();
    cardImg.src = "./karty/" + card + ".png";
    SumaGracz += getValue(card);
    kartygracz += sprawdzvalue(card);
    document.getElementById("kartygracza").append(cardImg);

    if (reduceAce(SumaGracz, kartygracz) > 21) { 
        CanHit = false;
    }

}
//Funkcja zbierajaca wartosc karty
function getValue(card) {
    let data = card.split("-"); 
    let value = data[0];

    if (isNaN(value)) { 
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}
//Funkcja sprawdzajaca sume wartosci kart
function sprawdzvalue(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(SumaGraczja, kartygracza) {
    while (SumaGraczja > 21 && kartygracza > 0) {
        SumaGraczja -= 10;
        kartygracza -= 1;
    }
    return SumaGraczja;
}
//Funkcja zatrzymujaca gre
function stop() {
    SumaKrupiera = reduceAce(SumaKrupiera, kartykrupier);
    SumaGracz = reduceAce(SumaGracz, kartygracz);

    CanHit = false;
    document.getElementById("ukryta").src = "./karty/" + hidden + ".png";

    let message = "";
    if (SumaGracz > 21) {
        message = "Przegrałeś! :(";
    }
    else if (SumaKrupiera > 21) {
        message = "Wygrałeś!";
    }
    
    else if (SumaGracz == SumaKrupiera) {
        message = "Remis!";
    }
    else if (SumaGracz > SumaKrupiera) {
        message = "Wygrałeś!";
    }
    else if (SumaGracz < SumaKrupiera) {
        message = "Przegrałeś! :(";
    }

    document.getElementById("SumaKrupiera").innerText = SumaKrupiera;
    document.getElementById("SumaGracz").innerText = SumaGracz;
    document.getElementById("wynik").innerText = message;
}

