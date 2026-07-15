package com.project.employee_management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.employee_management.entity.Attendance;
import com.project.employee_management.entity.Tasks;
import com.project.employee_management.entity.Users;
import com.project.employee_management.repository.AttendanceRepository;
import com.project.employee_management.repository.TaskRepository;
import com.project.employee_management.repository.UserRepository;

@Service
public class AIReportService {


@Autowired
private GroqService groqService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private TaskRepository taskRepository;

    public String generateReport(Long employeeId){

        Users employee =
                userRepository
                .findById(employeeId)
                .orElseThrow();

        List<Attendance> attendanceList =
                attendanceRepository
                .findByUser_UserId(employeeId);

        List<Tasks> taskList =
                taskRepository
                .findByAssignedTo_UserId(employeeId);

        StringBuilder report =
                new StringBuilder();

        report.append("EMPLOYEE REPORT\n\n");

        report.append("Name: ")
                .append(employee.getFull_name())
                .append("\n");

        report.append("Department: ");

if(employee.getDepartment() != null){

    report.append(
        employee.getDepartment().getName()
    );

}
else{

    report.append("Not Assigned");

}

report.append("\n\n");

        report.append("========== ATTENDANCE ==========\n\n");

        for(Attendance attendance : attendanceList){

            report.append("Date: ")
                    .append(attendance.getAttendanceDate())
                    .append("\n");

            report.append("Hours Worked: ")
                    .append(attendance.getTotalHours())
                    .append("\n");

            report.append(
    attendance.getRemarks() != null
        ? attendance.getRemarks()
        : "No Remarks"
);

        }

        report.append("\n========== TASKS ==========\n\n");

        for(Tasks task : taskList){

            report.append("Title: ")
                    .append(task.getTitle())
                    .append("\n");

            report.append("Description: ")
                    .append(task.getDescription())
                    .append("\n");

            report.append("Status: ")
                    .append(task.getStatus())
                    .append("\n");

           report.append(
    task.getHoursSpent() != null
        ? task.getHoursSpent()
        : "Not Updated"
);

            report.append("Deadline: ")
                    .append(task.getDeadline())
                    .append("\n\n");

        }

        try {

    return groqService.generateReport(
            report.toString()
    );

}

catch(Exception e){

    e.printStackTrace();

    return "Failed to generate AI report.";

}

    }

}