// ===============================
// User Authentication
// ===============================
if (sessionStorage.getItem("userLoggedIn") !== "true") {
    window.location.href = "login.html";
}


// ===============================
// Show Success Toast
// ===============================
function showSuccessToast(message) {

    // Remove existing toast if already present
    const existingToast = document.getElementById("successToast");

    if (existingToast) {
        existingToast.remove();
    }


    // Create Toast
    const toast = document.createElement("div");

    toast.id = "successToast";

    toast.innerHTML = `
        <div class="toast-icon">✓</div>

        <div class="toast-message">
            ${message}
        </div>
    `;


    // ===============================
    // Toast Style
    // ===============================
    toast.style.position = "fixed";
    toast.style.top = "30px";
    toast.style.right = "30px";

    toast.style.display = "flex";
    toast.style.alignItems = "center";

    toast.style.gap = "12px";

    toast.style.padding = "14px 22px";

    toast.style.background = "#ffffff";

    toast.style.color = "#222";

    toast.style.borderRadius = "12px";

    toast.style.boxShadow =
        "0 8px 25px rgba(0,0,0,0.25)";

    toast.style.fontSize = "16px";

    toast.style.fontWeight = "600";

    toast.style.zIndex = "99999";

    toast.style.minWidth = "250px";

    toast.style.borderLeft =
        "5px solid #22c55e";

    toast.style.animation =
        "slideInToast 0.35s ease";


    // ===============================
    // Green Tick Style
    // ===============================
    const icon = toast.querySelector(".toast-icon");

    icon.style.width = "28px";
    icon.style.height = "28px";

    icon.style.borderRadius = "50%";

    icon.style.background = "#22c55e";

    icon.style.color = "#ffffff";

    icon.style.display = "flex";

    icon.style.alignItems = "center";

    icon.style.justifyContent = "center";

    icon.style.fontSize = "18px";

    icon.style.fontWeight = "bold";


    // ===============================
    // Add Toast To Page
    // ===============================
    document.body.appendChild(toast);


    // ===============================
    // Auto Remove Toast
    // ===============================
    setTimeout(() => {

        toast.style.animation =
            "slideOutToast 0.35s ease";

        setTimeout(() => {

            if (toast) {
                toast.remove();
            }

        }, 350);

    }, 2500);
}


// ===============================
// Toast Animation
// ===============================
if (!document.getElementById("toastAnimationStyle")) {

    const style = document.createElement("style");

    style.id = "toastAnimationStyle";

    style.innerHTML = `

        @keyframes slideInToast {

            from {
                opacity: 0;
                transform: translateX(100px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }

        }


        @keyframes slideOutToast {

            from {
                opacity: 1;
                transform: translateX(0);
            }

            to {
                opacity: 0;
                transform: translateX(100px);
            }

        }

    `;

    document.head.appendChild(style);
}


// ===============================
// Load Foods
// ===============================
function loadFoods() {

    fetch("/foods")

        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to fetch foods");
            }

            return response.json();
        })

        .then(data => {

            const container =
                document.getElementById("foodContainer");


            if (!container) {

                console.error(
                    "foodContainer not found"
                );

                return;
            }


            container.innerHTML = "";


            // ===============================
            // Search Text
            // ===============================
            const searchInput =
                document.getElementById("searchFood");


            const searchText = searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


            // ===============================
            // Filter Foods
            // ===============================
            const filteredFoods =
                data.filter(food => {

                    return (

                        (food.foodName || "")
                            .toLowerCase()
                            .includes(searchText)

                        ||

                        (food.hotelName || "")
                            .toLowerCase()
                            .includes(searchText)

                        ||

                        (food.city || "")
                            .toLowerCase()
                            .includes(searchText)

                        ||

                        (food.category || "")
                            .toLowerCase()
                            .includes(searchText)

                    );

                });


            // ===============================
            // No Food Found
            // ===============================
            if (filteredFoods.length === 0) {

                container.innerHTML = `
                    <h2
                        style="
                            text-align:center;
                            color:#ff5722;
                        "
                    >
                        ❌ No Food Found
                    </h2>
                `;

                return;
            }


            // ===============================
            // Display Foods
            // ===============================
            filteredFoods.forEach(food => {

                const image =

                    food.imageUrl &&
                    food.imageUrl.trim() !== ""

                    ?

                    `<img
                        src="${food.imageUrl}"
                        alt="${food.foodName}"
                    >`

                    :

                    "";


                container.innerHTML += `

                    <div class="food-card">

                        ${image}


                        <h2>
                            ${food.foodName}
                        </h2>


                        <p>
                            <b>🏨 Hotel:</b>
                            ${food.hotelName}
                        </p>


                        <p>
                            <b>📍 City:</b>
                            ${food.city}
                        </p>


                        <p>
                            <b>🍴 Category:</b>
                            ${food.category}
                        </p>


                        <p>
                            <b>🥣 Quantity:</b>
                            ${food.quantity}
                        </p>


                        <h3>
                            ₹${food.price}
                        </h3>


                        <button
                            onclick="addToCart(${food.id})"
                        >
                            ➕ Add
                        </button>

                    </div>

                `;

            });

        })

        .catch(error => {

            console.error(
                "Food Loading Error:",
                error
            );

            alert("❌ Unable to Load Foods");

        });

}


// ===============================
// Add To Cart
// ===============================
function addToCart(foodId) {

    const userId =
        sessionStorage.getItem("userId");


    if (!userId) {

        alert("❌ Please login again.");

        window.location.href =
            "login.html";

        return;
    }


    fetch("/cart", {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json"

        },

        body: JSON.stringify({

            userId: userId,

            foodId: foodId

        })

    })

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to Add Food"
                );

            }

            return response.json();

        })

        .then(() => {

            // =================================
            // NEW SUCCESS TOAST
            // No alert
            // No Undo button
            // =================================
            showSuccessToast(
                 "Added"
            );

        })

        .catch(error => {

            console.error(
                "Cart Error:",
                error
            );

            alert("❌ Failed to Add Food");

        });

}


// ===============================
// Logout
// ===============================
function logout() {

    if (
        confirm(
            "Are you sure you want to logout?"
        )
    ) {

        sessionStorage.removeItem(
            "userLoggedIn"
        );

        sessionStorage.removeItem(
            "userId"
        );

        sessionStorage.removeItem(
            "userName"
        );

        sessionStorage.removeItem(
            "userEmail"
        );


        window.location.href =
            "login.html";

    }

}


// ===============================
// Page Load
// ===============================
window.onload = function () {

    const userName =
        sessionStorage.getItem(
            "userName"
        );


    if (userName) {

        console.log(
            "Welcome " + userName
        );

    }


    // ===============================
    // Search Event
    // ===============================
    const searchFood =
        document.getElementById(
            "searchFood"
        );


    if (searchFood) {

        searchFood.addEventListener(
            "keyup",
            function () {

                loadFoods();

            }
        );

    }


    // ===============================
    // Load Foods
    // ===============================
    loadFoods();

};


// ===============================
// Auto Refresh
// ===============================
setInterval(
    loadFoods,
    30000
);