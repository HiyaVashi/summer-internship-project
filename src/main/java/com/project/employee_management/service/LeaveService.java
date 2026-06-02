package com.project.employee_management.service;

import java.util.List;

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
    public List<LeaveRequests> getAllLeaves(){

    return leaveRequestRepository.findAll();
}

public LeaveRequests approveLeave(Long id){

    LeaveRequests leave = leaveRequestRepository.findById(id).orElseThrow();

    leave.setStatus("APPROVED");

    return leaveRequestRepository.save(leave);
}

public LeaveRequests rejectLeave(Long id){

    LeaveRequests leave = leaveRequestRepository.findById(id).orElseThrow();

    leave.setStatus("REJECTED");

    return leaveRequestRepository.save(leave);
}

public List<LeaveRequests> getMyLeaves(Long userId){

    return leaveRequestRepository.findByUser_UserId(userId);
}
public List<LeaveRequests> getPendingLeaves(){
return leaveRequestRepository.findByStatus("PENDING");
}
}