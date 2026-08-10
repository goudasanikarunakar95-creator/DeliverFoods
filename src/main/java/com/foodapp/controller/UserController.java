package com.foodapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.foodapp.entity.User;
import com.foodapp.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    // ==========================
    // Register User
    // ==========================
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    // ==========================
    // User Login
    // ==========================
    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {

        Optional<User> loggedUser =
                userService.loginUser(user.getEmail(), user.getPassword());

        if (loggedUser.isPresent()) {
            return loggedUser.get();
        }

        throw new RuntimeException("Invalid Email or Password");
    }

    // ==========================
    // Get All Users
    // ==========================
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // ==========================
    // Get User By ID
    // ==========================
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {

        return userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

    }

    // ==========================
    // Delete User
    // ==========================
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {

        userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        userService.deleteUser(id);

        return "✅ User Deleted Successfully";
    }
// ==========================
// Forgot Password
// ==========================
@PutMapping("/forgot-password")
public String forgotPassword(@RequestBody User user) {

    userService.resetPassword(
            user.getEmail(),
            user.getPassword()
    );

    return "✅ Password Reset Successfully";
}
}
