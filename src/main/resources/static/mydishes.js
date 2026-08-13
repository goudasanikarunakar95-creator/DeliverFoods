// ===============================
// User Authentication
// ===============================
if (sessionStorage.getItem("userLoggedIn") !== "true") {

    window.location.href = "login.html";

}


// ===============================
// Order Success Popup
// ===============================
function showOrderSuccessPopup() {

    // Remove existing popup if already present
    const existingPopup =
        document.getElementById("orderSuccessPopup");

    if (existingPopup) {
        existingPopup.remove();
    }


    // Get user name
    const userName =
        sessionStorage.getItem("userName") || "User";


    // Create popup
    const popup =
        document.createElement("div");

    popup.id = "orderSuccessPopup";


    popup.innerHTML = `

        <div class="order-success-overlay">

            <div class="order-success-box">

                <!-- Close Button -->
                <button
                    class="order-success-close"
                    onclick="closeOrderSuccessPopup()"
                    title="Close">

                    &times;

                </button>


                <!-- Success Icon -->
                <div class="order-success-icon">

                    ✓

                </div>


                <!-- Title -->
                <h2>

                    Order Placed Successfully!

                </h2>


                <!-- Message -->
                <div class="order-success-message">

                    <p>

                        Hi <strong>${userName}</strong>,

                    </p>


                    <p>

                        Your order has been placed successfully.

                    </p>


                    <p>

                        🚚 Your order will be delivered
                        within <strong>30 minutes</strong>.

                    </p>


                    <p>

                        Thank you for choosing us! ❤️

                    </p>

                </div>


                <!-- Center OK Button -->
                <div class="order-success-button-container">

                    <button
                        class="order-success-ok"
                        onclick="closeOrderSuccessPopup()">

                        OK

                    </button>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(popup);


    // Add popup CSS
    addOrderSuccessPopupStyles();

}


// ===============================
// Close Order Success Popup
// ===============================
function closeOrderSuccessPopup() {

    const popup =
        document.getElementById("orderSuccessPopup");


    if (popup) {

        popup.remove();

    }

}


// ===============================
// Order Success Popup CSS
// ===============================
function addOrderSuccessPopupStyles() {

    // Prevent adding CSS multiple times
    if (document.getElementById("orderSuccessPopupStyles")) {

        return;

    }


    const style =
        document.createElement("style");


    style.id =
        "orderSuccessPopupStyles";


    style.innerHTML = `

        /* ===============================
           Order Success Overlay
        =============================== */

        .order-success-overlay {

            position: fixed;

            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            background: rgba(0, 0, 0, 0.70);

            display: flex;

            justify-content: center;

            align-items: center;

            z-index: 99999;

            padding: 20px;

            box-sizing: border-box;

        }


        /* ===============================
           Success Box
        =============================== */

        .order-success-box {

            position: relative;

            width: 100%;

            max-width: 500px;

            background: #ffffff;

            border-radius: 18px;

            padding: 35px 35px 30px;

            box-sizing: border-box;

            text-align: left;

            box-shadow:
                0 20px 60px rgba(0, 0, 0, 0.40);

            animation:
                orderSuccessPopupAnimation
                0.25s ease;

        }


        /* ===============================
           Popup Animation
        =============================== */

        @keyframes orderSuccessPopupAnimation {

            from {

                opacity: 0;

                transform:
                    scale(0.90)
                    translateY(15px);

            }

            to {

                opacity: 1;

                transform:
                    scale(1)
                    translateY(0);

            }

        }


        /* ===============================
           Close Button
        =============================== */

        .order-success-close {

            position: absolute;

            top: 15px;

            right: 18px;

            width: 34px;

            height: 34px;

            border: none;

            background: transparent;

            color: #777;

            font-size: 30px;

            line-height: 30px;

            cursor: pointer;

            border-radius: 50%;

        }


        .order-success-close:hover {

            background: #f2f2f2;

            color: #222;

        }


        /* ===============================
           Success Icon
        =============================== */

        .order-success-icon {

            width: 65px;

            height: 65px;

            margin: 0 auto 18px;

            border-radius: 50%;

            background: #e8f8ee;

            color: #20a957;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 40px;

            font-weight: bold;

        }


        /* ===============================
           Title
        =============================== */

        .order-success-box h2 {

            margin: 0 35px 20px;

            text-align: center;

            color: #20a957;

            font-size: 24px;

            font-weight: 700;

        }


        /* ===============================
           Message
        =============================== */

        .order-success-message {

            border-top: 1px solid #e5e5e5;

            border-bottom: 1px solid #e5e5e5;

            padding: 18px 5px;

        }


        .order-success-message p {

            margin: 12px 0;

            color: #333;

            font-size: 16px;

            line-height: 1.6;

        }


        .order-success-message strong {

            color: #20a957;

        }


        /* ===============================
           Center OK Button
        =============================== */

        .order-success-button-container {

            display: flex;

            justify-content: center;

            align-items: center;

            margin-top: 22px;

        }


        .order-success-ok {

            min-width: 110px;

            padding: 11px 30px;

            border: none;

            border-radius: 8px;

            background: #20a957;

            color: white;

            font-size: 16px;

            font-weight: 600;

            cursor: pointer;

            transition: 0.2s ease;

        }


        .order-success-ok:hover {

            background: #168c45;

            transform: translateY(-1px);

        }


        /* ===============================
           Mobile
        =============================== */

        @media (max-width: 600px) {

            .order-success-box {

                max-width: 92%;

                padding: 28px 22px 25px;

            }


            .order-success-box h2 {

                font-size: 20px;

                margin-left: 20px;

                margin-right: 20px;

            }


            .order-success-message p {

                font-size: 14px;

            }

        }

    `;


    document.head.appendChild(style);

}


// ===============================
// Load My Dishes
// ===============================
function loadMyDishes() {

    const userId =
        sessionStorage.getItem("userId");


    console.log("User ID :", userId);


    if (!userId) {

        alert("❌ User session expired. Please login again.");

        window.location.href = "login.html";

        return;

    }


    fetch("/cart/" + userId)

        .then(response => {

            if (!response.ok) {

                throw new Error("Unable to load dishes");

            }

            return response.json();

        })

        .then(data => {

            console.log("Cart Data :", data);


            const container =
                document.getElementById("dishesContainer");


            container.innerHTML = "";


            // ===============================
            // Empty Cart
            // ===============================
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


            // ===============================
            // Display Dishes
            // ===============================
            data.forEach(item => {

                const total =
                    item.food.price * item.quantity;


                container.innerHTML += `

                    <div class="food-row">

                        <div class="food-left">

                            <i class="fa-solid fa-utensils"></i>

                            <div>

                                <div class="food-name">

                                    ${item.food.foodName}

                                </div>


                                <div class="food-price">

                                    ₹${item.food.price}
                                    × ${item.quantity}
                                    = ₹${total.toFixed(2)}

                                </div>

                            </div>

                        </div>


                        <div class="food-right">

                            <button
                                class="qty-btn"
                                onclick="decreaseQty(${item.id})">

                                -

                            </button>


                            <span class="qty-value">

                                ${item.quantity}

                            </span>


                            <button
                                class="qty-btn"
                                onclick="increaseQty(${item.id})">

                                +

                            </button>


                            <i
                                class="fa-solid fa-trash delete-icon"
                                onclick="removeDish(${item.id})"
                                title="Remove">

                            </i>

                        </div>

                    </div>

                `;

            });

        })

        .catch(error => {

            console.error("Load Dishes Error:", error);

            alert("❌ Unable to Load Dishes");

        });

}


// ===============================
// Increase Quantity
// ===============================
function increaseQty(id) {

    fetch("/cart/increase/" + id, {

        method: "PUT"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Increase Failed");

        }

        return response.json();

    })

    .then(data => {

        console.log("Quantity Increased:", data);

        loadMyDishes();

    })

    .catch(error => {

        console.error("Increase Error:", error);

        alert("❌ Unable to Increase Quantity");

    });

}


// ===============================
// Decrease Quantity
// ===============================
function decreaseQty(id) {

    fetch("/cart/decrease/" + id, {

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

        console.error("Decrease Error:", error);

        alert("❌ Unable to Decrease Quantity");

    });

}


// ===============================
// Remove Dish
// ===============================
function removeDish(id) {

    // No confirmation popup
    // Directly remove the dish

    fetch("/cart/" + id, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Delete Failed");

        }

        return response.text();

    })

    .then(() => {

        // Reload dishes after successful removal
        loadMyDishes();

    })

    .catch(error => {

        console.error("Delete Error:", error);

        alert("❌ Unable to Remove Dish");

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

    const userId =
        sessionStorage.getItem("userId");


    if (!userId) {

        alert("❌ User session expired.");

        return;

    }


    fetch("/cart/" + userId)

        .then(response => {

            if (!response.ok) {

                throw new Error("Unable to load bill");

            }

            return response.json();

        })

        .then(data => {

            const billItems =
                document.getElementById("billItems");


            billItems.innerHTML = "";


            let subtotal = 0;


            data.forEach(item => {

                const total =
                    item.food.price * item.quantity;


                subtotal += total;


                billItems.innerHTML += `

                    <div class="bill-row">

                        <span>

                            ${item.food.foodName}

                        </span>


                        <span>

                            ${item.quantity}

                        </span>


                        <span>

                            ₹${total.toFixed(2)}

                        </span>

                    </div>

                `;

            });


            const gst =
                subtotal * 0.05;


            const delivery =
                40;


            const grandTotal =
                subtotal + gst + delivery;


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

            console.error("Bill Error:", error);

            alert("❌ Unable to Load Bill");

        });

}


// ===============================
// Confirm Order
// ===============================
function confirmOrder() {

    const userId =
        sessionStorage.getItem("userId");


    if (!userId) {

        alert("❌ User session expired.");

        window.location.href = "login.html";

        return;

    }


    fetch("/orders/place/" + userId, {

        method: "POST"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Order Failed");

        }

        return response.text();

    })

    .then(message => {

        console.log("Order Response:", message);


        // =========================================
        // OLD ALERT REMOVED
        // CUSTOM SUCCESS POPUP ADDED
        // =========================================

        closeBill();

        loadMyDishes();

        showOrderSuccessPopup();

    })

    .catch(error => {

        console.error("Order Error:", error);

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
window.onload = function () {

    loadMyDishes();

};


// ===============================
// Close Popup Outside Click
// ===============================
window.onclick = function (event) {

    const modal =
        document.getElementById("billModal");


    if (event.target === modal) {

        closeBill();

    }

};