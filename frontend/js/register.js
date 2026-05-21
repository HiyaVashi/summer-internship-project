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

    // Backend API Integration

    if(valid){

        fetch("http://localhost:8080/users/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

    full_name: name,
    gender: gender,
    email: email,
    password: "hello123",
    role: "EMPLOYEE",
    mobile_number: mobile,
    city: city,
    state: state,
    address: address,
    dob: dob,

    department: {
    department_id: Number(department)
}

})
        })

        .then(response => response.json())

        .then(data => {

            console.log(data);

            document.getElementById("successMsg").innerText =
            "Employee Registered Successfully!";

            document.getElementById("registrationForm").reset();

        })

        .catch(error => {

            console.log(error);

            document.getElementById("successMsg").innerText =
            "Registration Failed";

        });

    }

});