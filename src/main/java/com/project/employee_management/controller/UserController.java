package com.project.employee_management.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.employee_management.entity.Users;
import com.project.employee_management.repository.UserRepository;
import com.project.employee_management.security.JwtUtil;
import com.project.employee_management.service.UserService;

import jakarta.validation.Valid;
@RestController
@CrossOrigin(origins = "http://localhost:5500")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Users registerUser(@Valid @RequestBody Users user) {
        
        return userService.registerUser(user);
    }

    @Autowired
private UserRepository userRepository;
@GetMapping("/me")
public Users getCurrentUser(
        @RequestHeader("Authorization")
        String authHeader){

    String token =
            authHeader.substring(7);

    System.out.println(token);

    String email =
            JwtUtil.extractUsername(token);

    System.out.println(email);

    return userRepository
            .findByEmail(email)
            .orElseThrow();
}
}