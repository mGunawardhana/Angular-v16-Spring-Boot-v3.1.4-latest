package com.example.spring_crud.common.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

/**
 * @author -  mGunawardhana
 * Date - 2023-09-28
 * Time - 00.10
 */
@Getter
@Setter
@Entity
@Table(name = "User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "height")
    private Double height;

    @Column(name = "bmi")
    private Double bmi;

    @Column(name = "bmi_result")
    private String bmiResult;

    @Column(name = "gender")
    private String gender;

    @Column(name = "require_trainer")
    private String requireTrainer;

    @Column(name = "package_name")
    private String packageName;

    @Column(name = "important")
    private String important;

    @Column(name = "have_gym_before")
    private String haveGymBefore;

    @Column(name = "enquiry_date")
    private String enquiryDate;

    @Column(name = "status")
    private Integer status;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", insertable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

}