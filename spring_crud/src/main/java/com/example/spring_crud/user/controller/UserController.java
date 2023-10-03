package com.example.spring_crud.user.controller;

import com.example.spring_crud.common.GenericResponse;
import com.example.spring_crud.user.dto.UserDTO;
import com.example.spring_crud.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.List;

/**
 * @author -  mGunawardhana
 * Date - 2023-09-28
 * Time - 11.58
 */

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(value = "/get-all-users", produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<UserDTO> getAllUsers() {
        return userService.getAllUserList();
    }

    @GetMapping(value = "/find-by-id/{id}")
    public UserDTO getRegisteredUserById(@PathVariable Integer id) {
        log.info("received id - {} getRegistered method! ",id);
        return userService.findByID(id);
    }

    @PostMapping(value = "/save", produces = {MediaType.APPLICATION_JSON_VALUE})
    public GenericResponse saveUser(@RequestBody UserDTO userDTO) {
        log.info("Save request received! {");
        log.info("save user : {}", userDTO);
        GenericResponse response = new GenericResponse();
        userService.saveUser(userDTO);
        response.setStatus(HttpStatus.OK);
        return response;
    }

    @PutMapping(value = "/update", produces = {MediaType.APPLICATION_JSON_VALUE})
    public GenericResponse updateUser(@RequestBody UserDTO user) {
        log.info("update user: {}", user);
        GenericResponse response = new GenericResponse();
        userService.updateUser(user);
        response.setStatus(HttpStatus.OK);
        return response;
    }

    @DeleteMapping(value = "/delete/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public GenericResponse deleteUserById(@PathVariable Integer id) {
        log.info("delete user Request: {}", id);
        GenericResponse response = new GenericResponse();
        userService.deleteUser(id);
        response.setStatus(HttpStatus.OK);
        log.info("delete user. Response: {}", response);
        return response;
    }
}