package com.project.employee_management.controller;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    public Users registerUser(

        @Valid
        @ModelAttribute Users user,

        @RequestParam("photo")
        MultipartFile file

    ) throws IOException {

        // FILE VALIDATION

        if(file.getSize() > 5 * 1024 * 1024){

            throw new RuntimeException(
                "File size exceeds 5MB"
            );
        }

        String contentType = file.getContentType();

        if(!contentType.equals("image/jpeg") && !contentType.equals("image/png")){

            throw new RuntimeException("Only JPG and PNG allowed");
        }

        // SAVE FILE

        String uploadDir = "uploads/";
        Files.createDirectories(Paths.get(uploadDir));
        String fileName = file.getOriginalFilename();
        Path path = Paths.get(uploadDir + fileName);
        Files.write(path, file.getBytes());
        // SAVE FILE NAME IN DB
        user.setPhoto_path(fileName);
        return userService.registerUser(user);
    
    }
    @Autowired
private UserRepository userRepository;
@GetMapping("/me")
public Users getCurrentUser(@RequestHeader("Authorization") String authHeader){

    String token =authHeader.substring(7);

    System.out.println(token);

    String email =JwtUtil.extractUsername(token);

    System.out.println(email);

    return userRepository
            .findByEmail(email)
            .orElseThrow();
}

@GetMapping("/employees")

public List<Users> getAllEmployees(){

    return userService.getAllEmployees();
}
}