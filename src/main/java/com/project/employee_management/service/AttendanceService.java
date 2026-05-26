package com.project.employee_management.service;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.employee_management.entity.Attendance;
import com.project.employee_management.repository.AttendanceRepository;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Attendance markAttendance(Attendance attendance){
        Duration duration =Duration.between(attendance.getCheckInTime(),attendance.getCheckOutTime());

double totalHours = duration.toMinutes() / 60.0;

attendance.setTotalHours(totalHours);
        return attendanceRepository.save(attendance);
    }
}