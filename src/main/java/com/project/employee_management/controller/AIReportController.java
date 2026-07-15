package com.project.employee_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.employee_management.service.AIReportService;

@RestController
@CrossOrigin(origins = "http://localhost:5500")
@RequestMapping("/ai")
public class AIReportController {

    @Autowired
    private AIReportService aiReportService;

    @PostMapping("/report/{employeeId}")

    public String generateReport(

            @PathVariable Long employeeId){

        return aiReportService.generateReport(
                employeeId
        );

    }

}