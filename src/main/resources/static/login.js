// ===============================
// Snackbar Function
// ===============================

function showSnackbar(message, showUndo = false) {

    // Remove existing snackbar
    const oldSnackbar = document.getElementById("loginSnackbar");

    if (oldSnackbar) {
        oldSnackbar.remove();
    }

    // Create Snackbar
    const snackbar = document.createElement("div");

    snackbar.id = "loginSnackbar";

    snackbar.innerHTML = `
        <span>${message}</span>
        ${
            showUndo
                ? `<button id="undoLogin">UNDO</button>`
                : ""
        }
    `;

    // Snackbar Style
    snackbar.style.position = "fixed";
    snackbar.style.left = "50%";
    snackbar.style.bottom = "30px";
    snackbar.style.transform = "translateX(-50%)";
    snackbar.style.background = "#323232";
    snackbar.style.color = "#fff";
    snackbar.style.padding = "14px 20px";
    snackbar.style.borderRadius = "8px";
    snackbar.style.display = "flex";
    snackbar.style.alignItems = "center";
    snackbar.style.gap = "25px";
    snackbar.style.fontSize = "15px";
    snackbar.style.fontFamily = "Arial, sans-serif";
    snackbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
    snackbar.style.zIndex = "99999";
    snackbar.style.animation = "snackbarIn 0.3s ease";

    document.body.appendChild(snackbar);

    // ===============================
    // UNDO Button
    // ===============================

    if (showUndo) {

        const undoButton =
            document.getElementById("undoLogin");

        if (undoButton) {

            undoButton.style.background = "transparent";
            undoButton.style.border = "none";
            undoButton.style.color = "#ff9800";
            undoButton.style.fontWeight = "bold";
            undoButton.style.cursor = "pointer";
            undoButton.style.fontSize = "14px";

            undoButton.addEventListener("click", function () {

                sessionStorage.removeItem("userLoggedIn");
                sessionStorage.removeItem("userId");
                sessionStorage.removeItem("userName");
                sessionStorage.removeItem("userEmail");

                snackbar.remove();

                console.log("Login undone");

            });

        }

    }

    // ===============================
    // Auto Remove Snackbar
    // ===============================

    setTimeout(function () {

        if (snackbar) {
            snackbar.remove();
        }

    }, 3000);
}


// ===============================
// Snackbar Animation
// ===============================

const snackbarStyle = document.createElement("style");

snackbarStyle.innerHTML = `

@keyframes snackbarIn {

    from {
        opacity: 0;
        transform: translate(-50%, 30px);
    }

    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }

}

`;

document.head.appendChild(snackbarStyle);


// ===============================
// User Login
// ===============================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const loginData = {

            email:
                document
                    .getElementById("email")
                    .value
                    .trim(),

            password:
                document
                    .getElementById("password")
                    .value

        };


        // ===============================
        // Backend Login
        // ===============================

        fetch("/users/login", {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify(loginData)

        })

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Invalid Email or Password"
                );

            }

            return response.json();

        })

        .then(user => {

            // ===============================
            // Save User Details
            // ===============================

            sessionStorage.setItem(
                "userLoggedIn",
                "true"
            );

            sessionStorage.setItem(
                "userId",
                user.id
            );

            sessionStorage.setItem(
                "userName",
                user.name
            );

            sessionStorage.setItem(
                "userEmail",
                user.email
            );


            // ===============================
            // Snackbar
            // ===============================

            showSnackbar(
                "✅ Login successful",
                true
            );


            // ===============================
            // Redirect
            // ===============================

            setTimeout(function () {

                window.location.href =
                    "user.html";

            }, 1000);

        })

        .catch(error => {

            console.error(
                "Login Error:",
                error
            );

            alert(
                "❌ Invalid Email or Password"
            );

        });

    });

}


// ===============================
// Admin Login
// ===============================

const adminLoginForm =
    document.getElementById("adminLoginForm");

if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const username =
                document
                    .getElementById("adminUsername")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("adminPassword")
                    .value;


            // ===============================
            // Admin Credentials
            // ===============================

            if (
                username === "deliverfoods" &&
                password === "food@2026"
            ) {

                // ===============================
                // Save Admin Login
                // ===============================

                sessionStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );


                // ===============================
                // Snackbar
                // ===============================

                showSnackbar(
                    "✅ Admin Login successful",
                    true
                );


                // ===============================
                // Redirect
                // ===============================

                setTimeout(function () {

                    window.location.href =
                        "admin.html";

                }, 1000);


            } else {

                alert(
                    "❌ Invalid Admin Username or Password"
                );

            }

        }
    );

}


// ======================================
// Forgot Password - Popup
// ======================================

function openForgotPassword() {

    const popup =
        document.getElementById(
            "forgotPasswordPopup"
        );

    if (popup) {

        popup.style.display = "flex";

    }

}


// ======================================
// Close Forgot Password
// ======================================

function closeForgotPassword() {

    const popup =
        document.getElementById(
            "forgotPasswordPopup"
        );

    if (popup) {

        popup.style.display = "none";

    }

}


// ======================================
// Reset Password
// ======================================

const forgotPasswordForm =
    document.getElementById(
        "forgotPasswordForm"
    );

if (forgotPasswordForm) {

    forgotPasswordForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const email =
                document
                    .getElementById("forgotEmail")
                    .value
                    .trim();

            const newPassword =
                document
                    .getElementById("newPassword")
                    .value;

            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            // ===============================
            // Check Password Match
            // ===============================

            if (
                newPassword !==
                confirmPassword
            ) {

                alert(
                    "❌ Passwords do not match."
                );

                return;

            }


            // ===============================
            // Check Password Length
            // ===============================

            if (
                newPassword.length < 6
            ) {

                alert(
                    "❌ Password must contain at least 6 characters."
                );

                return;

            }


            // ===============================
            // Reset Password Data
            // ===============================

            const resetData = {

                email: email,

                password: newPassword

            };


            // ===============================
            // Backend - Reset Password
            // ===============================

            fetch(
                "/users/forgot-password",
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(resetData)

                }
            )

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        "Unable to reset password"
                    );

                }

                return response.text();

            })

            .then(message => {

                // ===============================
                // Success Snackbar
                // ===============================

                showSnackbar(
                    "✅ Password Reset Successfully"
                );


                // ===============================
                // Close Popup
                // ===============================

                closeForgotPassword();


                // ===============================
                // Clear Form
                // ===============================

                forgotPasswordForm.reset();

            })

            .catch(error => {

                console.error(
                    "Password Reset Error:",
                    error
                );

                alert(
                    "❌ Email not found or password reset failed."
                );

            });

        }
    );

}