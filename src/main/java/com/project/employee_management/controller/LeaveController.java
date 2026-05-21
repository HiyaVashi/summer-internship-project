package com.project.employee_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.employee_management.entity.LeaveRequests;
import com.project.employee_management.service.LeaveService;

@RestController
@CrossOrigin(origins = "http://localhost:5500")
@RequestMapping("/leave")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    @PostMapping("/apply")
    public LeaveRequests applyLeave(
            @RequestBody LeaveRequests leaveRequest){

        return leaveService.applyLeave(leaveRequest);
    }
}