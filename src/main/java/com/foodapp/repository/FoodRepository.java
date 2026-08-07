package com.foodapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodapp.entity.Food;

public interface FoodRepository extends JpaRepository<Food, Long> {

}