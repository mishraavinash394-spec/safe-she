// ================= SOS =================

const sosButton = document.getElementById("sosButton");

if (sosButton) {

    sosButton.addEventListener("click", function () {

        alert("🚨 SOS Activated!\nHelp request has been generated.");

    });

}

// ================= LOCATION =================

const locationBtn = document.getElementById("locationBtn");

if (locationBtn) {

    locationBtn.addEventListener("click", function () {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {

                const location = document.getElementById("location");

                if(location){

                    location.innerHTML =
                    "Latitude : " + position.coords.latitude +
                    "<br>Longitude : " + position.coords.longitude;

                }

            });

        } else {

            alert("Geolocation is not supported.");

        }

    });

}

// ================= MOBILE MENU =================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if(menuToggle && navLinks){

    menuToggle.addEventListener("click", function(){

        navLinks.classList.toggle("active");

        if(navLinks.classList.contains("active")){

            menuToggle.innerHTML = "✖";

        }else{

            menuToggle.innerHTML = "☰";

        }

    });

}