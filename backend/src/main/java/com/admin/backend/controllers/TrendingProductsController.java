package com.admin.backend.controllers;

import com.admin.backend.models.TrendingProductsModels;
import com.admin.backend.services.TrendingProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/trending-products")
public class TrendingProductsController {
    @Autowired
    private TrendingProductsService trendingProductsService;

    @GetMapping
    public ResponseEntity<List<TrendingProductsModels>> getAllTrendingProducts() {
        List<TrendingProductsModels> trendingProducts = trendingProductsService.fetchAllTrendingProducts();
        return new ResponseEntity<>(trendingProducts, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TrendingProductsModels> addTrendingProduct(@RequestBody TrendingProductsModels trendingProduct) {
        TrendingProductsModels addedProduct = trendingProductsService.addTrendingProduct(trendingProduct);
        return new ResponseEntity<>(addedProduct, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeTrendingProduct(@PathVariable Long id) {
        trendingProductsService.removeTrendingProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
