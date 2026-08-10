package com.foodapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.foodapp.entity.Order;
import com.foodapp.repository.OrderRepository;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private OrderRepository orderRepository;


    // ==========================
    // Get All Orders
    // ==========================
    @GetMapping("/orders")
    public List<Order> getAllOrders() {

        return orderRepository.findAllByOrderByOrderDateDesc();

    }


    // ==========================
    // Delete Order
    // ==========================
    @DeleteMapping("/orders/{id}")
    public String deleteOrder(@PathVariable Long id) {

        orderRepository.deleteById(id);

        return "Order Deleted Successfully";

    }


    // ==========================================
    // NEW: Remove All Customer Orders
    // ==========================================
    @DeleteMapping("/orders")
    public String deleteAllOrders() {

        orderRepository.deleteAll();

        return "All Orders Removed Successfully";

    }

}