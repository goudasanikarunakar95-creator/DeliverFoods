// ===============================
// User Login
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const loginData = {

            email: document.getElementById("email").value,
            password: document.getElementById("password").value

        };

        fetch("http://localhost:8080/users/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginData)

        })

        .then(response => {

            if (!response.ok) {
                throw new Error("Invalid Email or Password");
            }

            return response.json();

        })

        .then(user => {

            alert("✅ User Login Successful");

            // Save User Details
            sessionStorage.setItem("userLoggedIn", "true");
            sessionStorage.setItem("userId", user.id);
            sessionStorage.setItem("userName", user.name);
            sessionStorage.setItem("userEmail", user.email);

            window.location.href = "user.html";

        })

        .catch(error => {

            console.error(error);

            alert("❌ Invalid Email or Password");

        });

    });

}

// ===============================
// Admin Login
// ===============================

const adminLoginForm = document.getElementById("adminLoginForm");

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username = document.getElementById("adminUsername").value;
        const password = document.getElementById("adminPassword").value;

        if (username === "deliverfoods" && password === "food@2026") {

            alert("✅ Admin Login Successful");

            sessionStorage.setItem("adminLoggedIn", "true");

            window.location.href = "admin.html";

        } else {

            alert("❌ Invalid Admin Username or Password");

        }

    });

}
// ======================================
// Forgot Password - Popup
// ======================================

function openForgotPassword() {

    document.getElementById("forgotPasswordPopup").style.display = "flex";

}


function closeForgotPassword() {

    document.getElementById("forgotPasswordPopup").style.display = "none";

}


// ======================================
// Reset Password
// ======================================

const forgotPasswordForm =
    document.getElementById("forgotPasswordForm");


if (forgotPasswordForm) {

    forgotPasswordForm.addEventListener("submit", function (e) {

        e.preventDefault();


        const email =
            document.getElementById("forgotEmail").value.trim();

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Check passwords

        if (newPassword !== confirmPassword) {

            alert("❌ Passwords do not match.");

            return;

        }


        if (newPassword.length < 6) {

            alert("❌ Password must contain at least 6 characters.");

            return;

        }


        const resetData = {

            email: email,

            password: newPassword

        };


        // Backend endpoint
        fetch("http://localhost:8080/users/forgot-password", {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(resetData)

        })

        .then(response => {

            if (!response.ok) {

                throw new Error("Unable to reset password");

            }

            return response.text();

        })

        .then(message => {

            alert("✅ Password Reset Successfully");


            // Close popup

            closeForgotPassword();


            // Clear form

            forgotPasswordForm.reset();

        })

        .catch(error => {

            console.error(error);

            alert("❌ Email not found or password reset failed.");

        });

    });

}