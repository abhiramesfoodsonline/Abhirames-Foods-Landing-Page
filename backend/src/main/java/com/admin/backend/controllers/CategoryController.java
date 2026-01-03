package com.admin.backend.controllers;

import com.admin.backend.models.CategoriesModel;
import com.admin.backend.services.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    
    @Autowired
    private CategoriesService categoriesService;
    
    
    @PostMapping
    ResponseEntity<CategoriesModel> createCategory(@RequestBody CategoriesModel categoryModel){
        return new ResponseEntity<>(categoriesService.createCategory(categoryModel), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    ResponseEntity<CategoriesModel> fetchCategoryById(@PathVariable Long id) {
        CategoriesModel categoryModel = categoriesService.fetchCategoryById(id);
        if (categoryModel == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(categoryModel, HttpStatus.OK);
    }
    
    @GetMapping("/search/{category_name}")
    ResponseEntity<CategoriesModel> fetchCategoryByName(@PathVariable String category_name){
        CategoriesModel categoryModel = categoriesService.fetchCategoryByName(category_name);
        if (categoryModel == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(categoryModel, HttpStatus.OK);
    }
    
    @GetMapping
    ResponseEntity<List<CategoriesModel>> fetchCategories(
            @RequestParam(required = false) Boolean isActive,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime createdAtAfter,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime updatedAtAfter){
        List<CategoriesModel> categories;
        
        if (isActive != null){
            categories = categoriesService.fetchCategoriesByActiveStatus(isActive);
        } 
        else if (createdAtAfter != null){
            categories = categoriesService.fetchCategoriesCreatedAfter(createdAtAfter);
        }
        else if (updatedAtAfter != null){
            categories = categoriesService.fetchCategoriesUpdatedAfter(updatedAtAfter);
        }
        else {
            categories = categoriesService.fetchCategories();
        }
        
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    
    @GetMapping("/search/count")
    ResponseEntity<Long> fetchCategoriesCount(){
        Long count = categoriesService.fetchCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
    
    
    @PutMapping("/{id}")
    ResponseEntity<CategoriesModel> updateCategory(@PathVariable Long id, @RequestBody CategoriesModel updatedCategoryModel){
        CategoriesModel savedCategory = categoriesService.updateCategory(id, updatedCategoryModel);
        return new ResponseEntity<>(savedCategory, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteCategory( @PathVariable Long id) {
        String message = categoriesService.deleteCategory(id);
        return new ResponseEntity<>(message + " deleted successfully", HttpStatus.OK);
    }
}
