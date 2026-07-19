// ===============================
// SafeShe SOS System
// Part 1
// ===============================

// Firebase Auth
let currentUser = null;

firebase.auth().onAuthStateChanged(function(user){

    if(user){

        currentUser = user;

    }else{

        alert("Please Login First");

        window.location.href = "login.html";

    }

});

// ===============================
// Elements
// ===============================

const sosButton = document.getElementById("sosButton");
const cancelBtn = document.getElementById("cancelBtn");
const locationDiv = document.getElementById("location");

const sendMessageBtn =
document.getElementById("sendMessageBtn");


let emergencyWhatsAppLink = "";

let countdown = null;
let seconds = 5;

// ===============================
// SOS Button
// ===============================

sosButton.addEventListener("click", function(){

    seconds = 5;

    sosButton.disabled = true;

    cancelBtn.style.display = "inline-block";

    sosButton.innerHTML = "SOS in " + seconds;

    countdown = setInterval(function(){

        seconds--;

        sosButton.innerHTML = "SOS in " + seconds;

        if(seconds <= 0){

            clearInterval(countdown);

            sendSOS();

        }

    },1000);

});

// ===============================
// Cancel SOS
// ===============================

cancelBtn.addEventListener("click", function(){

    clearInterval(countdown);

    sosButton.disabled = false;

    sosButton.innerHTML = "ACTIVATE SOS";

    cancelBtn.style.display = "none";

    locationDiv.innerHTML =
    "<p style='color:green;font-weight:bold;'>✅ SOS Cancelled Successfully.</p>";

});

// ===============================
// Send SOS Function
// ===============================

function sendSOS(){

    cancelBtn.style.display = "none";

    if(!currentUser){

        alert("Login Expired");

        window.location.href = "login.html";

        return;

    }

    if(!navigator.geolocation){

        alert("Geolocation Not Supported");

        sosButton.disabled = false;

        sosButton.innerHTML = "ACTIVATE SOS";

        return;

    }

    navigator.geolocation.getCurrentPosition(function(position){

        let lat = position.coords.latitude;

        let lon = position.coords.longitude;

        let mapLink =
        "https://www.google.com/maps?q=" +
        lat +
        "," +
        lon;        // ===============================
        // Save SOS History in Firestore
        // ===============================

        firebase.firestore()

        .collection("users")

        .doc(currentUser.uid)

        .collection("sosHistory")

        .add({

            latitude: lat,

            longitude: lon,

            location: mapLink,

            status: "Emergency",

            createdAt: firebase.firestore.FieldValue.serverTimestamp()

        })

        .then(function(){

            console.log("✅ SOS Saved Successfully");

        })

        .catch(function(error){

            console.log(error);

        });

        // ===============================
        // Load Emergency Contacts
        // ===============================

        firebase.firestore()

        .collection("users")

        .doc(currentUser.uid)

        .collection("contacts")

        .get()

        .then(function(snapshot){

            let contactHTML = "";

            let message =

            "🚨 EMERGENCY!\n\n" +

            "I need help immediately.\n\n" +

            "My Live Location:\n" +

            mapLink +

            "\n\nSent from SafeShe";

            // ================= EMAIL ALERT =================

fetch("https://api.web3forms.com/submit", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({

        access_key: "877c6653-eb0c-421d-b49a-1baf2e115746",

        subject: "🚨 SafeShe SOS Emergency Alert",

        from_name: "SafeShe Women Safety",

        name: currentUser.email,

        email: "mishraavinash394@gmail.com",

        message:
`Emergency SOS Activated

User : ${currentUser.email}

Latitude : ${lat}

Longitude : ${lon}

Google Maps :

${mapLink}

Time : ${new Date().toLocaleString()}

Please help immediately.`

    })

})

.then(response => response.json())

.then(data => {

    console.log("✅ Email Sent", data);

})

.catch(error => {

    console.log(error);

});

            snapshot.forEach(function(doc){

                let contact = doc.data();

                contactHTML +=

                `<p>👤 ${contact.name} - ${contact.phone}</p>`;

                let phone = contact.phone.replace(/\D/g,"");

                if(phone.length === 10){

                    let whatsappLink =

                    "https://wa.me/91" +

                    phone +

                    "?text=" +

                    encodeURIComponent(message);

                    emergencyWhatsAppLink = whatsappLink;

                    console.log(whatsappLink);

                    window.open(whatsappLink,"_blank");

                }

            });            // ===============================
            // Reset Button
            // ===============================

            sosButton.disabled = false;

            sosButton.innerHTML = "ACTIVATE SOS";

            // ===============================
            // Show Result
            // ===============================
sendMessageBtn.style.display = "inline-block";
            locationDiv.innerHTML = `

                <h3>🚨 SOS Activated</h3>

                <p><b>Latitude:</b> ${lat}</p>

                <p><b>Longitude:</b> ${lon}</p>

                <p>
                    <a href="${mapLink}" target="_blank">
                        📍 Open Live Location in Google Maps
                    </a>
                </p>

                <p style="color:red;font-weight:bold;">
                    Emergency Alert Sent Successfully!
                </p>

                <h3>📞 Emergency Contacts Alerted</h3>

                ${contactHTML}

            `;

        })

        .catch(function(error){

            console.log(error);

            sosButton.disabled = false;

            sosButton.innerHTML = "ACTIVATE SOS";

            alert("Unable to load emergency contacts.");

        });

    },

    function(error){

        console.log(error);

        alert("Unable to get your current location.");

        sosButton.disabled = false;

        sosButton.innerHTML = "ACTIVATE SOS";

    });

}
// ================= SEND MESSAGE BUTTON =================

sendMessageBtn.addEventListener("click", function(){

    if(emergencyWhatsAppLink !== ""){

        window.open(emergencyWhatsAppLink, "_blank");

    }else{

        alert("No Emergency Message Available");

    }

});
