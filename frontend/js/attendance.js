let currentUserId;

let checkInTime = null;

let checkOutTime = null;

// FETCH LOGGED IN USER

fetch("http://localhost:8080/users/me", {

    headers: {
        "Authorization":
        "Bearer " + localStorage.getItem("token")
    }

})

.then(response => response.json())

.then(data => {

    console.log(data);

    currentUserId = data.userId;

    // AUTO FILL USER DETAILS

    document.getElementById("employeeId").value =
    data.userId;

    document.getElementById("employeeName").value =
    data.full_name;

    document.getElementById("department").value =
    data.department.name;

});

// CHECK IN BUTTON

document.getElementById("checkInBtn")
.addEventListener("click", function(){

    const now = new Date();

    checkInTime =
    now.toTimeString().slice(0,5);

    // CLEAR OLD SUCCESS MESSAGE

    document.getElementById("successMsg")
    .innerText = "";

    // DISPLAY CHECK IN

    document.getElementById("attendanceInfo")
    .innerHTML = `

        <p>
            Check In Time:
            ${checkInTime}
        </p>

    `;

});

// CHECK OUT BUTTON

document.getElementById("checkOutBtn")
.addEventListener("click", function(){

    // VALIDATE CHECK IN FIRST

    if(checkInTime === null){

        document.getElementById("successMsg")
        .innerText =
        "Please check in first";

        return;
    }

    // CLEAR OLD ERRORS

    document.getElementById("statusError")
    .innerText = "";

    document.getElementById("workModeError")
    .innerText = "";

    document.getElementById("managerError")
    .innerText = "";

    document.getElementById("remarksError")
    .innerText = "";

    // FORM VALUES

    const status =
    document.getElementById("status").value;

    const workMode =
    document.getElementById("workMode").value;

    const manager =
    document.getElementById("manager").value.trim();

    const remarks =
    document.getElementById("remarks").value.trim();

    // VALIDATIONS

    if(status === ""){

        document.getElementById("statusError")
        .innerText =
        "Select attendance status";

        return;
    }

    if(workMode === ""){

        document.getElementById("workModeError")
        .innerText =
        "Select work mode";

        return;
    }

    if(manager.length < 3){

        document.getElementById("managerError")
        .innerText =
        "Enter valid manager name";

        return;
    }

    if(remarks !== "" && remarks.length < 3){

        document.getElementById("remarksError")
        .innerText =
        "Remarks too short";

        return;
    }

    if(remarks.length > 200){

        document.getElementById("remarksError")
        .innerText =
        "Remarks cannot exceed 200 characters";

        return;
    }

    const remarksPattern =
    /^[a-zA-Z0-9\s.,!?()-]*$/;

    if(!remarksPattern.test(remarks)){

        document.getElementById("remarksError")
        .innerText =
        "Remarks should not contain unnecessary special characters";

        return;
    }

    // CHECK OUT TIME ONLY AFTER VALIDATION PASSES

    const now = new Date();

    checkOutTime =
    now.toTimeString().slice(0,5);

    // CALCULATE TOTAL HOURS

    let checkInDate =
    new Date(`1970-01-01T${checkInTime}:00`);

    let checkOutDate =
    new Date(`1970-01-01T${checkOutTime}:00`);

    let diffMs =
    checkOutDate - checkInDate;

    // DECIMAL VALUE FOR DATABASE

    let totalHoursDecimal =
    diffMs / (1000 * 60 * 60);

    totalHoursDecimal =
    totalHoursDecimal.toFixed(2);

    // DISPLAY VALUE FOR UI

    let totalMinutes =
    Math.floor(diffMs / (1000 * 60));

    let hours =
    Math.floor(totalMinutes / 60);

    let minutes =
    totalMinutes % 60;

    let totalHoursDisplay =
    `${hours} hrs ${minutes} mins`;

    // DISPLAY ATTENDANCE INFO

    document.getElementById("attendanceInfo")
    .innerHTML = `

        <p>
            Check In Time:
            ${checkInTime}
        </p>

        <p>
            Check Out Time:
            ${checkOutTime}
        </p>

        <p>
            Total Hours Worked:
            ${totalHoursDisplay}
        </p>

    `;

    // TODAY'S DATE

    const today =
    new Date().toISOString().split("T")[0];

    // BACKEND API CALL

    fetch("http://localhost:8080/attendance/mark", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",

            "Authorization":
            "Bearer " + localStorage.getItem("token")
        },

        body: JSON.stringify({

            attendanceDate: today,

            checkInTime: checkInTime,

            checkOutTime: checkOutTime,

            totalHours: totalHoursDecimal,

            remarks: remarks,

            status: status,

            user: {
                userId: currentUserId
            }

        })

    })

    .then(response => response.json())

    .then(data => {

        console.log(data);

        document.getElementById("successMsg")
        .innerText =
        "Attendance Marked Successfully!";

    })

    .catch(error => {

        console.log(error);

        document.getElementById("successMsg")
        .innerText =
        "Attendance Mark Failed";

    });

});