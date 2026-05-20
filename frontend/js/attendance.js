document.getElementById("attendanceForm").addEventListener("submit", function(e){

    e.preventDefault();

    let valid = true;

    // Clear Errors

    document.querySelectorAll(".error").forEach(el => {
      el.innerText = "";
    });

    document.getElementById("successMsg").innerText = "";

    // Values

    const attendanceDate =
    document.getElementById("attendanceDate").value;

    const status =
    document.getElementById("status").value;

    const shift =
    document.getElementById("shift").value;

    const checkIn =
    document.getElementById("checkIn").value;

    const checkOut =
    document.getElementById("checkOut").value;

    const workMode =
    document.getElementById("workMode").value;

    const location =
    document.getElementById("location").value.trim();

    const manager =
    document.getElementById("manager").value.trim();

    // Attendance Date

    if(attendanceDate === ""){

      document.getElementById("dateError").innerText =
      "Select attendance date";

      valid = false;
    }

    // Status

    if(status === ""){

      document.getElementById("statusError").innerText =
      "Select attendance status";

      valid = false;
    }

    // Shift

    if(shift === ""){

      document.getElementById("shiftError").innerText =
      "Select shift";

      valid = false;
    }

    // Check In

    if(checkIn === ""){

      document.getElementById("checkInError").innerText =
      "Enter check-in time";

      valid = false;
    }

    // Check Out

    if(checkOut === ""){

      document.getElementById("checkOutError").innerText =
      "Enter check-out time";

      valid = false;
    }

    // Time Validation

    if(checkIn !== "" && checkOut !== ""){

      if(checkOut <= checkIn){

        document.getElementById("checkOutError").innerText =
        "Check-out must be after check-in";

        valid = false;
      }

    }

    // Work Mode

    if(workMode === ""){

      document.getElementById("workModeError").innerText =
      "Select work mode";

      valid = false;
    }

    // Location

    if(location.length < 3){

      document.getElementById("locationError").innerText =
      "Enter valid location";

      valid = false;
    }

    // Manager

    if(manager.length < 3){

      document.getElementById("managerError").innerText =
      "Enter valid manager name";

      valid = false;
    }

    // Success

    if(valid){

      document.getElementById("successMsg").innerText =
      "Attendance Marked Successfully!";

      document.getElementById("attendanceForm").reset();

    }

});
