function data() {
    document.getElementById("data").innerHTML = Date();
    setInterval(data,1000);
}

function url() {
    var url = window.location.href;
    document.getElementById("url").innerHTML = url;
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("locatie").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById("locatie").innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

function versiuneBrowser() {
    document.getElementById("versiune").innerHTML = navigator.appCodeName + " " + navigator.appVersion;
}

function SistemOperare() {
    var os = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) os = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) os = "MacOS";
    if (navigator.appVersion.indexOf("Linux") != -1) os = "Linux";
    document.getElementById("sistem").innerHTML = os;
}

function afiseazaSectiunea1() {
    data();
    url();
    getLocation();
    versiuneBrowser();
    SistemOperare();

}
///////////////////////////////////////////////////////////
function getMousePos(evt) {
    return {
        x: evt.offsetX,
        y: evt.offsetY
    };
} 
var isFirst = true;
var pct = null;

function afiseazaSectiunea2(event) {

    var canvas = document.getElementById("canvas");
    var pos = getMousePos(event);
    var posx = pos.x;
    var posy = pos.y;


    if (isFirst == true) {
        isFirst = false;
        pct = pos;
    } else {
        isFirst = true;

        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.rect(pct.x, pct.y, Math.abs(posx - pct.x), Math.abs(posy - pct.y));
        ctx.lineWidth = 5;
        ctx.strokeStyle = document.getElementById("contur").value;
        ctx.stroke();
        ctx.fillStyle = document.getElementById("umplere").value;
        ctx.fill();
    }
}
function addRow() {
    var table = document.getElementById("myTable");
    var whichRow = document.getElementById("adaugaLinie").value;
    var color = document.getElementById("adaugaCuloare").value;

    var row = table.insertRow(whichRow);

    for (var i = 0; i < table.rows[0].cells.length; i++) {
        var myCell = row.insertCell(i);
        myCell.innerHTML = "";
        myCell.style.background = color;
    }
}

function appendColumn() {
    var tbl = document.getElementById('myTable'); 
    var column = document.getElementById("adaugaColoana").value;
    var color = document.getElementById("adaugaCuloare").value;

    for (var i = 0; i < tbl.rows.length; i++) {
        var myCell = tbl.rows[i].insertCell(column);
        myCell.innerHTML = "";
        myCell.style.background = color;

    }
}

function schimbaContinut(resursa, jsFisier, jsFunctie) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.getElementById("continut").innerHTML = this.responseText;
      if (jsFisier) {
        var elementScript = document.createElement('script');
        elementScript.onload = function () {
            console.log("hello");
            if (jsFunctie) {
                window[jsFunctie]();
            }};
        elementScript.src = jsFisier;
        document.head.appendChild(elementScript);
       } else {
        if (jsFunctie) {
        window[jsFunctie]();
        }
       } 
    };
    xhttp.open("GET", resursa + ".html", true);
    xhttp.send();
}




function verifica()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        var obj = JSON.parse(xhttp.responseText);
        for(var i = 0; i< obj.length; i++)
            if (document.getElementById("utilizator").value === obj[i].utilizator && 
                document.getElementById("parola").value === obj[i].parola) 
            {
                document.getElementById("validare1").innerHTML = "Nume utilizator+parolă corecte";
            } 
            else if (document.getElementById("utilizator").value !== obj[i].utilizator && 
                    document.getElementById("parola").value !== obj[i].parola)
            {
                document.getElementById("validare1").innerHTML = "Nume utilizator și/sau parolă greșita";
            } 
            else if (document.getElementById("parola").value !== obj[i].parola) 
            {
                document.getElementById("validare1").innerHTML = "Parolă greșită";
            }
    }
    };

    xhttp.open("GET", "../../resurse/utilizatori.json", true);
    xhttp.send();
}

function salveazaUtilizator() {
    // Extrage datele introduse de utilizator din formular
    var nume = document.getElementById("numeUtil").value;
    var parola = document.getElementById("parolaUtil").value;

    // Creează un obiect JSON cu datele utilizatorului
    var utilizator = {
        "utilizator": nume,
        "parola": parola
    };

    // Converteste obiectul JSON intr-un string
    var utilizatorJSON = JSON.stringify(utilizator);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/api/utilizatori", true); // Aici trebuie să specifici calea către un script PHP care să primească și să salveze datele
    xhttp.send(utilizatorJSON);
    alert("Utilizator inregistrat cu sucess!");
}


// Funcție pentru a activa butonul de submit doar dacă toate câmpurile sunt completate și caseta de acord este bifată
function activareButon() {
    var checkbox = document.getElementById("agree");
    var nume = document.getElementById("numeUtil").value;
    var parola = document.getElementById("parolaUtil").value;
    var butonSubmit = document.getElementById("submit_button");
    if (checkbox.checked && nume.trim() !== "" && parola.trim() !== "") {
        butonSubmit.disabled = false;
    } else {
        butonSubmit.disabled = true;
    }
}