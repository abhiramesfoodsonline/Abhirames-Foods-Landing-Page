package com.admin.backend.repositories;
import com.admin.backend.models.TrendingProductsModels;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TrendingProductRepository extends JpaRepository<TrendingProductsModels, Long> {
}
