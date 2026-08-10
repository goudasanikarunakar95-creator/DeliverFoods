// ==============================
// User Registration
// ==============================

document.getElementById("registerForm").addEventListener("submit", function(e) {

    e.preventDefault();

    // ==============================
    // Get Passwords
    // ==============================

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // ==============================
    // Password Validation
    // ==============================

    if (password !== confirmPassword) {

        alert("❌ Password and Confirm Password do not match");

        return;
    }

    // ==============================
    // Create User Object
    // ==============================

    const user = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        password: password,
        role: "USER"

    };

    // ==============================
    // Register User
    // Backend Endpoint:
    // POST /users/register
    // ==============================

    fetch("/users/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

    })

    // ==============================
    // Handle Server Response
    // ==============================

    .then(async response => {

        const responseText = await response.text();

        console.log("HTTP Status:", response.status);
        console.log("Server Response:", responseText);

        // ==============================
        // Registration Failed
        // ==============================

        if (!response.ok) {

            throw new Error(
                responseText || `HTTP Error ${response.status}`
            );
        }

        // ==============================
        // Registration Successful
        // ==============================

        alert("✅ Account Created Successfully");

        // Redirect to Login
        window.location.href = "login.html";

    })

    // ==============================
    // Handle Errors
    // ==============================

    .catch(error => {

        console.error("❌ Registration Error:", error);

        alert(
            "❌ Registration Failed\n\n" +
            error.message
        );

    });

});