package com.project.employee_management.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.employee_management.entity.LeaveRequests;
public interface LeaveRequestRepository extends JpaRepository<LeaveRequests, Long>{
    List<LeaveRequests> findByUser_UserId(Long userId);
}
