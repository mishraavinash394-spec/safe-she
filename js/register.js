// ==============================
// Register User
// ==============================

document.getElementById("registerBtn").addEventListener("click", function () {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (name === "" || email === "" || password === "" || confirmPassword === "") {

        alert("Please fill all fields.");
        return;

    }

    if (password !== confirmPassword) {

        alert("Passwords do not match.");
        return;

    }

    firebase.auth()

    .createUserWithEmailAndPassword(email, password)

    .then(function(userCredential){

        let user = userCredential.user;

        firebase.firestore()

        .collection("users")

        .doc(user.uid)

        .set({

            name: name,
            email: email,
            createdAt: new Date()

        })

        .then(function(){

            // Send Verification Email

            user.sendEmailVerification()

            .then(function(){

                alert(
`✅ Registration Successful!

A verification email has been sent.

Please verify your email before login.`
                );

                firebase.auth().signOut();

                window.location.href = "login.html";

            });

        });

    })

    .catch(function(error){

        alert(error.message);

    });

});


// ==============================
// Show / Hide Password
// ==============================

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.addEventListener("click", function(){

    if(password.type === "password"){

        password.type = "text";
        togglePassword.innerHTML = "🙈";

    }else{

        password.type = "password";
        togglePassword.innerHTML = "👁️";

    }

});


// ==============================
// Show / Hide Confirm Password
// ==============================

const toggleConfirmPassword =
document.getElementById("toggleConfirmPassword");

const confirmPassword =
document.getElementById("confirmPassword");

toggleConfirmPassword.addEventListener("click",function(){

    if(confirmPassword.type==="password"){

        confirmPassword.type="text";
        toggleConfirmPassword.innerHTML="🙈";

    }else{

        confirmPassword.type="password";
        toggleConfirmPassword.innerHTML="👁️";

    }

});


// ==============================
// Password Strength
// ==============================

const passwordInput =
document.getElementById("password");

const passwordStrength =
document.getElementById("passwordStrength");

passwordInput.addEventListener("input",function(){

    let value=passwordInput.value;

    if(value.length<6){

        passwordStrength.innerHTML="🔴 Weak Password";
        passwordStrength.style.color="red";

    }

    else if(value.length<10){

        passwordStrength.innerHTML="🟡 Medium Password";
        passwordStrength.style.color="orange";

    }

    else{

        passwordStrength.innerHTML="🟢 Strong Password";
        passwordStrength.style.color="green";

    }

});