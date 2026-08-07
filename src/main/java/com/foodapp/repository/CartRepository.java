package com.foodapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.foodapp.entity.Cart;
import com.foodapp.entity.Food;
import com.foodapp.entity.User;

import jakarta.transaction.Transactional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUser(User user);

    Optional<Cart> findByUserAndFood(User user, Food food);

    // Delete all cart items of a food
    @Transactional
    @Modifying
    @Query("DELETE FROM Cart c WHERE c.food.id = :foodId")
    void deleteByFoodId(@Param("foodId") Long foodId);

}