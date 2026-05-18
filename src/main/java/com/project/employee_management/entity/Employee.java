package com.project.employee_management.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Employee {

    @Id
    private Long id;

    private String name;

    private String email;
}