package com.project.employee_management.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "departments")
public class Departments{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long department_id;

    private String name;

    private String description;

    public Long getDepartment_id() {
    return department_id;
}
public void setDepartment_id(Long department_id) {
    this.department_id = department_id;
}
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }
    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description = description;
    }

}