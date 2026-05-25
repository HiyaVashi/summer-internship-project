package com.project.employee_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.employee_management.entity.Users;
import com.project.employee_management.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Users registerUser(Users user) {

        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );
        
        if(userRepository
        .findByEmail(user.getEmail())
        .isPresent()) {

    throw new RuntimeException(
            "Email already exists");
}

        return userRepository.save(user);
    }
}