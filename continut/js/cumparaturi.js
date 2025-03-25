var lastId = parseInt(localStorage.getItem("lastId")) || 1;
var worker = new Worker("js/worker.js");

// Ascultam mesajele de la worker
worker.onmessage = function(event) {
    console.log(event.data);
};

function adaugaProdus() {
    var nume = document.getElementById("nume").value;
    var cantitate = document.getElementById("cantitate").value;

    var produs = {
        id: lastId++, // generăm un ID unic pentru produs
        nume: nume,
        cantitate: cantitate
    };

    adaugaInTabel(produs);

    worker.postMessage("Script principal: Am apăsat butonul Adaugă.");

    // salvăm lista actualizată în localStorage
    var listaProduse = JSON.parse(localStorage.getItem("listaProduse")) || [];
    listaProduse.push(produs);
    localStorage.setItem("listaProduse", JSON.stringify(listaProduse));

    alert("Introdus cu succes!");


}

function adaugaInTabel(produs) {
    var tbody = document.querySelector("#tabel_cumparaturi tbody");
    var row = tbody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.textContent = produs.id;
    cell2.textContent = produs.nume;
    cell3.textContent = produs.cantitate;
}