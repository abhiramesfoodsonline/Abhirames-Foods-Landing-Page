package com.admin.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.admin.backend.models.TrendingProductsModels;
import com.admin.backend.repositories.TrendingProductRepository;
import java.util.List;

@Service
public class TrendingProductsService {
    @Autowired
    private TrendingProductRepository trendingProductRepository;

    public List<TrendingProductsModels> fetchAllTrendingProducts() {
        return trendingProductRepository.findAll();
    }

    public TrendingProductsModels addTrendingProduct(TrendingProductsModels trendingProduct) {
        return trendingProductRepository.save(trendingProduct);
    }

    public void removeTrendingProduct(Long id) {
        trendingProductRepository.deleteById(id);
    }

}
