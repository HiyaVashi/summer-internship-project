package com.project.employee_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.employee_management.entity.LeaveRequests;
import com.project.employee_management.repository.LeaveRequestRepository;

@Service
public class LeaveService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    public LeaveRequests applyLeave(LeaveRequests leaveRequest){

        return leaveRequestRepository.save(leaveRequest);
    }
}