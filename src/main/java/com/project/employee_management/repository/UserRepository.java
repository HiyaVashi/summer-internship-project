package com.project.employee_management.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.employee_management.entity.Users;
public interface UserRepository extends JpaRepository<Users,Long>{
    Users findByEmail(String email);
}