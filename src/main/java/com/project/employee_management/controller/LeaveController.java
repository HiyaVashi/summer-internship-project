package com.project.employee_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

   @GetMapping("/all")
public List<LeaveRequests> getAllLeaves(){

    return leaveService.getPendingLeaves();

}

@PutMapping("/approve/{id}")
public LeaveRequests approveLeave(@PathVariable Long id){

    return leaveService.approveLeave(id);
}

@PutMapping("/reject/{id}")
public LeaveRequests rejectLeave( @PathVariable Long id){ 
    return leaveService.rejectLeave(id);
}

@GetMapping("/my-leaves/{userId}")
public List<LeaveRequests> getMyLeaves(
        @PathVariable Long userId){

    return leaveService.getMyLeaves(userId);
}
}