package com.project.employee_management.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.employee_management.entity.LeaveRequests;
public interface LeaveRequestRepository extends JpaRepository<LeaveRequests, Long>{}
