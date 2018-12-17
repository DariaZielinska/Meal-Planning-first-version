document.addEventListener("DOMContentLoaded", function (event) {

    var placeName = document.querySelector(".menu li");
    placeName.innerHTML = localStorage.getItem("name");

    var scheduleTable = document.querySelector(".schedulesTable");



// DODAWANIE DO WIDOKU ZAPISANYCH W LOCAL STORAGE DANYCH


var allSavedPlanNames = localStorage.getItem("planName").split(",");   // dzięki temu mam tablice wartosci
var allSavedPlanDescriptions = localStorage.getItem("planDescription").split(",");
var allSavedPlanNumbers = localStorage.getItem("planNumber").split(",");

console.log(allSavedPlanNames);
console.log(allSavedPlanDescriptions);
console.log(allSavedPlanNumbers);

    for (var i = 0; i < allSavedPlanNames.length; i++) {    //tutaj kazda wartosc dostaje wlasny index

        var tr = document.createElement("tr");                  //tworze wiersz
        var index = document.createElement("td");              // tworze kolumne dla wartosci ID
        var scheduleNames = document.createElement("td");      // tworze kolumne dla nazwy przepisu

        tr.className = "element" + i;
        index.innerHTML = i;                                    //nadaje jaki tekst ma miec ta komorka
        scheduleNames.innerHTML = allSavedPlanNames[i];         // dodaje wartosc z localstorage jako tekst komorki

        scheduleTable.appendChild(tr);                          // dodaje dzieci do tabeli
        tr.appendChild(index);
        tr.appendChild(scheduleNames);

        var scheduleDescriptions = document.createElement("td");        // juz bez petli dodaje kolejne dane
        scheduleDescriptions.innerHTML = allSavedPlanDescriptions[i];
        tr.appendChild(scheduleDescriptions);

        var icons = document.createElement("td");
        var icon1 = document.createElement("i");
        var icon2 = document.createElement("i");

        icons.style.display = "flex";
        icon1.className = "fas fa-edit pen fa-2x";
        icon1.style.color = "#FFB13E";
        icon2.className = "far fa-trash-alt trash fa-2x";
        icon2.style.color = "#C1543F";

        tr.appendChild(icons);
        icons.appendChild(icon1);
        icons.appendChild(icon2);

    }

});