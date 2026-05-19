package com.project.employee_management.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "leave_requests")
public class LeaveRequests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leave_request_id;

    private String leave_type;

    private LocalDate start_date;

    private LocalDate end_date;

    private String reason;

    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
}