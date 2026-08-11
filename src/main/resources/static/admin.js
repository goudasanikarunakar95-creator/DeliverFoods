// ===============================
// Check Admin Login
// ===============================
if (sessionStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}


// ======================================
// Add Food
// ======================================
document.getElementById("foodForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const food = {
        foodName: document.getElementById("foodName").value.trim(),
        hotelName: document.getElementById("hotelName").value.trim(),
        city: document.getElementById("city").value.trim(),
        category: document.getElementById("category").value.trim(),
        price: parseFloat(document.getElementById("price").value),
        quantity: document.getElementById("quantity").value.trim(),
        description: document.getElementById("description").value.trim(),
        imageUrl: ""
    };

    if (
        !food.foodName ||
        !food.hotelName ||
        !food.city ||
        !food.category ||
        !food.quantity ||
        !food.description ||
        isNaN(food.price)
    ) {
        alert("⚠ Please fill all fields.");
        return;
    }

    // ===============================
    // Production + Local API
    // ===============================
    fetch("/foods", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(food)

    })
    .then(response => {

        if (!response.ok) {
            throw new Error(
                "Failed to add food. Status: " + response.status
            );
        }

        return response.json();

    })
    .then(() => {

        alert("✅ Food Added Successfully");

        document.getElementById("foodForm").reset();

        loadFoods();

    })
    .catch(error => {

        console.error("Add Food Error:", error);

        alert("❌ Unable to add food.");

    });

});


// ======================================
// Load Foods
// ======================================
function loadFoods() {

    fetch("/foods")

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Unable to fetch foods. Status: " +
                    response.status
                );
            }

            return response.json();

        })

        .then(data => {

            console.log("Foods Loaded:", data);

            const body =
                document.getElementById("foodBody");

            body.innerHTML = "";

            if (!data || data.length === 0) {

                body.innerHTML = `
                    <tr>
                        <td colspan="8">
                            No Foods Available
                        </td>
                    </tr>
                `;

                return;
            }

            data.forEach(food => {

                body.innerHTML += `
                    <tr>

                        <td>
                            ${food.foodCode || ""}
                        </td>

                        <td>
                            ${food.foodName || ""}
                        </td>

                        <td>
                            ${food.hotelName || ""}
                        </td>

                        <td>
                            ${food.city || ""}
                        </td>

                        <td>
                            ${food.category || ""}
                        </td>

                        <td>
                            ₹${food.price || 0}
                        </td>

                        <td>
                            ${food.quantity || ""}
                        </td>

                        <td>

                            <button
                                class="deleteBtn"
                                onclick="deleteFood(${food.id})">

                                🗑 Delete

                            </button>

                        </td>

                    </tr>
                `;

            });

        })

        .catch(error => {

            console.error(
                "Load Foods Error:",
                error
            );

            alert("❌ Unable to load foods.");

        });
}


// ======================================
// Delete Food
// ======================================
function deleteFood(id) {

    const ok = confirm(
        "Are you sure you want to delete this food?"
    );

    if (!ok) {
        return;
    }

    // ===============================
    // Production + Local API
    // ===============================
    fetch(`/foods/${id}`, {

        method: "DELETE"

    })
    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Delete failed. Status: " +
                response.status
            );

        }

        return response.text();

    })
    .then(message => {

        alert(message);

        loadFoods();

    })
    .catch(error => {

        console.error(
            "Delete Food Error:",
            error
        );

        alert("❌ Unable to delete food.");

    });

}


// ======================================
// Logout
// ======================================
function logout() {

    const ok = confirm(
        "Do you want to logout?"
    );

    if (!ok) {
        return;
    }

    sessionStorage.removeItem(
        "adminLoggedIn"
    );

    alert(
        "👋 Logged out successfully."
    );

    window.location.href =
        "admin-login.html";
}


// ======================================
// Page Load
// ======================================
window.onload = function () {

    loadFoods();

};


// ======================================
// Open Orders Popup
// ======================================
function openOrdersPopup() {

    document.getElementById(
        "ordersPopup"
    ).style.display = "flex";


    fetch("/admin/orders")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to fetch orders. Status: " +
                    response.status
                );

            }

            return response.json();

        })

        .then(data => {

            console.log(
                "Orders Loaded:",
                data
            );

            const body =
                document.getElementById(
                    "ordersBody"
                );

            body.innerHTML = "";


            if (!data || data.length === 0) {

                body.innerHTML = `
                    <tr>
                        <td colspan="5">
                            No Orders Found
                        </td>
                    </tr>
                `;

                return;
            }


            data.forEach(order => {

                body.innerHTML += `
                    <tr>

                        <td>
                            ${
                                order.user &&
                                order.user.name
                                    ? order.user.name
                                    : ""
                            }
                        </td>

                        <td>
                            ${
                                order.food &&
                                order.food.foodName
                                    ? order.food.foodName
                                    : ""
                            }
                        </td>

                        <td>
                            ${
                                order.food &&
                                order.food.foodCode
                                    ? order.food.foodCode
                                    : ""
                            }
                        </td>

                        <td>
                            ${order.quantity || ""}
                        </td>

                        <td>
                            ${
                                order.orderDate
                                    ? order.orderDate
                                        .replace(
                                            "T",
                                            " "
                                        )
                                    : ""
                            }
                        </td>

                    </tr>
                `;

            });

        })

        .catch(error => {

            console.error(
                "Load Orders Error:",
                error
            );

            alert(
                "Unable to load orders."
            );

        });

}


// ======================================
// Close Orders Popup
// ======================================
function closeOrdersPopup() {

    document.getElementById(
        "ordersPopup"
    ).style.display = "none";

}


// ======================================
// Remove All Customer Orders
// ======================================
function removeAllOrders() {

    const ok = confirm(
        "⚠ Are you sure you want to remove all customer orders?"
    );

    if (!ok) {
        return;
    }


    fetch("/admin/orders", {

        method: "DELETE"

    })
    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to remove orders. Status: " +
                response.status
            );

        }

        return response.text();

    })
    .then(message => {

        alert(
            "✅ All customer orders removed successfully."
        );


        // Refresh orders table
        const body =
            document.getElementById(
                "ordersBody"
            );

        body.innerHTML = `
            <tr>
                <td colspan="5">
                    No Orders Found
                </td>
            </tr>
        `;

    })
    .catch(error => {

        console.error(
            "Remove Orders Error:",
            error
        );

        alert(
            "❌ Unable to remove orders."
        );

    });

}