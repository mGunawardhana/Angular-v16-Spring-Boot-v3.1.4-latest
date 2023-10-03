package com.example.spring_crud.common.repo;

import com.example.spring_crud.common.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author -  mGunawardhana
 * Date - 2023-09-28
 * Time - 12.11
 */
public interface UserRepository extends JpaRepository<User, Integer> {
}
