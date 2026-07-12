const sosButton = document.getElementById("sosButton");

if (sosButton) {

    sosButton.addEventListener("click", function () {

        alert("🚨 SOS Activated!\nHelp request has been generated.");

    });

}

const locationBtn = document.getElementById("locationBtn");

if (locationBtn) {

    locationBtn.addEventListener("click", function () {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {

                document.getElementById("location").innerHTML =

                "Latitude : " + position.coords.latitude +

                "<br>Longitude : " + position.coords.longitude;

            });

        } else {

            alert("Geolocation is not supported.");

        }

    });

}