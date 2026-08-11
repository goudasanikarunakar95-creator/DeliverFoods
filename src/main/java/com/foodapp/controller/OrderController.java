package com.foodapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodapp.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;


    // ===============================
    // Place Order
    // ===============================
    @PostMapping("/place/{userId}")
    public ResponseEntity<String> placeOrder(@PathVariable Long userId) {

        try {

            orderService.placeOrder(userId);

            return ResponseEntity.ok("Order Placed Successfully");

        } catch (RuntimeException e) {

            System.out.println("Order Error: " + e.getMessage());

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body("Unable to Place Order");

        }
    }


    // ===============================
    // Get All Orders
    // ===============================
    @GetMapping
    public ResponseEntity<?> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );

    }


    // ===============================
    // Delete Single Order
    // ===============================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(
            @PathVariable Long id) {

        orderService.deleteOrder(id);

        return ResponseEntity.ok(
                "Order Deleted Successfully"
        );
    }


    // =====================================================
    // NEW: Delete All Customer Orders
    // =====================================================
    @DeleteMapping("/remove-all")
    public ResponseEntity<String> removeAllOrders() {

        orderService.deleteAllOrders();

        return ResponseEntity.ok(
                "All Orders Removed Successfully"
        );
    }

}