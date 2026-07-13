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