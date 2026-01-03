package com.admin.backend.repositories;

import com.admin.backend.models.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    ProductModel findByProductId(Long productId);
    ProductModel findByProductName(String productName);
    List<ProductModel> findAllByCategoryId(Long categoryId);
    
    List<ProductModel> findAllByIsAvailable(boolean isAvailable);
    
    List<ProductModel> findByOrderByCreatedAtDesc(Pageable pageable);
}
