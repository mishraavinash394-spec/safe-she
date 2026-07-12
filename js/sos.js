let sosButton = document.getElementById("sosButton");

let locationDiv = document.getElementById("location");

let countdown;

sosButton.addEventListener("click", function () {

    let seconds = 5;

    sosButton.disabled = true;

    sosButton.innerHTML = "SOS in " + seconds;

    countdown = setInterval(function () {

        seconds--;

        sosButton.innerHTML = "SOS in " + seconds;

        if (seconds <= 0) {

            clearInterval(countdown);

            sendSOS();

        }

    },1000);

});

function sendSOS(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(function(position){

            let lat = position.coords.latitude;

            let lon = position.coords.longitude;

            locationDiv.innerHTML = `

            <h3>🚨 SOS Activated</h3>

            <p><b>Latitude:</b> ${lat}</p>

            <p><b>Longitude:</b> ${lon}</p>

            <p style="color:red;font-weight:bold;">
            Emergency Alert Sent Successfully!
            </p>

            `;

        });

    }else{

        alert("Location not supported.");

    }

}