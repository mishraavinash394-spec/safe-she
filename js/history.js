// ===============================
// PDF Data Store
// ===============================

let pdfHistory = [];

// ===============================
// Firebase Auth Check
// ===============================

firebase.auth().onAuthStateChanged(function(user){

    if(user){

        loadHistory(user.uid);

    }else{

        window.location.href = "login.html";

    }

});

// ===============================
// Load SOS History
// ===============================

function loadHistory(uid){

    firebase.firestore()

    .collection("users")

    .doc(uid)

    .collection("sosHistory")

    .orderBy("createdAt","desc")

    .get()

    .then(function(snapshot){

        let historyDiv = document.getElementById("historyList");

        historyDiv.innerHTML = "";

        pdfHistory = [];

        if(snapshot.empty){

            historyDiv.innerHTML = "<h3>No SOS History Found</h3>";

            return;

        }

        snapshot.forEach(function(doc){

            let data = doc.data();

            let date = "Unknown Date";

            if(data.createdAt){

                date = data.createdAt.toDate().toLocaleString();

            }

            pdfHistory.push({

                status: data.status,

                date: date,

                location: data.location

            });

            historyDiv.innerHTML += `

            <div style="background:#fff;padding:15px;margin:15px;border-radius:10px;box-shadow:0 0 10px #ccc;">

                <h3>🚨 ${data.status}</h3>

                <p><b>Date :</b> ${date}</p>

                <p><b>Status :</b> ${data.status}</p>

                <p>

                    <a href="${data.location}" target="_blank">

                    📍 View Location

                    </a>

                </p>

            </div>

            `;

        });

    })

    .catch(function(error){

        console.log(error);

    });

}

// ===============================
// Download PDF
// ===============================

document.getElementById("downloadPDFBtn")

.addEventListener("click",function(){

    const { jsPDF } = window.jspdf;

    let pdf = new jsPDF();

    pdf.setFontSize(18);

    pdf.text("SafeShe SOS History Report",20,20);

    pdf.setFontSize(12);

    let y = 35;

    if(pdfHistory.length === 0){

        pdf.text("No SOS History Available",20,y);

    }

    else{

        pdfHistory.forEach(function(item,index){

            pdf.text((index+1)+". Status : "+item.status,20,y);

            y += 8;

            pdf.text("Date : "+item.date,20,y);

            y += 8;

            pdf.text("Location :",20,y);

            y += 8;

            pdf.text(item.location,20,y);

            y += 15;

            if(y > 270){

                pdf.addPage();

                y = 20;

            }

        });

    }

    pdf.save("SafeShe_SOS_History.pdf");

});