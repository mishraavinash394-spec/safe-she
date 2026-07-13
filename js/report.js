if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position){

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        document.getElementById("locationInput").value =
        lat + ", " + lon;

    });

}

const form = document.getElementById("reportForm");

form.addEventListener("submit", function(e){

e.preventDefault();
let report = {
    name: document.getElementById("name").value,
    location: document.getElementById("locationInput").value,
    incident: document.getElementById("incident").value,
    description: document.getElementById("description").value,
    date: new Date().toLocaleString()
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

});
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");

imageUpload.addEventListener("change", function () {

    const file = this.files[0];

    if(file){

        imagePreview.src = URL.createObjectURL(file);

        imagePreview.style.display = "block";

    }

});
const videoUpload = document.getElementById("videoUpload");
const videoPreview = document.getElementById("videoPreview");

videoUpload.addEventListener("change", function () {

    const file = this.files[0];

    if(file){

        videoPreview.src = URL.createObjectURL(file);

        videoPreview.style.display = "block";

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

            </div>

            <br>
        `;

    });

}