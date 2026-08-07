package com.foodapp.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.foodapp.entity.Food;
import com.foodapp.repository.FoodRepository;

@Component
public class FoodCodeInitializer implements CommandLineRunner {

    private final FoodRepository foodRepository;

    public FoodCodeInitializer(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @Override
    public void run(String... args) {

        List<Food> foods = foodRepository.findAll();

        for (Food food : foods) {

            if (food.getFoodCode() == null || food.getFoodCode().isBlank()) {

                food.setFoodCode(String.format("FD%03d", food.getId()));

                foodRepository.save(food);
            }
        }

        System.out.println("Food Codes Generated Successfully");
    }
}