package com.project.employee_management.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.employee_management.entity.Attendance;

public interface AttendanceRepository
extends JpaRepository<Attendance, Long>{

    List<Attendance> findByUser_UserId(Long userId);

}
