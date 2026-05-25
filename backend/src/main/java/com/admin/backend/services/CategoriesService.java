package com.admin.backend.services;

import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.CategoriesModel;
import com.admin.backend.repositories.CategoriesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class CategoriesService {
    
    
    @Autowired
    private CategoriesRepository categoriesRepository;

    public CategoriesModel createCategory(CategoriesModel categoryModel){
        if(categoriesRepository.findByCategoryName(categoryModel.getCategoryName()) != null){
            throw new ResourceConflictException(categoryModel.getCategoryName() + " already exists.");
        }
        return categoriesRepository.save(categoryModel);
    }
    
    public List<CategoriesModel> fetchCategories(){
        return categoriesRepository.findAll();
    }
    
    public CategoriesModel fetchCategoryById(Long categoryId){
        if(categoryId == null){
            throw new IllegalArgumentException("Category id cannot be empty.");
        }
        CategoriesModel category = categoriesRepository.findByCategoryId(categoryId);
        if (category == null){
            throw new ResourceNotFoundException("Category not found with id: " + categoryId + ".");
        }
        return category;
    }
    
    public CategoriesModel fetchCategoryByName(String categoryName){
        if(categoryName == null){
            throw new IllegalArgumentException("Category name cannot be empty.");
        }
        CategoriesModel category = categoriesRepository.findByCategoryName(categoryName);
        if (category == null){
            throw new ResourceNotFoundException(categoryName + " not found!");
        }
        return category;
    }
    
    public Long fetchCount(){
        return categoriesRepository.count();
    }
    
    public List<CategoriesModel> fetchCategoriesByActiveStatus(Boolean isActive){
        List<CategoriesModel> category = categoriesRepository.findAllByIsActive(isActive);
        if (category == null){
            throw new ResourceNotFoundException("No category found under " + (isActive ? "active" : "inactive") + " status.");
        }
        return category;
    }
    
    public List<CategoriesModel> fetchCategoriesCreatedAfter(LocalDateTime createdAfter){
        if (createdAfter == null){
            throw new IllegalArgumentException("Created after date cannot be empty.");
        }
        List<CategoriesModel> category = categoriesRepository.findAllByCreatedAtAfter(createdAfter);
        if (category == null){
            throw new ResourceNotFoundException("No category found for the given date.");
        }
        return category;
    }
    
    public List<CategoriesModel> fetchCategoriesUpdatedAfter(LocalDateTime updatedAfter){
        if (updatedAfter == null){
            throw new IllegalArgumentException("Updated after date cannot be empty.");
        }
        List<CategoriesModel> category = categoriesRepository.findAllByUpdatedAtAfter(updatedAfter);
        if (category == null){
            throw new ResourceNotFoundException("No category found for the given date.");
        }
        return category;
    }

    public CategoriesModel updateCategory(Long id, CategoriesModel updatedCategory){
        if(updatedCategory == null || updatedCategory.getCategoryName() == null){
            throw new IllegalArgumentException("Category name cannot be empty.");
        }
        CategoriesModel existingCategory = fetchCategoryById(id);
        if (existingCategory == null){
            throw new ResourceNotFoundException("Category not found with id: " + id);
        }

        existingCategory.setCategoryName(updatedCategory.getCategoryName());
        existingCategory.setDescription(updatedCategory.getDescription());
        existingCategory.setTitle(updatedCategory.getTitle());
        existingCategory.setImageUrl(updatedCategory.getImageUrl());
        existingCategory.setActive(updatedCategory.isActive());
        existingCategory.setUpdatedAt(LocalDateTime.now());
        
        return categoriesRepository.save(existingCategory);
    }

    @Transactional
    public String deleteCategory(Long categoryId) {
        if (categoryId == null) {
            throw new IllegalArgumentException("Category id cannot be empty.");
        }
        CategoriesModel existingCategory = fetchCategoryById(categoryId);
        if (existingCategory == null) {
            throw new ResourceNotFoundException("Category not found with id: " + categoryId);
        }

        String categoryName = existingCategory.getCategoryName();

        try {
            categoriesRepository.deleteById(categoryId);
            categoriesRepository.flush();
        } catch (DataIntegrityViolationException e) {
            System.out.println("Caught: " + e.getMessage());
            throw new ResourceConflictException("Category " + categoryName + " contains products.");
        }

        return categoryName;
    }
}
