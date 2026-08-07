package com.foodapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodapp.entity.Food;
import com.foodapp.repository.CartRepository;
import com.foodapp.repository.FoodRepository;

import jakarta.transaction.Transactional;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private CartRepository cartRepository;

    // ==========================
    // Save Food
    // ==========================
    @Override
    public Food saveFood(Food food) {

        // Save food first to generate ID
        Food savedFood = foodRepository.save(food);

        // Generate Food Code (FD001, FD002...)
        if (savedFood.getFoodCode() == null || savedFood.getFoodCode().isEmpty()) {

            String code = String.format("FD%03d", savedFood.getId());

            savedFood.setFoodCode(code);

            savedFood = foodRepository.save(savedFood);
        }

        return savedFood;
    }

    // ==========================
    // Get All Foods
    // ==========================
    @Override
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // ==========================
    // Delete Food
    // ==========================
    @Override
    @Transactional
    public void deleteFood(Long id) {

        // Delete all cart records related to this food
        cartRepository.deleteByFoodId(id);

        // Delete the food
        foodRepository.deleteById(id);
    }

}