// ===============================
// User Authentication
// ===============================
if (sessionStorage.getItem("userLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// ===============================
// Load My Dishes
// ===============================
function loadMyDishes() {

    const userId = sessionStorage.getItem("userId");

    console.log("User ID :", userId);

    fetch("http://localhost:8080/cart/" + userId)
        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load dishes");
            }

            return response.json();

        })
        .then(data => {

            console.log("Cart Data :", data);

            const container = document.getElementById("dishesContainer");
            container.innerHTML = "";

            if (data.length === 0) {

                container.innerHTML = `
                    <div class="empty-cart">
                        <i class="fa-solid fa-bowl-food"></i>
                        <h2>No Dishes Added</h2>
                        <p>Your food list is empty.</p>
                        <button onclick="goBack()">
                            🍔 Order Now
                        </button>
                    </div>
                `;

                return;
            }

            data.forEach(item => {

                const total = item.food.price * item.quantity;

                container.innerHTML += `
                    <div class="food-row">

                        <div class="food-left">

                            <i class="fa-solid fa-utensils"></i>

                            <div>

                                <div class="food-name">
                                    ${item.food.foodName}
                                </div>

                                <div class="food-price">
                                    ₹${item.food.price} × ${item.quantity} = ₹${total.toFixed(2)}
                                </div>

                            </div>

                        </div>

                        <div class="food-right">

                            <button class="qty-btn"
                                    onclick="decreaseQty(${item.id})">-</button>

                            <span class="qty-value">
                                ${item.quantity}
                            </span>

                            <button class="qty-btn"
                                    onclick="increaseQty(${item.id})">+</button>

                            <i class="fa-solid fa-trash delete-icon"
                               onclick="removeDish(${item.id})"
                               title="Remove">
                            </i>

                        </div>

                    </div>
                `;

            });

        })
        .catch(error => {

            console.error(error);

            alert("Unable to Load Dishes");

        });

}
// ===============================
// Increase Quantity
// ===============================
function increaseQty(id) {

    fetch("http://localhost:8080/cart/increase/" + id, {

        method: "PUT"

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Increase Failed");
        }

        return response.json();

    })

    .then(data => {

        console.log("Quantity Increased", data);

        loadMyDishes();

    })

    .catch(error => {

        console.error(error);

        alert("Unable to Increase Quantity");

    });

}

// ===============================
// Decrease Quantity
// ===============================
function decreaseQty(id) {

    fetch("http://localhost:8080/cart/decrease/" + id, {

        method: "PUT"

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Decrease Failed");
        }

        return response.text();

    })

    .then(() => {

        loadMyDishes();

    })

    .catch(error => {

        console.error(error);

        alert("Unable to Decrease Quantity");

    });

}

// ===============================
// Remove Dish
// ===============================
function removeDish(id) {

    if (!confirm("Remove this dish?")) {
        return;
    }

    fetch("http://localhost:8080/cart/" + id, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Delete Failed");
        }

        return response.text();

    })

    .then(() => {

        loadMyDishes();

    })

    .catch(error => {

        console.error(error);

        alert("Unable to Remove Dish");

    });

}
// ===============================
// Place Order
// ===============================
function placeOrder() {

    loadBill();

    document.getElementById("billModal").style.display = "flex";

}

// ===============================
// Close Bill
// ===============================
function closeBill() {

    document.getElementById("billModal").style.display = "none";

}

// ===============================
// Load Bill
// ===============================
function loadBill() {

    const userId = sessionStorage.getItem("userId");

    fetch("http://localhost:8080/cart/" + userId)

    .then(response => response.json())

    .then(data => {

        const billItems = document.getElementById("billItems");

        billItems.innerHTML = "";

        let subtotal = 0;

        data.forEach(item => {

            const total = item.food.price * item.quantity;

            subtotal += total;

            billItems.innerHTML += `

                <div class="bill-row">

                    <span>${item.food.foodName}</span>

                    <span>${item.quantity}</span>

                    <span>₹${total.toFixed(2)}</span>

                </div>

            `;

        });

        const gst = subtotal * 0.05;

        const delivery = 40;

        const grandTotal = subtotal + gst + delivery;

        document.getElementById("subtotal").innerHTML =
            "₹" + subtotal.toFixed(2);

        document.getElementById("gst").innerHTML =
            "₹" + gst.toFixed(2);

        document.getElementById("delivery").innerHTML =
            "₹" + delivery.toFixed(2);

        document.getElementById("grandTotal").innerHTML =
            "₹" + grandTotal.toFixed(2);

    })

    .catch(error => {

        console.error(error);

        alert("Unable to Load Bill");

    });

}

// ===============================
// Confirm Order
// ===============================
// ===============================
// Confirm Order
// ===============================
function confirmOrder() {

    const userId = sessionStorage.getItem("userId");

    fetch("http://localhost:8080/orders/place/" + userId, {

        method: "POST"

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Order Failed");
        }

        return response.text();

    })

    .then(message => {

        alert("🎉 Order Placed Successfully!");

        closeBill();

        // Reload Cart
        loadMyDishes();

    })

    .catch(error => {

        console.error(error);

        alert("❌ Unable to Place Order");

    });

}

// ===============================
// Back
// ===============================
function goBack() {

    window.location.href = "user.html";

}

// ===============================
// Page Load
// ===============================

// ===============================
// Close Popup Outside Click
// ===============================
window.onclick = function(event){

    const modal = document.getElementById("billModal");

    if(event.target === modal){

        closeBill();

    }

};
function closeBill() {
    document.getElementById("billModal").style.display = "none";
}

function confirmOrder() {

    const userId = sessionStorage.getItem("userId");

    fetch("http://localhost:8080/orders/place/" + userId, {
        method: "POST"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Order Failed");
        }
        return res.text();
    })
    .then(msg => {

        alert("✅ Order Placed Successfully");

        document.getElementById("billModal").style.display = "none";

        loadMyDishes();

        window.location.href = "user.html";

    })
    .catch(err => {

        console.log(err);

        alert("❌ Unable to Place Order");

    });

}