// =====================================================
// DELIVER FOODS - LOGIN.JS
// =====================================================


// =====================================================
// SUCCESS SNACKBAR
// =====================================================

function showSuccessSnackbar(message) {

    // Remove old snackbar if already exists
    const oldSnackbar = document.getElementById("successSnackbar");

    if (oldSnackbar) {
        oldSnackbar.remove();
    }


    // Create snackbar
    const snackbar = document.createElement("div");

    snackbar.id = "successSnackbar";

    snackbar.innerHTML = `
        <div class="snackbar-check">&#10003;</div>
        <div class="snackbar-text">${message}</div>
    `;


    // Add snackbar to page
    document.body.appendChild(snackbar);


    // Show snackbar
    setTimeout(function () {

        snackbar.classList.add("show");

    }, 50);


    // Hide snackbar after 2.5 seconds
    setTimeout(function () {

        snackbar.classList.remove("show");

    }, 2500);


    // Remove snackbar completely
    setTimeout(function () {

        if (snackbar) {
            snackbar.remove();
        }

    }, 2900);
}


// =====================================================
// SNACKBAR CSS
// Automatically added from JavaScript
// =====================================================

(function addSnackbarStyles() {

    // Avoid adding CSS multiple times
    if (document.getElementById("snackbarStyles")) {
        return;
    }


    const style = document.createElement("style");

    style.id = "snackbarStyles";

    style.innerHTML = `

        /* ==========================================
           SUCCESS SNACKBAR
        ========================================== */

        #successSnackbar {

            position: fixed;

            left: 50%;

            bottom: 30px;

            transform:
                translateX(-50%)
                translateY(80px);

            min-width: 280px;

            padding: 14px 22px;

            background: #323232;

            color: #ffffff;

            border-radius: 8px;

            display: flex;

            align-items: center;

            justify-content: center;

            gap: 12px;

            font-family: Arial, sans-serif;

            font-size: 16px;

            font-weight: 500;

            box-shadow:
                0 5px 18px rgba(0, 0, 0, 0.30);

            opacity: 0;

            visibility: hidden;

            transition:
                opacity 0.3s ease,
                transform 0.3s ease,
                visibility 0.3s ease;

            z-index: 999999;

        }


        /* ==========================================
           SHOW SNACKBAR
        ========================================== */

        #successSnackbar.show {

            opacity: 1;

            visibility: visible;

            transform:
                translateX(-50%)
                translateY(0);

        }


        /* ==========================================
           GREEN CHECK MARK
        ========================================== */

        #successSnackbar .snackbar-check {

            width: 24px;

            height: 24px;

            min-width: 24px;

            background: #22c55e;

            color: #ffffff;

            border-radius: 50%;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 16px;

            font-weight: bold;

            line-height: 1;

        }


        /* ==========================================
           SNACKBAR TEXT
        ========================================== */

        #successSnackbar .snackbar-text {

            color: #ffffff;

            font-size: 16px;

            font-weight: 500;

            white-space: nowrap;

        }


        /* ==========================================
           MOBILE
        ========================================== */

        @media (max-width: 500px) {

            #successSnackbar {

                min-width: 230px;

                max-width: 85%;

                padding: 13px 18px;

                bottom: 20px;

            }

            #successSnackbar .snackbar-text {

                font-size: 14px;

            }

        }

    `;


    document.head.appendChild(style);

})();



// =====================================================
// USER LOGIN
// =====================================================

const loginForm = document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();


        // ==========================================
        // Get Login Details
        // ==========================================

        const emailElement =
            document.getElementById("email");

        const passwordElement =
            document.getElementById("password");


        const email =
            emailElement.value.trim();

        const password =
            passwordElement.value;


        // ==========================================
        // Basic Validation
        // ==========================================

        if (!email || !password) {

            alert("Please enter email and password.");

            return;

        }


        // ==========================================
        // Login Data
        // ==========================================

        const loginData = {

            email: email,

            password: password

        };


        // ==========================================
        // Disable Button
        // ==========================================

        const loginButton =
            loginForm.querySelector("button");

        if (loginButton) {

            loginButton.disabled = true;

        }


        // ==========================================
        // Backend Login
        // ==========================================

        fetch("/users/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(loginData)

        })

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Invalid Email or Password"
                );

            }

            return response.json();

        })


        // ==========================================
        // Login Success
        // ==========================================

        .then(user => {

            console.log(
                "User Login Successful:",
                user
            );


            // ======================================
            // Save User Details
            // ======================================

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


            // ======================================
            // Show Snackbar
            // ======================================

            showSuccessSnackbar(
                "Login successful"
            );


            // ======================================
            // Redirect after snackbar
            // ======================================

            setTimeout(function () {

                window.location.href = "user.html";

            }, 1800);

        })


        // ==========================================
        // Login Error
        // ==========================================

        .catch(error => {

            console.error(
                "Login Error:",
                error
            );


            alert(
                "❌ Invalid Email or Password"
            );


            // Enable button again
            if (loginButton) {

                loginButton.disabled = false;

            }

        });

    });

}



// =====================================================
// ADMIN LOGIN
// =====================================================

const adminLoginForm =
    document.getElementById("adminLoginForm");


if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            // ======================================
            // Get Admin Credentials
            // ======================================

            const usernameElement =
                document.getElementById(
                    "adminUsername"
                );

            const passwordElement =
                document.getElementById(
                    "adminPassword"
                );


            const username =
                usernameElement.value.trim();

            const password =
                passwordElement.value;


            // ======================================
            // Admin Login
            // ======================================

            if (
                username === "deliverfoods" &&
                password === "food@2026"
            ) {


                // ==================================
                // Save Admin Login
                // ==================================

                sessionStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );


                // ==================================
                // Show Snackbar
                // ==================================

                showSuccessSnackbar(
                    "Admin Login successful"
                );


                // ==================================
                // Redirect
                // ==================================

                setTimeout(function () {

                    window.location.href =
                        "admin.html";

                }, 1800);


            } else {


                // ==================================
                // Invalid Admin Login
                // ==================================

                alert(
                    "❌ Invalid Admin Username or Password"
                );

            }

        }
    );

}



// =====================================================
// FORGOT PASSWORD - OPEN POPUP
// =====================================================

function openForgotPassword() {

    const popup =
        document.getElementById(
            "forgotPasswordPopup"
        );


    if (popup) {

        popup.style.display = "flex";

    }

}



// =====================================================
// FORGOT PASSWORD - CLOSE POPUP
// =====================================================

function closeForgotPassword() {

    const popup =
        document.getElementById(
            "forgotPasswordPopup"
        );


    if (popup) {

        popup.style.display = "none";

    }

}



// =====================================================
// FORGOT PASSWORD FORM
// =====================================================

const forgotPasswordForm =
    document.getElementById(
        "forgotPasswordForm"
    );


if (forgotPasswordForm) {

    forgotPasswordForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            // ======================================
            // Get Values
            // ======================================

            const emailElement =
                document.getElementById(
                    "forgotEmail"
                );

            const newPasswordElement =
                document.getElementById(
                    "newPassword"
                );

            const confirmPasswordElement =
                document.getElementById(
                    "confirmPassword"
                );


            const email =
                emailElement.value.trim();

            const newPassword =
                newPasswordElement.value;

            const confirmPassword =
                confirmPasswordElement.value;


            // ======================================
            // Email Validation
            // ======================================

            if (!email) {

                alert(
                    "❌ Please enter your email."
                );

                return;

            }


            // ======================================
            // Password Match
            // ======================================

            if (
                newPassword !==
                confirmPassword
            ) {

                alert(
                    "❌ Passwords do not match."
                );

                return;

            }


            // ======================================
            // Password Length
            // ======================================

            if (newPassword.length < 6) {

                alert(
                    "❌ Password must contain at least 6 characters."
                );

                return;

            }


            // ======================================
            // Reset Password Data
            // ======================================

            const resetData = {

                email: email,

                password: newPassword

            };


            // ======================================
            // Backend Reset Password
            // ======================================

            fetch(
                "/users/forgot-password",
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            resetData
                        )

                }
            )


            // ======================================
            // Check Response
            // ======================================

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        "Unable to reset password"
                    );

                }

                return response.text();

            })


            // ======================================
            // Reset Success
            // ======================================

            .then(message => {

                console.log(
                    "Password Reset:",
                    message
                );


                // Show Snackbar
                showSuccessSnackbar(
                    "Password reset successful"
                );


                // Close popup
                closeForgotPassword();


                // Clear form
                forgotPasswordForm.reset();

            })


            // ======================================
            // Reset Error
            // ======================================

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



// =====================================================
// OPTIONAL: CLOSE FORGOT PASSWORD POPUP
// WHEN CLICKING OUTSIDE
// =====================================================

window.addEventListener(
    "click",
    function (event) {

        const popup =
            document.getElementById(
                "forgotPasswordPopup"
            );


        if (
            popup &&
            event.target === popup
        ) {

            closeForgotPassword();

        }

    }
);