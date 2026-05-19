package com.project.employee_management.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.employee_management.entity.Attendance;
public interface AttendanceRepository extends JpaRepository<Attendance, Long>{}
