package com.example.spring_crud.user.service.impl;

import com.example.spring_crud.common.entity.User;
import com.example.spring_crud.common.repo.UserRepository;
import com.example.spring_crud.user.dto.UserDTO;
import com.example.spring_crud.user.service.UserService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author -  mGunawardhana
 * Date - 2023-09-28
 * Time - 11.57
 */
@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public void saveUser(UserDTO user) {
        log.info("saveUser on fire! {} ", user);
        userRepository.save(userDtoMapperToEntity(user));
    }

    @Override
    public void updateUser(UserDTO userDTO) {
        log.info("updateUser on fire {}", userDTO);
        if (userRepository.existsById(userDTO.getId())) {
            userRepository.save(userDtoMapperToEntity(userDTO));
        } else {
            log.warn("update user throwing warn cannot find this type id {}", userDTO.getId());
            throw new RuntimeException("cannot find this type of id! " + userDTO.getId());
        }
    }

    @Override
    public UserDTO findByID(Integer id) {
        log.info("find by id on fire {} ", id);
        Optional<User> optional = userRepository.findById(id);
        if (optional.isPresent()) {
            User user = optional.get();
            log.info("returning founded user {} ", user);
            return userEntityMapperToDto(user);
        } else {
            log.warn("user not found this in id {} ", id);
            throw new RuntimeException("User not found with ID: " + id);
        }
    }

    @Override
    @Transactional
    public void deleteUser(Integer id) {
        log.info("fire on deleteUser {} ", id);
        Optional<User> optionalUser = userRepository.findById(id);
        log.warn("optional user if sounded {}", optionalUser);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setStatus(0);
            userRepository.save(user);
        } else {
            log.error("we cant found user on that id! {}", id);
        }
    }

    @Override
    public List<UserDTO> getAllUserList() {
        log.info("getAllUserList on fire");
        List<User> list = userRepository.findAll();
        List<UserDTO> dtoList = new ArrayList<>();

        for (User user : list) {
            if (user.getStatus() == 1) {
                dtoList.add(userEntityMapperToDto(user));
            }
        }

        log.info("returning the list {} ", dtoList);
        return dtoList;
    }


    public UserDTO userEntityMapperToDto(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setMobile(user.getMobile());
        userDTO.setWeight(user.getWeight());
        userDTO.setHeight(user.getHeight());
        userDTO.setBmi(user.getBmi());
        userDTO.setBmiResult(user.getBmiResult());
        userDTO.setGender(user.getGender());
        userDTO.setRequireTrainer(user.getRequireTrainer());
        userDTO.setPackageName(user.getPackageName());
        userDTO.setImportant(user.getImportant());
        userDTO.setHaveGymBefore(user.getHaveGymBefore());
        userDTO.setEnquiryDate(user.getEnquiryDate());
        userDTO.setStatus(user.getStatus());
        return userDTO;
    }

    public User userDtoMapperToEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setMobile(userDTO.getMobile());
        user.setWeight(userDTO.getWeight());
        user.setHeight(userDTO.getHeight());
        user.setBmi(userDTO.getBmi());
        user.setBmiResult(userDTO.getBmiResult());
        user.setGender(userDTO.getGender());
        user.setRequireTrainer(userDTO.getRequireTrainer());
        user.setPackageName(userDTO.getPackageName());
        user.setImportant(userDTO.getImportant());
        user.setHaveGymBefore(userDTO.getHaveGymBefore());
        user.setEnquiryDate(userDTO.getEnquiryDate());
        user.setStatus(1);
        return user;
    }
}