package com.project.employee_management.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.employee_management.entity.Departments;
public interface DepartmentRepository extends JpaRepository<Departments, Long>{}
