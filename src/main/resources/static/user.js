// ===============================
// User Authentication
// ===============================
if (sessionStorage.getItem("userLoggedIn") !== "true") {
    window.location.href = "login.html";
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

            const container = document.getElementById("foodContainer");

            if (!container) {
                console.error("foodContainer not found");
                return;
            }

            container.innerHTML = "";

            // ===============================
            // Search Text
            // ===============================
            const searchInput = document.getElementById("searchFood");

            const searchText = searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";


            // ===============================
            // Filter Foods
            // ===============================
            const filteredFoods = data.filter(food => {

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
                    <h2 style="text-align:center;color:#ff5722;">
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

                    ? `<img src="${food.imageUrl}" alt="${food.foodName}">`

                    : "";


                container.innerHTML += `

                    <div class="food-card">

                        ${image}

                        <h2>${food.foodName}</h2>

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

                        <h3>₹${food.price}</h3>

                        <button onclick="addToCart(${food.id})">
                            ➕ Add
                        </button>

                    </div>

                `;
            });

        })

        .catch(error => {

            console.error("Food Loading Error:", error);

            alert("❌ Unable to Load Foods");

        });
}


// ===============================
// Add To Cart
// ===============================
function addToCart(foodId) {

    const userId = sessionStorage.getItem("userId");

    if (!userId) {

        alert("❌ Please login again.");

        window.location.href = "login.html";

        return;
    }


    fetch("/cart", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            userId: userId,

            foodId: foodId

        })

    })

        .then(response => {

            if (!response.ok) {

                throw new Error("Unable to Add Food");

            }

            return response.json();

        })

        .then(() => {

            alert("✅ Food Added Successfully");

        })

        .catch(error => {

            console.error("Cart Error:", error);

            alert("❌ Failed to Add Food");

        });
}


// ===============================
// Logout
// ===============================
function logout() {

    if (confirm("Are you sure you want to logout?")) {

        sessionStorage.removeItem("userLoggedIn");

        sessionStorage.removeItem("userId");

        sessionStorage.removeItem("userName");

        sessionStorage.removeItem("userEmail");

        window.location.href = "login.html";

    }
}


// ===============================
// Page Load
// ===============================
window.onload = function () {

    const userName =
        sessionStorage.getItem("userName");


    if (userName) {

        console.log("Welcome " + userName);

    }


    // ===============================
    // Search Event
    // ===============================
    const searchFood =
        document.getElementById("searchFood");


    if (searchFood) {

        searchFood.addEventListener("keyup", function () {

            loadFoods();

        });

    }


    // ===============================
    // Load Foods
    // ===============================
    loadFoods();

};


// ===============================
// Auto Refresh
// ===============================
setInterval(loadFoods, 30000);