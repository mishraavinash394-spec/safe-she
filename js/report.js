if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position){

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        document.getElementById("locationInput").value =
        lat + ", " + lon;

    });

}
let imageData = "";
let videoData = "";
const form = document.getElementById("reportForm");

form.addEventListener("submit", function(e){

e.preventDefault();
let report = {
    name: document.getElementById("name").value,
    location: document.getElementById("locationInput").value,
    incident: document.getElementById("incident").value,
    description: document.getElementById("description").value,
    date: new Date().toLocaleString(),
    image: imageData,
    video: videoData
};


let reports =
JSON.parse(localStorage.getItem("reports")) || [];

reports.push(report);

localStorage.setItem("reports", JSON.stringify(reports));
let currentDate = new Date();

let dateTime = currentDate.toLocaleString();

document.getElementById("successMessage").innerHTML = `
✅ Your report has been submitted successfully.
<br><br>
📅 Report Time: ${dateTime}
`;
displayReports();
form.reset();
imagePreview.style.display = "none";
imagePreview.src = "";

videoPreview.style.display = "none";
videoPreview.src = "";
});
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");

imageUpload.addEventListener("change", function () {

    const file = this.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(e){

            imageData = e.target.result;

            imagePreview.src = imageData;

            imagePreview.style.display = "block";

        };

        reader.readAsDataURL(file);

    }

});
const videoUpload = document.getElementById("videoUpload");
const videoPreview = document.getElementById("videoPreview");

videoUpload.addEventListener("change", function () {

    const file = this.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(e){

            videoData = e.target.result;

            videoPreview.src = videoData;

            videoPreview.style.display = "block";

        };

        reader.readAsDataURL(file);

    }

});
displayReports();

function displayReports() {

    let reports =
    JSON.parse(localStorage.getItem("reports")) || [];

    let history =
    document.getElementById("reportHistory");

    history.innerHTML = "";

    reports.forEach((report, index) => {

        history.innerHTML += `
<div class="report-card">

    <h3>${report.incident}</h3>

    <p><b>Name:</b> ${report.name}</p>

    <p><b>Location:</b> ${report.location}</p>

    <p><b>Description:</b> ${report.description}</p>

    <p><b>Date:</b> ${report.date}</p>
${report.image ? `
<br>

<img src="${report.image}"
style="
width:200px;
border-radius:10px;
margin-top:10px;
">
` : ""}
${report.video ? `
<br><br>

<video
width="250"
controls
style="border-radius:10px;">

<source src="${report.video}">

</video>

` : ""}
    <button onclick="deleteReport(${index})">
        🗑 Delete
    </button>

</div>

<br>
`;
        

    });

}
function deleteReport(index){

    let reports =
    JSON.parse(localStorage.getItem("reports")) || [];

    reports.splice(index,1);

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );

    displayReports();

}