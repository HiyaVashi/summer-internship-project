package com.project.employee_management.service;

import java.util.List;

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

        
        if(userRepository
        .findByEmail(user.getEmail())
        .isPresent()) {

    throw new RuntimeException(
            "Email already exists");
}
String password =
        user.getPassword();

if(!password.matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$"
)){

    throw new RuntimeException(
            "Password must contain uppercase, lowercase, number and special character"
    );
}
        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    public List<Users> getAllEmployees(){

    return userRepository.findByRole("EMPLOYEE");
}
}