package com.project.employee_management.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.project.employee_management.dto.LoginRequest;
import com.project.employee_management.entity.Users;
import com.project.employee_management.repository.UserRepository;
import com.project.employee_management.security.JwtUtil;
@RestController
@CrossOrigin(origins = "http://localhost:5500")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
public Map<String, String> login(@RequestBody LoginRequest request){

    Users user =
        userRepository
        .findByEmail(request.getEmail())
        .orElseThrow(() ->
            new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid email or password"
            )
        );

    if(passwordEncoder.matches(
            request.getPassword(),
            user.getPassword())){

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "token",
                JwtUtil.generateToken(user.getEmail())
        );

        response.put(
                "role",
                user.getRole()
        );

        return response;
    }

    throw new ResponseStatusException(
        HttpStatus.UNAUTHORIZED,
        "Invalid credentials"
);
}
}