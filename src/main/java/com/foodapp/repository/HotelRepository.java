package com.foodapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodapp.entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {

}