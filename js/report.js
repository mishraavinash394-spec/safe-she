const form = document.getElementById("reportForm");

form.addEventListener("submit", function(e){

e.preventDefault();

document.getElementById("successMessage").innerHTML =
"✅ Your report has been submitted successfully.";

form.reset();

});