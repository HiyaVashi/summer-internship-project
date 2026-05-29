package com.project.employee_management.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.employee_management.entity.Tasks;
public interface TaskRepository
extends JpaRepository<Tasks, Long> {
    List<Tasks>findByAssignedTo_UserId(Long userId);
}