// Auto Get Location
if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position){

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        document.getElementById("locationInput").value =
        lat + ", " + lon;

    });

}

// Global Variables
let imageData = "";
let videoData = "";
let currentUser = null;

// ================= FIREBASE AUTH =================

firebase.auth().onAuthStateChanged(function(user){

    if(user){

        currentUser = user;

    }else{

        alert("Please login first.");

        window.location.href = "login.html";

    }

});


const form = document.getElementById("reportForm");
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");

const videoUpload = document.getElementById("videoUpload");
const videoPreview = document.getElementById("videoPreview");


// Image Upload
imageUpload.addEventListener("change", function(){

    const file = this.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(e){

            imageData = e.target.result;

            imagePreview.src = imageData;

            imagePreview.style.display = "block";

        }

        reader.readAsDataURL(file);

    }

});


// Video Upload
videoUpload.addEventListener("change", function(){

    const file = this.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(e){

            videoData = e.target.result;

            videoPreview.src = videoData;

            videoPreview.style.display = "block";

        }

        reader.readAsDataURL(file);

    }

});


// Submit Report
form.addEventListener("submit", function(e){

    e.preventDefault();

    let report = {

        uid: currentUser.uid,

        email: currentUser.email,

        name: document.getElementById("name").value,

        location: document.getElementById("locationInput").value,

        incident: document.getElementById("incident").value,

        description: document.getElementById("description").value,

        date: new Date().toLocaleString()

    };

    firebase.firestore()

    .collection("users")

    .doc(currentUser.uid)

    .collection("reports")

    .add(report)

    .then(function(){

        document.getElementById("successMessage").innerHTML = `
        ✅ Your report has been submitted successfully.
        <br><br>
        📅 ${new Date().toLocaleString()}
        `;

        let toast = document.getElementById("toast");

        toast.style.display = "block";

        setTimeout(function(){

            toast.style.display = "none";

        },3000);

        form.reset();

        imagePreview.style.display = "none";
        imagePreview.src = "";

        videoPreview.style.display = "none";
        videoPreview.src = "";

        imageData = "";
        videoData = "";

        alert("✅ Report Submitted Successfully");

    })

    .catch(function(error){

        alert(error.message);

    });

});

// Display Reports
function displayReports(){

    if(!currentUser){
        return;
    }

    let history = document.getElementById("reportHistory");

    let search = document.getElementById("searchBox").value.toLowerCase();

    history.innerHTML = "";

    firebase.firestore()

    .collection("users")

    .doc(currentUser.uid)

    .collection("reports")

    .get()

    .then(function(snapshot){

        snapshot.forEach(function(doc){

            let report = doc.data();

            let reportId = doc.id;

            if(

                report.name.toLowerCase().includes(search)

                ||

                report.incident.toLowerCase().includes(search)

            ){

                history.innerHTML += `

                <div class="report-card"
                style="
                background:#fff;
                padding:20px;
                margin:20px 0;
                border-radius:15px;
                box-shadow:0 5px 15px rgba(0,0,0,.2);
                ">

                <h3>${report.incident}</h3>

                <p><b>Name :</b> ${report.name}</p>

                <p><b>Location :</b> ${report.location}</p>

                <p><b>Description :</b> ${report.description}</p>

                <p><b>Date :</b> ${report.date}</p>

                <button
                onclick="deleteReport('${reportId}')"
                style="
                background:red;
                color:white;
                padding:10px 18px;
                border:none;
                border-radius:8px;
                cursor:pointer;
                ">
                🗑 Delete
                </button>

                </div>

                `;

            }

        });

    });

}

    

// Edit Report
function editReport(index){

    let reports =
    JSON.parse(localStorage.getItem("reports")) || [];

    let report = reports[index];

    document.getElementById("name").value = report.name;
    document.getElementById("locationInput").value = report.location;
    document.getElementById("incident").value = report.incident;
    document.getElementById("description").value = report.description;

    reports.splice(index,1);

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );

    displayReports();

}


// Delete Report
function deleteReport(reportId){

    let confirmDelete = confirm("Are you sure you want to delete this report?");

    if(!confirmDelete){
        return;
    }

    firebase.firestore()

    .collection("users")

    .doc(currentUser.uid)

    .collection("reports")

    .doc(reportId)

    .delete()

    .then(function(){

        alert("✅ Report Deleted Successfully");

        displayReports();

    })

    .catch(function(error){

        alert(error.message);

    });

}


// Clear All Reports
function clearReports(){

    if(confirm("Delete all reports?")){

        localStorage.removeItem("reports");

        displayReports();

        alert("✅ All Reports Deleted.");

    }

}


// First Load
displayReports();