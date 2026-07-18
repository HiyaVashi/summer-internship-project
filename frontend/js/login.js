
const token =
localStorage.getItem("token");

if(token){

    window.location.replace(
        "index.html"
    );

}
else{

    document.getElementById(
        "loginPage"
    ).style.display = "block";

}
// document.getElementById("closeBtn").addEventListener("click", function(){

//     window.location.href =
//     "index.html";

// });
const closeBtn = document.getElementById("closeBtn");

if (closeBtn) {

    closeBtn.addEventListener("click", function () {

        window.location.href = "index.html";

    });

}

document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let valid = true;

    // Clear previous errors

    document.getElementById("emailError").innerText = "";
    document.getElementById("passwordError").innerText = "";
    document.getElementById("successMsg").innerText = "";
    document.getElementById("loginError").innerText = "";

    // Email Validation

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(email === ""){

        document.getElementById("emailError").innerText =
        "Email is required";

        valid = false;
    }

    else if(!email.match(emailPattern)){

        document.getElementById("emailError").innerText =
        "Enter valid email address";

        valid = false;
    }

    // Password Validation

    if(password === ""){

        document.getElementById("passwordError").innerText =
        "Password is required";

        valid = false;
    }

    else if(password.length < 8){

        document.getElementById("passwordError").innerText =
        "Password must be at least 8 characters";

        valid = false;
    }


    // Login API Integration

if(valid){

    fetch("http://localhost:8080/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            email: email,
            password: password

        })

    })

    .then(response => {

    if(!response.ok){

        throw new Error(
            "Invalid email or password"
        );
    }

    return response.json();

})

.then(data => {

    console.log(data);

    localStorage.setItem("token", data.token);

    localStorage.setItem("role",data.role);
    window.location.href ="index.html";

    document.getElementById("successMsg").innerText ="Login Successful!";
    
})

    .catch(error => {

        console.log(error);

        document.getElementById("loginError").innerText ="Invalid credentials";

    });

}
});