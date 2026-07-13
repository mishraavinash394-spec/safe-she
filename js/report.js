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