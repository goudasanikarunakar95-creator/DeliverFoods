package com.foodapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.foodapp.entity.Cart;
import com.foodapp.entity.User;
import com.foodapp.repository.UserRepository;
import com.foodapp.service.CartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    // ==========================
    // Add To Cart
    // ==========================
    @PostMapping
    public Cart addToCart(@RequestBody CartRequest request) {

        return cartService.addToCart(
                request.getUserId(),
                request.getFoodId());

    }

    // ==========================
    // Get User Cart
    // ==========================
    @GetMapping("/{userId}")
    public List<Cart> getCart(@PathVariable Long userId) {

        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            return cartService.getCartItems(user.get());
        }

        return List.of();

    }

    // ==========================
    // Increase Quantity
    // ==========================
    @PutMapping("/increase/{cartId}")
    public Cart increaseQuantity(@PathVariable Long cartId) {

        return cartService.increaseQuantity(cartId);

    }

    // ==========================
    // Decrease Quantity
    // ==========================
    @PutMapping("/decrease/{cartId}")
    public Cart decreaseQuantity(@PathVariable Long cartId) {

        return cartService.decreaseQuantity(cartId);

    }

    // ==========================
    // Remove Cart Item
    // ==========================
    @DeleteMapping("/{cartId}")
    public void removeCartItem(@PathVariable Long cartId) {

        cartService.removeFromCart(cartId);

    }

    // ==========================
    // Request Class
    // ==========================
    public static class CartRequest {

        private Long userId;
        private Long foodId;

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public Long getFoodId() {
            return foodId;
        }

        public void setFoodId(Long foodId) {
            this.foodId = foodId;
        }

    }

}