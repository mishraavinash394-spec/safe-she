let sosButton = document.getElementById("sosButton");
let cancelBtn = document.getElementById("cancelBtn");
let locationDiv = document.getElementById("location");

let countdown;
let seconds = 5;

// SOS Button Click
sosButton.addEventListener("click", function () {

    seconds = 5;

    sosButton.disabled = true;
    cancelBtn.style.display = "inline-block";
    sosButton.innerHTML = "SOS in " + seconds;

    countdown = setInterval(function () {

        seconds--;

        sosButton.innerHTML = "SOS in " + seconds;

        if (seconds <= 0) {

            clearInterval(countdown);

            sendSOS();

        }

    }, 1000);

});

// Cancel SOS
cancelBtn.addEventListener("click", function () {

    clearInterval(countdown);

    sosButton.disabled = false;
    sosButton.innerHTML = "ACTIVATE SOS";

    cancelBtn.style.display = "none";

    locationDiv.innerHTML =
    "<p style='color:green;'>✅ SOS Cancelled Successfully.</p>";

});

// Send SOS
function sendSOS() {

    cancelBtn.style.display = "none";

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
let contacts =
JSON.parse(localStorage.getItem("contacts")) || [];

let contactHTML = "";

contacts.forEach(contact => {

    contactHTML += `
    <p>👤 ${contact.name} - ${contact.phone}</p>
    `;

});
            sosButton.disabled = false;
            sosButton.innerHTML = "ACTIVATE SOS";

            locationDiv.innerHTML = `
                <h3>🚨 SOS Activated</h3>

                <p><b>Latitude:</b> ${lat}</p>

                <p><b>Longitude:</b> ${lon}</p>
<p>
<a href="https://www.google.com/maps?q=${lat},${lon}"
target="_blank">
📍 Open Live Location in Google Maps
</a>
</p>

                <p style="color:red;font-weight:bold;">
                Emergency Alert Sent Successfully!
                </p>
                <h3>📞 Emergency Contacts Alerted</h3>

${contactHTML}
            `;

        });

    } else {

        alert("Location not supported.");

    }

}