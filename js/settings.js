firebase.auth().onAuthStateChanged(function(user){

if(!user){

window.location="login.html";

return;

}

db.collection("users")

.doc(user.uid)

.get()

.then(function(doc){

let data=doc.data();

document.getElementById("userName").innerHTML=data.name;

document.getElementById("userEmail").innerHTML="📧 "+data.email;

document.getElementById("userPhone").innerHTML="📱 "+data.phone;

if(data.profileImage){

document.getElementById("profileImage").src=data.profileImage;

}

});

});

// Edit

document.getElementById("editBtn").onclick=function(){

window.location="dashboard.html";

}

// Logout

document.getElementById("logoutBtn").onclick=function(){

firebase.auth().signOut()

.then(function(){

window.location="login.html";

});

}

// Dark Mode

document.getElementById("darkBtn").onclick=function(){

document.body.classList.toggle("dark-mode");

localStorage.setItem(

"dark",

document.body.classList.contains("dark-mode")

);

}

if(localStorage.getItem("dark")=="true"){

document.body.classList.add("dark-mode");

}