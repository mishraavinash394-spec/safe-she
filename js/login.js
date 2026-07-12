document.querySelector("button").addEventListener("click", function () {

    let email = document.querySelector('input[type="email"]').value.trim();
    let password = document.querySelector('input[type="password"]').value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("No account found. Please register first.");
        return;
    }

    if (email === user.email && password === user.password) {
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Email or Password!");
    }

});