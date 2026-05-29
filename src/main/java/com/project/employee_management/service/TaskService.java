package com.project.employee_management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.employee_management.entity.Tasks;
import com.project.employee_management.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Tasks assignTask(Tasks task){

        task.setStatus("PENDING");
        task.setCompleted(false);

        return taskRepository.save(task);
    }

    public List<Tasks> getTasksByEmployee(Long userId){

        return taskRepository.findByAssignedTo_UserId(userId);
    }

    public Tasks updateTask(Tasks task){

        return taskRepository.save(task);
    }
}