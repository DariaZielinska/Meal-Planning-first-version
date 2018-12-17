document.addEventListener("DOMContentLoaded", function (event) {

    var placeName = document.querySelector(".menu li");
    placeName.innerHTML = localStorage.getItem("name");

});