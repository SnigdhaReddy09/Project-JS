let login = document.getElementById('login');
let entity = document.getElementById("icon")
let guest = document.getElementById("guestbtn")

entity.onclick = function () {
    if (password.type === "password") {
        password.type = "text"
        entity.className = "fa-solid fa-eye"
    } else {
        password.type = "password"
        entity.className = "fa-solid fa-eye-slash"
    }
}

login.addEventListener("submit", (e) => {
    e.preventDefault();
    const error = document.getElementById('error');
    let email = document.getElementById("email").value.trim()
    let password = document.getElementById("password").value.trim()

    let users = JSON.parse(localStorage.getItem("users")) || []
    let user = users.find(x => x.email === email && x.password == password)

    if (user) {
        localStorage.setItem("isLoggedIn", JSON.stringify(user.name))
        alert("Welcome, You are logged in!")
        window.location.href = "../PROJECT/index.html"
    } else {
        error.textContent = "Invalid email or password"
    }
})

guest.addEventListener("click", () => {
    let guestUser = { name: "Guest User", email: "guest@example.com", password: "guest123" }
    localStorage.setItem("isLoggedIn", JSON.stringify(guestUser.name))
    alert("Welcome, Guest!")
    window.location.href = "../PROJECT/index.html"
})
