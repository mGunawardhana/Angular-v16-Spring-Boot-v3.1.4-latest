package com.example.spring_crud.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.http.HttpStatus;

/**
 * @author -  mGunawardhana
 * Date - 2023-09-28
 * Time - 11.54
 */

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GenericResponse {

    private HttpStatus status;

    private String message;

    private String responseCode;

    private Object response;

}