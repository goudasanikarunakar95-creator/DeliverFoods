package com.foodapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.foodapp.entity.User;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // =====================================
    // Welcome Email (OLD FEATURE)
    // =====================================
    public void sendWelcomeEmail(User user) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("goudasanikarunakar95@gmail.com");
        message.setTo(user.getEmail());

        message.setSubject("🎉 Welcome to Deliver Foods");

        message.setText(
                "Hi " + user.getName() + ",\n\n" +
                "Welcome to Deliver Foods! 🍔\n\n" +
                "Your account has been created successfully.\n\n" +
                "Name : " + user.getName() + "\n" +
                "Email : " + user.getEmail() + "\n\n" +
                "You can now login and order your favorite food.\n\n" +
                "Thank you for choosing Deliver Foods.\n\n" +
                "Regards,\n" +
                "Deliver Foods Team ❤️"
        );

        mailSender.send(message);
    }

    // =====================================
    // Order Confirmation Mail to User
    // =====================================
    public void sendOrderConfirmation(User user, String orderDetails) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("goudasanikarunakar95@gmail.com");
        message.setTo(user.getEmail());

        message.setSubject("🍽 Order Confirmed");

        message.setText(
                "Hi " + user.getName() + ",\n\n" +
                "Your order has been placed successfully.\n" +
                "🚚 Your order will be delivered within 30 minutes.\n\n" +
                "Order Details:\n\n" +
                orderDetails +
                "\n\nThank you for ordering with Deliver Foods ❤️\n\n" +
                "Regards,\nDeliver Foods Team"
        );

        mailSender.send(message);
    }

    // =====================================
    // Admin Order Notification
    // =====================================
    public void sendOrderToAdmin(User user, String orderDetails) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("goudasanikarunakar95@gmail.com");

        // Admin Email
        message.setTo("goudasanikarunakar95@gmail.com");

        message.setSubject("📢 New Food Order");

        message.setText(
                "New Order Received\n\n" +
                "Customer Name : " + user.getName() + "\n" +
                "Customer Email : " + user.getEmail() + "\n" +
                "Customer Phone : " + user.getPhone() + "\n" +
                "Customer Address : " + user.getAddress() + "\n\n" +
                "Order Details:\n\n" +
                orderDetails
        );

        mailSender.send(message);
    }

    // =====================================
    // OLD METHOD SUPPORT (OrderService)
    // =====================================
    public void sendOrderSuccessMail(User user, String items, double grandTotal) {

        String orderDetails =
                items +
                "\n---------------------------------\n" +
                "Grand Total : ₹" + grandTotal;

        sendOrderConfirmation(user, orderDetails);
    }

    // =====================================
    // OLD METHOD SUPPORT (OrderService)
    // =====================================
    public void sendAdminOrderMail(User user, String items, double grandTotal) {

        String orderDetails =
                items +
                "\n---------------------------------\n" +
                "Grand Total : ₹" + grandTotal;

        sendOrderToAdmin(user, orderDetails);
    }

}