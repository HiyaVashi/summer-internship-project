let currentUserId;

fetch("http://localhost:8080/users/me", {

    headers: {
        "Authorization":
        "Bearer " + localStorage.getItem("token")
    }

})
.then(response => response.json())

.then(data => {

    console.log(data);

    currentUserId = data.user_id;

    document.getElementById("employeeId").value =
    data.user_id;

    document.getElementById("employeeName").value =
    data.full_name;

    document.getElementById("department").value =
    data.department.name;

});

document.getElementById("leaveForm").addEventListener("submit", function(e){

    e.preventDefault();

    let valid = true;

    // Clear Errors

    document.querySelectorAll(".error").forEach(el => {
        el.innerText = "";
    });

    document.getElementById("successMsg").innerText = "";

    // Values

    const leaveType =
    document.getElementById("leaveType").value;

    const startDate =
    document.getElementById("startDate").value;

    const endDate =
    document.getElementById("endDate").value;

    const contact =
    document.getElementById("contact").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const manager =
    document.getElementById("manager").value.trim();

    const reason =
    document.getElementById("reason").value.trim();

    // Leave Type Validation

    if(leaveType === ""){

        document.getElementById("leaveTypeError").innerText =
        "Select leave type";

        valid = false;
    }

    // Start Date Validation

    if(startDate === ""){

        document.getElementById("startError").innerText =
        "Select start date";

        valid = false;
    }

    // End Date Validation

    if(endDate === ""){

        document.getElementById("endError").innerText =
        "Select end date";

        valid = false;
    }

    // Date Validation

    if(startDate !== "" && endDate !== ""){

        let start = new Date(startDate);
        let end = new Date(endDate);

        if(end < start){

            document.getElementById("endError").innerText =
            "End date must be after start date";

            valid = false;
        }

    }

    // Contact Validation

    if(!/^[0-9]{10}$/.test(contact)){

        document.getElementById("contactError").innerText =
        "Invalid mobile number";

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

    // Manager Validation

    if(manager.length < 3){

        document.getElementById("managerError").innerText =
        "Enter valid manager name";

        valid = false;
    }

    // Reason Validation

    if(reason.length < 10){

        document.getElementById("reasonError").innerText =
        "Reason too short";

        valid = false;
    }

    // Backend API Integration

    if(valid){

        fetch("http://localhost:8080/leave/apply", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",

                "Authorization":
                "Bearer " + localStorage.getItem("token")
            },

            body: JSON.stringify({

                leaveType: leaveType,
                startDate: startDate,
                endDate: endDate,
                reason: reason,
                status: "PENDING",
                user: {
                    user_id: currentUserId
                }

            })

        })

        .then(response => response.json())

        .then(data => {

            console.log(data);

            document.getElementById("successMsg").innerText =
            "Leave Request Submitted Successfully!";

            document.getElementById("leaveForm").reset();

        })

        .catch(error => {

            console.log(error);

            document.getElementById("successMsg").innerText =
            "Leave Request Failed";

        });

    }

});