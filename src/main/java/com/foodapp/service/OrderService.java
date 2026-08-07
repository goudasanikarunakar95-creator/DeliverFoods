package com.foodapp.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodapp.entity.Cart;
import com.foodapp.entity.Order;
import com.foodapp.entity.User;
import com.foodapp.repository.CartRepository;
import com.foodapp.repository.OrderRepository;
import com.foodapp.repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EmailService emailService;

    // ======================================
    // Place Order
    // ======================================
    public double placeOrder(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        List<Cart> cartItems = cartRepository.findByUser(user);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart Empty");
        }

        double grandTotal = 0;

        StringBuilder items = new StringBuilder();

        for (Cart cart : cartItems) {

            Order order = new Order();

            // OLD FEATURES
            order.setUser(user);
            order.setFood(cart.getFood());
            order.setQuantity(cart.getQuantity());

            double total = cart.getFood().getPrice() * cart.getQuantity();

            order.setTotalPrice(total);
            order.setOrderDate(LocalDateTime.now());

            // ===============================
            // NEW FEATURES
            // ===============================
            order.setPaymentMode("Cash On Delivery");
            order.setOrderStatus("Pending");

            orderRepository.save(order);

            grandTotal += total;

            items.append(cart.getFood().getFoodName())
                 .append(" x ")
                 .append(cart.getQuantity())
                 .append(" = ₹")
                 .append(total)
                 .append("\n");
        }

        // ======================================
        // OLD EMAIL FEATURES (UNCHANGED)
        // ======================================

        emailService.sendOrderSuccessMail(
                user,
                items.toString(),
                grandTotal
        );

        emailService.sendAdminOrderMail(
                user,
                items.toString(),
                grandTotal
        );

        // ======================================
        // Clear Cart
        // ======================================
        cartRepository.deleteAll(cartItems);

        // Return Total (Bill Generation)
        return grandTotal;
    }

    // ======================================
    // Admin - View All Orders
    // ======================================
    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc();
    }

    // ======================================
    // User - My Orders
    // ======================================
    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }

    // ======================================
    // Admin - Delete Order
    // ======================================
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

}