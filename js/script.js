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

}// ===============================
// SCROLL ANIMATION
// ===============================

const observer = new IntersectionObserver(function(entries){

entries.forEach(function(entry){

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".card,.about,.contact-box,.emergency").forEach(function(el){

el.classList.add("hidden");

observer.observe(el);

});// ================= CONTACT FORM =================

const sendBtn = document.getElementById("sendMessageBtn");

if(sendBtn){

sendBtn.addEventListener("click",function(){

let name=document.getElementById("contactName").value.trim();

let email=document.getElementById("contactEmail").value.trim();

let message=document.getElementById("contactMessage").value.trim();

if(name=="" || email=="" || message==""){

alert("Please fill all fields.");

return;

}
console.log("Button Working");

db.collection("messages").add({

name:name,

email:email,

message:message,

createdAt:firebase.firestore.FieldValue.serverTimestamp()

})

.then(function(){
    console.log("Data Saved");

alert("Message Sent Successfully ✅");

document.getElementById("contactName").value="";

document.getElementById("contactEmail").value="";

document.getElementById("contactMessage").value="";

})

.catch(function(error){

alert(error.message);

});

});

}