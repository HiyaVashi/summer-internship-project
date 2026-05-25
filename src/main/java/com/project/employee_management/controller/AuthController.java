package com.project.employee_management.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public String login(@RequestBody LoginRequest request) {

        Users user = userRepository.findByEmail(request.getEmail())
        .orElseThrow();

        if (user == null) {
            return "User not found";
        }

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!matches) {
            return "Invalid password";
        }

        String token =
                JwtUtil.generateToken(user.getEmail());

        return token;
    }
}