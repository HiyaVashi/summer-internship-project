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
@Table(name = "attendance")
public class Attendance{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendance_id;

    private LocalDate attendance_date;

    private String status;

    public Long getAttendanceId(){
        return attendance_id;
    }
    public void setAttendanceId(Long attendance_id){
        this.attendance_id=attendance_id;
    }
    public LocalDate getAttendanceDate(){
        return attendance_date;
    }
    public void setAttendanceDate(LocalDate attendance_date){
        this.attendance_date=attendance_date;
    }
    public String getStatus(){
        return status;
    }
    public void setStatus(String status){
        this.status=status;
    }
    @ManyToOne
    @JoinColumn(name="user_id")
    private Users user;
}