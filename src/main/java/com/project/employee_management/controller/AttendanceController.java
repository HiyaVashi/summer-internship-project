package com.project.employee_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.employee_management.entity.Attendance;
import com.project.employee_management.service.AttendanceService;

@RestController
@CrossOrigin(origins = "http://localhost:5500")
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/mark")
    public Attendance markAttendance(
            @RequestBody Attendance attendance){

        return attendanceService.markAttendance(attendance);
    }
}