const closeBtn = document.getElementById("closeBtn");

if(closeBtn){

    closeBtn.addEventListener("click", function(){

        window.location.href = "index.html";

    });

}
document.getElementById("registrationForm").addEventListener("submit", function(e){

    e.preventDefault();

    let valid = true;

    document.querySelectorAll(".error").forEach(el => {
        el.innerText = "";
    });

    document.getElementById("successMsg").innerText = "";

    const employeeId =
    document.getElementById("employeeId").value.trim();

    const name =
    document.getElementById("name").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const password =
document.getElementById("password").value.trim();

    const mobile =
    document.getElementById("mobile").value.trim();

    const gender =
    document.getElementById("gender").value;

    const dob =
    document.getElementById("dob").value;

    const department =
    document.getElementById("department").value;

    const designation =
    document.getElementById("designation").value.trim();

    const joiningDate =
    document.getElementById("joiningDate").value;

    const salary =
    document.getElementById("salary").value;

    const city =
    document.getElementById("city").value.trim();

    const state =
    document.getElementById("state").value.trim();

    const address =
    document.getElementById("address").value.trim();
    

    // Employee ID Validation

    if(employeeId === ""){

        document.getElementById("idError").innerText =
        "Employee ID required";

        valid = false;
    }

    // Name Validation

    if(!/^[A-Za-z ]+$/.test(name)){

        document.getElementById("nameError").innerText =
        "Only alphabets allowed";

        valid = false;
    }

    // Email Validation

    const emailPattern =
    /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(!email.match(emailPattern)){

        document.getElementById("emailError").innerText =
        "Invalid email";

        valid = false;
    }

    if(password.length < 8){

    document.getElementById("passwordError").innerText =
    "Password must be at least 8 characters";

    valid = false;
}

else if(!/[A-Z]/.test(password)){

    document.getElementById("passwordError").innerText =
    "Password must contain at least one uppercase letter";

    valid = false;
}

else if(!/[a-z]/.test(password)){

    document.getElementById("passwordError").innerText =
    "Password must contain at least one lowercase letter";

    valid = false;
}

else if(!/[0-9]/.test(password)){

    document.getElementById("passwordError").innerText =
    "Password must contain at least one number";

    valid = false;
}

else if(!/[!@#$%^&*(),.?\":{}|<>]/.test(password)){

    document.getElementById("passwordError").innerText =
    "Password must contain at least one special character";

    valid = false;
}

    // Mobile Validation

    if(!/^[0-9]{10}$/.test(mobile)){

        document.getElementById("mobileError").innerText =
        "Invalid mobile number";

        valid = false;
    }

    // Gender Validation

    if(gender === ""){

        document.getElementById("genderError").innerText =
        "Select gender";

        valid = false;
    }

    // DOB Validation

    if(dob === ""){

    document.getElementById("dobError").innerText =
    "Select DOB";

    valid = false;
}

else {

    let birthDate = new Date(dob);

    let today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    let monthDifference =
    today.getMonth() - birthDate.getMonth();


    if(
        monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ){
        age--;
    }

    if(age < 18){
        document.getElementById("dobError").innerText ="Employee must be at least 18 years old";
        valid = false;
    }

}

    if(department === ""){

        document.getElementById("departmentError").innerText =
        "Select department";

        valid = false;
    }

    if(designation.length < 2){

        document.getElementById("designationError").innerText =
        "Invalid designation";

        valid = false;
    }

    // Joining Date Validation

    if(joiningDate === ""){

        document.getElementById("joiningError").innerText =
        "Select joining date";

        valid = false;
    }

    // Salary Validation

    if(salary <= 0){

        document.getElementById("salaryError").innerText =
        "Invalid salary";

        valid = false;
    }

    // City Validation

    if(city === ""){

        document.getElementById("cityError").innerText =
        "Enter city";

        valid = false;
    }

    // State Validation

    if(state === ""){

        document.getElementById("stateError").innerText =
        "Enter state";

        valid = false;
    }

    // Address Validation

    if(address.length < 10){

        document.getElementById("addressError").innerText =
        "Address too short";

        valid = false;
    }


const formData = new FormData();

formData.append("full_name", name);
formData.append("gender", gender);

formData.append("email", email);

formData.append("password", password);
formData.append("mobile_number",  mobile);
formData.append("city",city);
formData.append("state", state);
formData.append("address", address);
formData.append("dob", dob);

formData.append("department.department_id",department);

formData.append("role", "EMPLOYEE");

formData.append("photo", document.getElementById("photo").files[0]);

    // Backend API Integration

    if(valid){

    fetch("http://localhost:8080/users/register", {

        method: "POST",

        body: formData

    })

    .then(response => {

        if(!response.ok){

            throw new Error("Registration Failed");

        }

        return response.json();

    })

    .then(data => {

        const msg = document.getElementById("successMsg");

        msg.style.color = "green";
        msg.innerText = "Employee Registered Successfully!";

        document.getElementById("registrationForm").reset();

    })

    .catch(error => {

        const msg = document.getElementById("successMsg");

        msg.style.color = "red";
        msg.innerText = "Registration Failed";

        console.error(error);

    });

}

    }

);