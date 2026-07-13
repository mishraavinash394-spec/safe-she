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
let contacts =
JSON.parse(localStorage.getItem("contacts")) || [];

let reports =
JSON.parse(localStorage.getItem("reports")) || [];

document.getElementById("totalContacts").innerHTML =
contacts.length;

document.getElementById("totalReports").innerHTML =
reports.length;

// Safety Tips
document.getElementById("tipsBtn").addEventListener("click", function () {

    alert(
`🚨 Women Safety Tips

• Share your live location with trusted contacts.

• Avoid isolated places at night.

• Keep emergency contacts updated.

• Stay alert and trust your instincts.

• Use the SOS button in emergencies.`
    );

});

// About SafeShe
document.getElementById("aboutBtn").addEventListener("click", function () {

    alert(
`SafeShe

Version 1.0

Developed by:
<p>
Developed by 
<b>Avinash Mishra & Jyoti Kumari</b>
</p>

Women Safety Web Application`
    );

});

// Settings
document.getElementById("settingsBtn").addEventListener("click", function () {

    alert("⚙️ Settings page will be available soon.");

});

// Dark Mode
document.getElementById("darkModeBtn").addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

});
const cards = document.querySelectorAll(".dash-card");

cards.forEach((card,index)=>{

card.style.opacity="0";

setTimeout(()=>{

card.style.opacity="1";

card.style.transition=".5s";

},index*150);

});
window.onload = function(){

setTimeout(function(){

document.getElementById("loader").style.display="none";

},1500);

};
// ================= PROFILE PHOTO =================

let profileUpload = document.getElementById("profileUpload");
let profileImage = document.getElementById("profileImage");

// Agar pehle se photo save hai to load karo
let savedImage = localStorage.getItem("profileImage");

if(savedImage){

    profileImage.src = savedImage;

}

profileUpload.addEventListener("change", function(){

    let file = this.files[0];

    if(file){

        let reader = new FileReader();

        reader.onload = function(e){

            profileImage.src = e.target.result;

            localStorage.setItem(
                "profileImage",
                e.target.result
            );

        };

        reader.readAsDataURL(file);

    }

});