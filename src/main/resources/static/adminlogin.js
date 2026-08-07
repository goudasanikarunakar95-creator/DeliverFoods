// ===============================
// Admin Login
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Admin Credentials
        if (username === "deliverfoods" && password === "food@2026") {

            sessionStorage.setItem("adminLoggedIn", "true");

            alert("✅ Admin Login Successful");

            window.location.href = "admin.html";

        } else {

            alert("❌ Invalid Username or Password");

            document.getElementById("password").value = "";
            document.getElementById("password").focus();

        }

    });

});