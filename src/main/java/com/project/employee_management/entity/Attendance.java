package com.project.employee_management.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendance_id;
    private LocalTime checkInTime;

    private LocalTime checkOutTime;
    private Double totalHours;

    @Size(max = 200, message = "Remarks cannot exceed 200 characters")
    private String remarks;
    
    private LocalDate attendanceDate;


    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    public Long getAttendance_id() {
        return attendance_id;
    }

    public void setAttendance_id(Long attendance_id) {
        this.attendance_id = attendance_id;
    }

public Double getTotalHours() {
    return totalHours;
}

public void setTotalHours(Double totalHours) {
    this.totalHours = totalHours;
}

public String getRemarks(){
    return remarks;
}

public void setRemarks(String remarks){
    this.remarks=remarks;
}

    public LocalDate getAttendanceDate() {
        return attendanceDate;
    }

    public void setAttendanceDate(LocalDate attendanceDate) {
        this.attendanceDate = attendanceDate;
    }

    public LocalTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(LocalTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalTime getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(LocalTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}