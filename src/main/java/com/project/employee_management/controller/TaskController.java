package com.project.employee_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.employee_management.entity.Tasks;
import com.project.employee_management.service.TaskService;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5500")

public class TaskController {

    @Autowired
    private TaskService taskService;


    @PostMapping("/assign")

    public Tasks assignTask(@RequestBody Tasks task){
        return taskService.assignTask(task);
    }

    @GetMapping("/mytasks/{userId}")

    public List<Tasks> getTasksByEmployee( @PathVariable Long userId){
        return taskService.getTasksByEmployee(userId);
    }


    @PutMapping("/update")

    public Tasks updateTask(@RequestBody Tasks task){
        return taskService.updateTask(task);
    }
}