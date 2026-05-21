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
@Table(name = "users")
public class Users{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    private String full_name;

    private String gender;

    private String email;

    private String password;
    private LocalDate dob;
    private String mobile_number;
    private String city;

private String state;

private String address;
    private String role;

    public Long getUser_id() {
        return user_id;
    }
    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
    public String getFull_name() {
        return full_name;
    }
    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email=email;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String password) {
        this.password=password;
    }
    public LocalDate getDob(){
        return dob;
    }
    public void setDob(LocalDate dob){
        this.dob=dob;
    }
    public String getMobile_number() {
    return mobile_number;
}
public void setMobile_number(String mobile_number) {
    this.mobile_number = mobile_number;
}
public String getCity() {
    return city;
}
public void setCity(String city) {
    this.city = city;
}
public String getState() {
    return state;
}
public void setState(String state) {
    this.state = state;
}
public String getAddress() {
    return address;
}
public void setAddress(String address) {
    this.address = address;
}

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Departments department;

    public Departments getDepartment() {
    return department;
}
public void setDepartment(Departments department) {
    this.department = department;
}
}