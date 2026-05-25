package com.project.employee_management.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.employee_management.entity.Users;
public interface UserRepository extends JpaRepository<Users,Long>{
    Optional<Users> findByEmail(String email);
}