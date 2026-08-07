package com.foodapp.service;

import java.util.List;

import com.foodapp.entity.Food;

public interface FoodService {

    Food saveFood(Food food);

    List<Food> getAllFoods();

    void deleteFood(Long id);

}