package com.foodapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodapp.entity.User;
import com.foodapp.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    // ==========================
    // Register User
    // ==========================
    public User saveUser(User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already registered!");
        }

        // Default Role
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        // Save User
        User savedUser = userRepository.save(user);

        // Send Welcome Email
        //emailService.sendWelcomeEmail(savedUser);

        return savedUser;
    }

    // ==========================
    // Login User
    // ==========================
    public Optional<User> loginUser(String email, String password) {

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }

        return Optional.empty();
    }

    // ==========================
    // Get All Users
    // ==========================
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ==========================
    // Get User By Id
    // ==========================
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // ==========================
    // Delete User
    // ==========================
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    // ==========================
// Forgot Password
// ==========================
public void resetPassword(String email, String newPassword) {

    Optional<User> user = userRepository.findByEmail(email);

    if (user.isEmpty()) {
        throw new RuntimeException("Email Not Found");
    }

    user.get().setPassword(newPassword);

    userRepository.save(user.get());
}

}