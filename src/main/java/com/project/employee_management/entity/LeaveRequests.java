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

    public Long getLeaveRequestId(){
        return leave_request_id;
    }
    public void setLeaveRequestId(Long leave_request_id){
        this.leave_request_id=leave_request_id;
    }
    public String getLeaveType(){
        return leave_type;
    }
    public void setLeaveType(String leave_type){
        this.leave_type=leave_type;
    }
    public LocalDate getStartDate(){
        return start_date;
    }
    public void setStartDate(LocalDate start_date){
        this.start_date=start_date;
    }
    public LocalDate getEndDate(){
        return end_date;
    }
    public void setEndDate(LocalDate end_date){
        this.end_date=end_date;
    }
    public String getReason(){
        return reason;
    }
    public void setReason(String reason){
        this.reason=reason;
    }
    public String getStatus(){
        return status;
    }
    public void setStatus(String status){
        this.status=status;
    }
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
    public Users getUser() {
    return user;
}
public void setUser(Users user) {
    this.user = user;
}
}