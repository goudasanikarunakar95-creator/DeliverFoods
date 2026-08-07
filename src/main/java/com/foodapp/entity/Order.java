package com.foodapp.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Food
    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    // Quantity
    private int quantity;

    // Total Price
    private double totalPrice;

    // Order Date
    private LocalDateTime orderDate;

    // ==========================
    // NEW FEATURES
    // ==========================

    // Cash On Delivery
    private String paymentMode;

    // Pending / Delivered
    private String orderStatus;

    // ==========================
    // Constructors
    // ==========================

    public Order() {
    }

    public Order(Long id, User user, Food food, int quantity,
                 double totalPrice, LocalDateTime orderDate,
                 String paymentMode, String orderStatus) {

        this.id = id;
        this.user = user;
        this.food = food;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.orderDate = orderDate;
        this.paymentMode = paymentMode;
        this.orderStatus = orderStatus;
    }

    // ==========================
    // Getters & Setters
    // ==========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Food getFood() {
        return food;
    }

    public void setFood(Food food) {
        this.food = food;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

}