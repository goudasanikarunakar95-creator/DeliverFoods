package com.foodapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodapp.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find User By Email
    Optional<User> findByEmail(String email);

}