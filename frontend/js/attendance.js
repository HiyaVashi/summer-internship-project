
const token =
localStorage.getItem("token");

if(!token){

    window.location.href =
    "loginForm.html";
}
else{

    document.getElementById("pageContent")
    .style.display = "block";
}

document.getElementById("closeBtn").addEventListener("click", function(){

    window.location.href =
    "index.html";

});

const role =localStorage.getItem("role");

if(role === "ADMIN"){

    document.getElementById(
        "aiReportSection"
    ).style.display = "block";

}
else{

    document.getElementById(
        "aiReportSection"
    ).style.display = "none";

}

if(role === "ADMIN"){

    document.getElementById("adminTaskSection")
    .style.display = "block";

    document.getElementById("employeeTaskSection")
    .style.display = "none";

    // Hide only unnecessary fields

    document.getElementById("manager")
    .parentElement.style.display = "none";

    document.getElementById("remarks")
    .parentElement.style.display = "none";

    fetch("http://localhost:8080/users/employees")

.then(response => response.json())

.then(data => {

    const taskDropdown =
    document.getElementById(
        "employeeDropdown"
    );

    const reportDropdown =
    document.getElementById(
        "reportEmployeeDropdown"
    );

    data.forEach(employee => {

        // Task Assignment Dropdown

        const taskOption =
        document.createElement("option");

        taskOption.value =
        employee.userId;

        taskOption.textContent =
        employee.full_name;

        taskDropdown.appendChild(taskOption);

        // AI Report Dropdown

        const reportOption =
        document.createElement("option");

        reportOption.value =
        employee.userId;

        reportOption.textContent =
        employee.full_name;

        reportDropdown.appendChild(reportOption);

    });

});
}

else if(role === "EMPLOYEE"){

    document
    .getElementById("adminTaskSection")
    .style.display = "none";

    document
    .getElementById("employeeTaskSection")
    .style.display = "block";
}

else{

    document
    .getElementById("adminTaskSection")
    .style.display = "none";

    document
    .getElementById("employeeTaskSection")
    .style.display = "none";
}

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

    if(role === "EMPLOYEE"){

    fetchTasks();

}

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

    if(role !== "ADMIN" && manager.length < 3){

        document.getElementById("managerError")
        .innerText =
        "Enter valid manager name";

        return;
    }

    if(role !== "ADMIN" && remarks !== "" && remarks.length < 3){

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
// ADMIN ASSIGN TASK

const assignTaskBtn =
document.getElementById("assignTaskBtn");

if(assignTaskBtn){

    assignTaskBtn.addEventListener(
        "click",
        function(){

            const employeeId =
            document.getElementById(
                "employeeDropdown"
            ).value;

            const title =
            document.getElementById(
                "taskTitle"
            ).value.trim();

            const description =
            document.getElementById(
                "taskDescription"
            ).value.trim();

            const deadline =
            document.getElementById(
                "taskDeadline"
            ).value;

            document
            .getElementById("taskSuccessMsg")
            .innerText = "";

            if(employeeId === ""){

                document
                .getElementById("taskSuccessMsg")
                .innerText =
                "Please select an employee";

                return;
            }

            if(title === ""){

                document
                .getElementById("taskSuccessMsg")
                .innerText =
                "Please enter task title";

                return;
            }

            if(description === ""){

                document
                .getElementById("taskSuccessMsg")
                .innerText =
                "Please enter task description";

                return;
            }

            if(deadline === ""){

                document
                .getElementById("taskSuccessMsg")
                .innerText =
                "Please select deadline";

                return;
            }

            fetch(
                "http://localhost:8080/tasks/assign",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                        title: title,

                        description:
                        description,

                        deadline:
                        deadline,

                        assignedTo: {

                            userId:
                            employeeId

                        }

                    })

                }
            )

            .then(response =>
                response.json()
            )

            .then(data => {

                document
                .getElementById("taskSuccessMsg")
                .innerText =
                "Task assigned successfully!";

            })

            .catch(error => {

                console.log(error);

                document
                .getElementById("taskSuccessMsg")
                .innerText =
                "Failed to assign task";

            });

        }
    );
}

function fetchTasks(){

    fetch(
        `http://localhost:8080/tasks/mytasks/${currentUserId}`
    )

    .then(response => response.json())

    .then(tasks => {

        const container =
        document.getElementById(
            "taskContainer"
        );

        container.innerHTML = "";

        tasks.forEach(task => {

            container.innerHTML += `

                <div class="task-card">

                    <h3>
                        ${task.title}
                    </h3>

                    <p>
                        ${task.description}
                    </p>

                    <p>
                        Deadline:
                        ${task.deadline}
                    </p>

                    <p>
                        Status:
                        ${task.status}
                    </p>

                    <label>
                        Hours Spent
                    </label>

                    <input
                        type="number"
                        id="hours-${task.taskId}"
                        min="0"
                        step="0.5"
                        value="${
                            task.hoursSpent
                            ? task.hoursSpent
                            : ''
                        }"
                    >

                    <br><br>

                    <label>
                        Completed
                    </label>

                    <input
                        type="checkbox"
                        id="completed-${task.taskId}"
                        ${
                            task.completed
                            ? "checked"
                            : ""
                        }
                    >

                    <br><br>

                    <button
                        type="button"
                        onclick="updateTask(${task.taskId})"
                    >

                        Update Task

                    </button>

                    <hr>

                </div>

            `;

        });

    })

    .catch(error => {

        console.log(error);

        document.getElementById(
            "taskContainer"
        ).innerHTML =

        `<p>
            Failed to load tasks
        </p>`;

    });

}

function updateTask(taskId){

    const hoursSpent =document.getElementById(`hours-${taskId}`).value;

    const completed =document.getElementById(`completed-${taskId}`).checked;

    fetch(
        "http://localhost:8080/tasks/update",
        {
            method:"PUT",

            headers:{
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

                taskId:taskId,

                hoursSpent:hoursSpent,

                status:completed? "COMPLETED": "IN_PROGRESS",

                completed:completed

            })

        }
    )

    .then(response =>
        response.json()
    )

    .then(data => {

        console.log(data);

        fetchTasks();

    })

    .catch(error => {

        console.log(error);

    });

}

const generateReportBtn =
document.getElementById("generateReportBtn");

if(generateReportBtn){

    generateReportBtn.addEventListener("click", function(){

        const employeeId =
        document.getElementById(
            "reportEmployeeDropdown"
        ).value;

        if(employeeId === ""){

            document.getElementById(
                "reportLoading"
            ).innerText =
            "Please select an employee.";

            return;

        }

        document.getElementById(
            "reportLoading"
        ).innerText =
        "Generating AI Report...";

        fetch(
            `http://localhost:8080/ai/report/${employeeId}`,
            {

                method:"POST"

            }

        )

        .then(response => response.text())

        .then(report => {

            document.getElementById(
                "reportLoading"
            ).innerText = "";

            document.getElementById(
                "reportContainer"
            ).innerText = report;

        })

        .catch(error => {

            console.log(error);

            document.getElementById(
                "reportLoading"
            ).innerText =
            "Failed to generate report.";

        });

    });

}

