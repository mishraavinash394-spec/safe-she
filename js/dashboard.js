// ===============================
// SafeShe Dashboard
// Part 1/4
// ===============================

// ---------- Firebase Auth ----------

firebase.auth().onAuthStateChanged(function(user){

    if(user){

        loadUser(user.uid);

        loadDashboardStats(user.uid);

        loadRecentSOS(user.uid);

    }

    else{

        window.location.href="login.html";

    }

});

// ---------- Load User ----------

function loadUser(uid){

    firebase.firestore()

    .collection("users")

    .doc(uid)

    .get()

    .then(function(doc){

        if(doc.exists){

            let data=doc.data();

            // User Name

            document.getElementById("userName").innerHTML=data.name;
setTimeout(function(){

    alert(
`👋 Welcome ${doc.data().name}

Welcome to SafeShe!

Stay Safe • Stay Strong 💖`
    );

},800);
            // Profile Image

            if(data.profileImage){

                document.getElementById("profileImage").src=data.profileImage;

            }

        }

    });

}

// ---------- Logout ----------

document.getElementById("logoutBtn")

.addEventListener("click",function(){

    firebase.auth()

    .signOut()

    .then(function(){

        alert("Logged Out Successfully");

        window.location.href="login.html";

    });

});

// ---------- Dashboard Stats ----------

function loadDashboardStats(uid){

    // Contacts Count

    firebase.firestore()

    .collection("users")

    .doc(uid)

    .collection("contacts")

    .get()

    .then(function(snapshot){

        document.getElementById("totalContacts").innerHTML=snapshot.size;

    });

    // Reports Count

    firebase.firestore()

    .collection("users")

    .doc(uid)

    .collection("reports")

    .get()

    .then(function(snapshot){

        document.getElementById("totalReports").innerHTML=snapshot.size;

    });
// SOS Count

firebase.firestore()

.collection("users")

.doc(uid)

.collection("sosHistory")

.get()

.then(function(snapshot){

    document.getElementById("totalSOS").innerHTML = snapshot.size;

});
// Today's SOS

firebase.firestore()

.collection("users")

.doc(uid)

.collection("sosHistory")

.get()

.then(function(snapshot){

    let today = new Date();

    let count = 0;

    snapshot.forEach(function(doc){

        let data = doc.data();

        if(data.createdAt){

            let sosDate = data.createdAt.toDate();

            if(
                sosDate.getDate() === today.getDate() &&
                sosDate.getMonth() === today.getMonth() &&
                sosDate.getFullYear() === today.getFullYear()
            ){

                count++;

            }

        }

    });

    document.getElementById("todaySOS").innerHTML = count;

});
} // ===============================
// Part 2/4
// Recent SOS + Live Location
// ===============================

// ---------- Recent SOS ----------

function loadRecentSOS(uid){

    firebase.firestore()

    .collection("users")

    .doc(uid)

    .collection("sosHistory")

    .orderBy("createdAt","desc")

    .limit(5)

    .get()

    .then(function(snapshot){

        let html="";

        if(snapshot.empty){

            html="<p>No SOS History Found</p>";

        }

        snapshot.forEach(function(doc){

            let data=doc.data();

            let date="";

            if(data.createdAt){

                date=data.createdAt.toDate().toLocaleString();

            }

            html+=`

            <div class="sos-item">

            <h3>🚨 ${data.status}</h3>

            <p>${date}</p>

            <a href="${data.location}" target="_blank">

            📍 View Location

            </a>

            </div>

            `;

        });

        document.getElementById("recentSOS").innerHTML=html;

    })

    .catch(function(error){

        console.log(error);

    });

}

// ---------- Live Location ----------

document.getElementById("locationBtn")

.addEventListener("click",function(e){

    e.preventDefault();

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(function(position){

            let lat=position.coords.latitude;

            let lon=position.coords.longitude;

            window.open(

                "https://www.google.com/maps?q="+lat+","+lon,

                "_blank"

            );

        },

        function(){

            alert("Unable to get your location.");

        });

    }

    else{

        alert("Geolocation is not supported.");

    }

});

// ---------- Nearby Police ----------

document.getElementById("policeBtn")

.addEventListener("click",function(e){

    e.preventDefault();

    window.open(

    "https://www.google.com/maps/search/Police+Station+Near+Me",

    "_blank"

    );

});

// ---------- Nearby Hospital ----------

document.getElementById("hospitalBtn")

.addEventListener("click",function(e){

    e.preventDefault();

    window.open(

    "https://www.google.com/maps/search/Hospital+Near+Me",

    "_blank"

    );

});// ===============================
// Part 3/4
// Safety Tips + About + Settings + Dark Mode + Loader
// ===============================

// ---------- Safety Tips ----------

document.getElementById("tipsBtn")

.addEventListener("click",function(){

alert(

`🚨 Women Safety Tips

• Share your live location with trusted contacts.

• Avoid isolated places at night.

• Keep emergency contacts updated.

• Stay alert and trust your instincts.

• Use the SOS button in emergencies.`

);

});

// ---------- About ----------

document.getElementById("aboutBtn")

.addEventListener("click",function(){

alert(

`🛡 SafeShe

Version : 1.0

Developed By :

Avinash Mishra
&
Jyoti Kumari

Women Safety Web Application`

);

});




// ---------- Dark Mode ----------

document.getElementById("darkModeBtn")

.addEventListener("click",function(){

document.body.classList.toggle("dark-mode");

});

// ---------- Dashboard Animation ----------

const cards=document.querySelectorAll(".dash-card");

cards.forEach((card,index)=>{

card.style.opacity="0";

setTimeout(function(){

card.style.opacity="1";

card.style.transition=".5s";

},index*150);

});

// ---------- Loader ----------

window.onload=function(){

setTimeout(function(){

document.getElementById("loader").style.display="none";

},1500);

};// ===============================
// Part 4/4
// Profile Upload + Firestore Save
// ===============================

const profileUpload = document.getElementById("profileUpload");
const profileImage = document.getElementById("profileImage");

// ---------- Profile Upload ----------

profileUpload.addEventListener("change", function(){

    let file = this.files[0];

    if(!file){

        return;

    }

    let reader = new FileReader();

    reader.onload = function(e){

        profileImage.src = e.target.result;

        firebase.auth().onAuthStateChanged(function(user){

            if(user){

                firebase.firestore()

                .collection("users")

                .doc(user.uid)

                .update({

                    profileImage:e.target.result

                })

                .then(function(){

                    console.log("✅ Profile Image Saved");

                })

                .catch(function(error){

                    console.log(error);

                });

            }

        });

    };

    reader.readAsDataURL(file);

});
// ===============================
// EDIT PROFILE
// ===============================

const editProfileBtn = document.getElementById("editProfileBtn");
const editProfileModal = document.getElementById("editProfileModal");
const saveProfileBtn = document.getElementById("saveProfileBtn");
const closeProfileBtn = document.getElementById("closeProfileBtn");

editProfileBtn.addEventListener("click", function(){

    firebase.auth().onAuthStateChanged(function(user){

        if(user){

            firebase.firestore()

            .collection("users")

            .doc(user.uid)

            .get()

            .then(function(doc){

                if(doc.exists){

                    let data = doc.data();

                    document.getElementById("editName").value =
                    data.name || "";

                    document.getElementById("editPhone").value =
                    data.phone || "";

                    editProfileModal.style.display = "flex";

                }

            });

        }

    });

});

closeProfileBtn.addEventListener("click", function(){

    editProfileModal.style.display = "none";

});

saveProfileBtn.addEventListener("click", function(){

    let newName = document.getElementById("editName").value.trim();

    let newPhone = document.getElementById("editPhone").value.trim();

    firebase.auth().onAuthStateChanged(function(user){

        if(user){

            firebase.firestore()

            .collection("users")

            .doc(user.uid)

            .update({

                name: newName,

                phone: newPhone

            })

            .then(function(){

                document.getElementById("userName").innerHTML = newName;

                editProfileModal.style.display = "none";

                alert("✅ Profile Updated Successfully");

            })

            .catch(function(error){

                alert(error.message);

            });

        }

    });

});
// ===============================
// GREETING + DATE + TIME
// ===============================

function updateDateTime(){

const now = new Date();

const hour = now.getHours();

let greet = "";

if(hour < 12){

greet = "🌞 Good Morning";

}
else if(hour < 17){

greet = "☀️ Good Afternoon";

}
else{

greet = "🌙 Good Evening";

}

const greeting = document.getElementById("greeting");

const date = document.getElementById("currentDate");

const time = document.getElementById("currentTime");

if(greeting){

greeting.innerHTML = greet + ", " + document.getElementById("userName").innerHTML;

}

if(date){

date.innerHTML = "📅 " + now.toDateString();

}

if(time){

time.innerHTML = "🕒 " + now.toLocaleTimeString();

}

}

setInterval(updateDateTime,1000);

updateDateTime();
// ===============================
// SAFETY SCORE
// ===============================

function updateSafetyScore(){

let score = 90;

const contacts =
parseInt(document.getElementById("totalContacts").innerHTML)||0;

const reports =
parseInt(document.getElementById("totalReports").innerHTML)||0;

const sos =
parseInt(document.getElementById("totalSOS").innerHTML)||0;

score += contacts*2;

score += reports;

score -= sos*3;

if(score>100){

score=100;

}

if(score<20){

score=20;

}

const bar=document.getElementById("progressBar");

const status=document.getElementById("safeStatus");

bar.style.width=score+"%";

bar.innerHTML=score+"%";

if(score>=80){

bar.style.background="linear-gradient(90deg,#00c853,#4caf50)";

status.innerHTML="Status : ✅ SAFE";

}

else if(score>=50){

bar.style.background="orange";

status.innerHTML="Status : ⚠ MEDIUM";

}

else{

bar.style.background="red";

status.innerHTML="Status : 🚨 DANGER";

}

}

setTimeout(updateSafetyScore,2000);