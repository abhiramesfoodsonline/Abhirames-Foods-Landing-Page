package com.admin.backend.repositories;


import com.admin.backend.models.CategoriesModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CategoriesRepository extends JpaRepository<CategoriesModel, Long> {
    CategoriesModel findByCategoryId(Long categoryId);

    CategoriesModel findByCategoryName(String categoryName);
    
    List<CategoriesModel> findAllByIsActive(boolean isActive);

    List<CategoriesModel> findAllByCreatedAtAfter(LocalDateTime createdAtAfter);
    
    List<CategoriesModel> findAllByUpdatedAtAfter(LocalDateTime updatedAtBefore);
}
