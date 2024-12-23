let entity = document.getElementById("icon")

entity.onclick = function () {
    if (password.type === "password") {
        password.type = "text"
        entity.className = "fa-solid fa-eye"
    } else {
        password.type = "password"
        entity.className = "fa-solid fa-eye-slash"
    }
}

let signup = document.getElementById("signup");

signup.addEventListener("submit", (e) => {
    e.preventDefault()
    let name = document.getElementById("name").value.trim()
    let email = document.getElementById("email").value.trim()
    let password = document.getElementById("password").value.trim()
    let error = document.getElementById("error")
    let isValid = true;

    let nameRegex = /^[A-Za-z\s]{3,}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

    if (!nameRegex.test(name)) {
        error.textContent = "Name must be at least 3 characters long and contain only letters";
        isValid = false
    }

    if (!emailRegex.test(email)) {
        error.textContent = "Enter a valid email address.";
        isValid = false
    }

    if (!passwordRegex.test(password)) {
        error.textContent = "Password must be at least 8 characters long, include letters, numbers, and symbols(@$!%*?&).";
        isValid = false
    }

    if (isValid) {
        error.textContent = ""
        let userData = JSON.parse(localStorage.getItem("users")) || []
        userData.push({ name, email, password })

        localStorage.setItem("users", JSON.stringify(userData))
        error.textContent = ""
        alert("Sign Up done successfully")
        window.location.href = "../LOGIN/login.html"
    }
})
