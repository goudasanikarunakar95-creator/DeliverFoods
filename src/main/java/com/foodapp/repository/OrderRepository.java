package com.foodapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodapp.entity.Order;
import com.foodapp.entity.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // ==========================
    // OLD FEATURE
    // ==========================
    List<Order> findByUser(User user);

    // ==========================
    // NEW FEATURES
    // ==========================

    // Get all orders in latest first
    List<Order> findAllByOrderByOrderDateDesc();

    // Get orders by status
    List<Order> findByOrderStatus(String orderStatus);

    // Delete Order (already available in JpaRepository,
    // adding this for readability)
    void deleteById(Long id);

}