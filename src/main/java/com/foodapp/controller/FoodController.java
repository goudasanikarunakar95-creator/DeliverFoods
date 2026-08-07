package com.foodapp.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.foodapp.entity.Food;
import com.foodapp.service.FoodService;

@RestController
@RequestMapping("/foods")
@CrossOrigin(origins = "*")
public class FoodController {

    @Autowired
    private FoodService foodService;

    // ==========================
    // Add Food
    // ==========================
    @PostMapping
    public Food saveFood(@RequestBody Food food) {
        return foodService.saveFood(food);
    }

    // ==========================
    // Get All Foods
    // ==========================
    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    // ==========================
    // Delete Food
    // ==========================
    @DeleteMapping("/{id}")
    public String deleteFood(@PathVariable Long id) {

        foodService.deleteFood(id);

        return "✅ Food Deleted Successfully";
    }

    // ==========================
    // Upload Image
    // ==========================
    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) {

        try {

            String uploadDir = "src/main/resources/static/uploads/";

            File folder = new File(uploadDir);

            if (!folder.exists()) {
                folder.mkdirs();
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            Path path = Paths.get(uploadDir + fileName);

            Files.write(path, file.getBytes());

            return "/uploads/" + fileName;

        } catch (IOException e) {

            e.printStackTrace();

            return "Upload Failed";
        }
    }
}