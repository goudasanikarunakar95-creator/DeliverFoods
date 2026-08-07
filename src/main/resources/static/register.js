// ==============================
// User Registration
// ==============================

document.getElementById("registerForm").addEventListener("submit", function(e){

    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
        alert("❌ Password and Confirm Password do not match");
        return;
    }

    const user = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        password: password,
        role: "USER"

    };

    fetch("http://localhost:8080/users/register",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(user)

    })
    .then(response=>{

        if(!response.ok){
            throw new Error("Registration Failed");
        }

        return response.json();

    })
    .then(data=>{

        alert("✅ Account Created Successfully");

        window.location.href="login.html";

    })
    .catch(error=>{

        console.error(error);
        alert("❌ Email Already Registered or Server Error");

    });

});