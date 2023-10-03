package com.example.spring_crud.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;


/**
 * @author -  mGunawardhana
 * Date - 2023-09-28
 * Time - 11.33
 */
@Data
public class UserDTO {
    private Integer id;

    @NotNull(message = "firstName cannot be null!")
    private String firstName;

    private String lastName;

    @NotNull(message = "email cannot be null!")
    private String email;

    @NotNull(message = "mobile cannot be null!")
    private String mobile;

    @NotNull(message = "weight cannot be null!")
    private Double weight;

    @NotNull(message = "height cannot be null!")
    private Double height;

    private Double bmi;

    private String bmiResult;

    @NotNull(message = "gender cannot be null!")
    private String gender;

    @NotNull(message = "requireTrainer cannot be null!")
    private String requireTrainer;

    @NotNull(message = "packageName cannot be null!")
    private String packageName;

    private String important;

    private String haveGymBefore;

    @NotNull(message = "enquiryDate cannot be null!")
    private String enquiryDate;

    @Size(min = 1, max = 1, message = "status must have exactly one element!")
    @NotNull(message = "status cannot be null!")
    private Integer status;

}