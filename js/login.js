// ================= LOGIN =================

document.getElementById("loginBtn").addEventListener("click", function () {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {

        alert("Please fill all fields.");
        return;

    }

    firebase.auth()

    .signInWithEmailAndPassword(email, password)

    .then(function(userCredential){

        alert("✅ Login Successful!");

        window.location.href = "dashboard.html";

    })

    .catch(function(error){

        alert(error.message);

    });

});


// ================= SHOW / HIDE PASSWORD =================

const togglePassword =
document.getElementById("togglePassword");

const passwordInput =
document.getElementById("password");

togglePassword.addEventListener("click", function(){

    if(passwordInput.type === "password"){

        passwordInput.type = "text";
        togglePassword.innerHTML = "🙈";

    }else{

        passwordInput.type = "password";
        togglePassword.innerHTML = "👁️";

    }

});


// ================= FORGOT PASSWORD =================

document.getElementById("forgotPassword").addEventListener("click", function(){

    let email = prompt("Enter your registered Email:");

    if(email == ""){

        alert("Please enter your Email.");
        return;

    }

    firebase.auth()

    .sendPasswordResetEmail(email)

    .then(function(){

        alert("✅ Password Reset Email Sent Successfully.\n\nPlease check your Email Inbox.");

    })

    .catch(function(error){

        alert(error.message);

    });

});