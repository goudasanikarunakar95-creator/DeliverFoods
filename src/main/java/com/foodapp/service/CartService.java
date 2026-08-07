package com.foodapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodapp.entity.Cart;
import com.foodapp.entity.Food;
import com.foodapp.entity.User;
import com.foodapp.repository.CartRepository;
import com.foodapp.repository.FoodRepository;
import com.foodapp.repository.UserRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    // ==========================
    // Add Item To Cart
    // ==========================
    public Cart addToCart(Long userId, Long foodId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food Not Found"));

        Optional<Cart> existingCart = cartRepository.findByUserAndFood(user, food);

        if (existingCart.isPresent()) {

            Cart cart = existingCart.get();

            cart.setQuantity(cart.getQuantity() + 1);

            return cartRepository.save(cart);

        }

        Cart cart = new Cart();

        cart.setUser(user);

        cart.setFood(food);

        cart.setQuantity(1);

        return cartRepository.save(cart);
    }

    // ==========================
    // Get User Cart
    // ==========================
    public List<Cart> getCartItems(User user) {

        return cartRepository.findByUser(user);

    }

    // ==========================
    // Remove Item
    // ==========================
    public void removeFromCart(Long id) {

        cartRepository.deleteById(id);

    }

    // ==========================
    // Increase Quantity
    // ==========================
    public Cart increaseQuantity(Long cartId) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart Not Found"));

        cart.setQuantity(cart.getQuantity() + 1);

        return cartRepository.save(cart);

    }

    // ==========================
    // Decrease Quantity
    // ==========================
    public Cart decreaseQuantity(Long cartId) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart Not Found"));

        if (cart.getQuantity() > 1) {

            cart.setQuantity(cart.getQuantity() - 1);

            return cartRepository.save(cart);

        } else {

            cartRepository.delete(cart);

            return null;

        }

    }

}