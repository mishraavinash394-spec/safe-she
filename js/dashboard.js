let user = JSON.parse(localStorage.getItem("user"));

if (user) {
    document.getElementById("userName").textContent = user.name;
}document.getElementById("logoutBtn").addEventListener("click", function () {

    localStorage.removeItem("user");

    alert("Logged Out Successfully!");

    window.location.href = "login.html";

});// ================= LIVE LOCATION =================

document.getElementById("locationBtn").addEventListener("click", function (e) {

    e.preventDefault();

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {

            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            let mapURL = `https://www.google.com/maps?q=${latitude},${longitude}`;

            window.open(mapURL, "_blank");

        }, function () {

            alert("Unable to get your location.");

        });

    } else {

        alert("Geolocation is not supported by this browser.");

    }

});// ================= NEARBY POLICE =================

document.getElementById("policeBtn").addEventListener("click", function (e) {

    e.preventDefault();

    window.open("https://www.google.com/maps/search/Police+Station+Near+Me", "_blank");

});// ================= NEARBY HOSPITAL =================

document.getElementById("hospitalBtn").addEventListener("click", function (e) {

    e.preventDefault();

    window.open("https://www.google.com/maps/search/Hospital+Near+Me", "_blank");

});