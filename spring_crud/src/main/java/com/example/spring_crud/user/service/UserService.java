package com.example.spring_crud.user.service;

import com.example.spring_crud.user.dto.UserDTO;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author -  mGunawardhana
 * Date - 2023-09-28
 * Time - 11.57
 */
@Component
public interface UserService {

    void saveUser(UserDTO user);

    void updateUser(UserDTO user);

    void deleteUser(Integer id);

    List<UserDTO> getAllUserList();

    UserDTO findByID(Integer id);
}
