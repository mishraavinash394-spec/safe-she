// Login Button

document.getElementById("loginBtn").addEventListener("click", function () {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        alert("No account found. Please register first.");
        return;

    }

    if (email === user.email && password === user.password) {

        alert("✅ Login Successful!");

        window.location.href = "dashboard.html";

    } else {

        alert("❌ Invalid Email or Password!");

    }

});


// Show / Hide Password

const togglePassword =
document.getElementById("togglePassword");

const passwordInput =
document.getElementById("password");

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.innerHTML = "🙈";

    } else {

        passwordInput.type = "password";
        togglePassword.innerHTML = "👁️";

    }

});