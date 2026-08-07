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

    fetch("http://localhost:8080/foods")
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to fetch foods");
            }
            return response.json();
        })
        .then(data => {

            const container = document.getElementById("foodContainer");
            container.innerHTML = "";

            // Search Text
            const searchText = document
                .getElementById("searchFood")
                .value
                .toLowerCase()
                .trim();

            // Filter Foods
            const filteredFoods = data.filter(food => {

                return (

                    food.foodName.toLowerCase().includes(searchText) ||

                    food.hotelName.toLowerCase().includes(searchText) ||

                    food.city.toLowerCase().includes(searchText) ||

                    food.category.toLowerCase().includes(searchText)

                );

            });

            if (filteredFoods.length === 0) {

                container.innerHTML = `
                    <h2 style="text-align:center;color:#ff5722;">
                        ❌ No Food Found
                    </h2>
                `;

                return;
            }

            filteredFoods.forEach(food => {

                const image = food.imageUrl && food.imageUrl.trim() !== ""
                    ? `<img src="${food.imageUrl}" alt="${food.foodName}">`
                    : "";

                container.innerHTML += `

                    <div class="food-card">

                        ${image}

                        <h2>${food.foodName}</h2>

                        <p><b>🏨 Hotel:</b> ${food.hotelName}</p>

                        <p><b>📍 City:</b> ${food.city}</p>

                        <p><b>🍴 Category:</b> ${food.category}</p>

                        <p><b>🥣 Quantity:</b> ${food.quantity}</p>

                        <h3>₹${food.price}</h3>

                        <button onclick="addToCart(${food.id})">
                            ➕ Add
                        </button>

                    </div>

                `;
            });

        })
        .catch(error => {
            console.error(error);
            alert("❌ Unable to Load Foods");
        });
}

// ===============================
// Add To Cart
// ===============================
function addToCart(foodId) {

    const userId = sessionStorage.getItem("userId");

    fetch("http://localhost:8080/cart", {

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

        console.error(error);

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

    const userName = sessionStorage.getItem("userName");

    if (userName) {
        console.log("Welcome " + userName);
    }

    // Search Event
    document.getElementById("searchFood").addEventListener("keyup", function () {
        loadFoods();
    });

    loadFoods();

};

// ===============================
// Auto Refresh
// ===============================
setInterval(loadFoods, 30000);