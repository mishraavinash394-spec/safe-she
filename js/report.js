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
let currentDate = new Date();

let dateTime = currentDate.toLocaleString();

document.getElementById("successMessage").innerHTML = `
✅ Your report has been submitted successfully.
<br><br>
📅 Report Time: ${dateTime}
`;

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