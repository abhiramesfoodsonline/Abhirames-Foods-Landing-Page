package com.admin.backend.services;

import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.ProductModel;
import com.admin.backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;


    public ProductModel createProduct(ProductModel product){
        if (fetchProductByName(product.getProductName()) != null){
            throw new ResourceConflictException("Product already exists with name: " + product.getProductName());
        }
        return productRepository.save(product);
    }
    
    public List<ProductModel> fetchAllProducts(){
        return productRepository.findAll();
    }
    
    public List<ProductModel> fetchProductsByCategoryId(Long categoryId){
        if (categoryId == null){
            throw new IllegalArgumentException("Category id cannot be empty.");
        }
        return productRepository.findAllByCategoryId(categoryId);
    }
    
    public ProductModel fetchProduct(Long productId){
        if (productId == null){
            throw new IllegalArgumentException("Product id cannot be empty.");
        }
        return productRepository.findByProductId(productId);
    }
    
    public ProductModel fetchProductByName(String productName){
        if (productName == null){
            throw new IllegalArgumentException("Product name cannot be empty.");
        }
        return productRepository.findByProductName(productName);
    }

    public List<ProductModel> fetchProductByAvailability(boolean isAvailable){
        return productRepository.findAllByIsAvailable(isAvailable);
    }

    public ProductModel updateProduct(Long id, ProductModel product){
        if(id == null || product == null || product.getProductName() == null || product.getProductDescription() == null || product.getBuyLink() == null || product.getProductImageUrl() == null){
            System.out.println(product);
            throw new IllegalArgumentException("One or more required fields are empty or null.");
        }
        
        ProductModel existingProduct = fetchProduct(id);
        if (existingProduct == null){
            throw new IllegalArgumentException("Product not found with id: " + id);
        }
        existingProduct.setProductName(product.getProductName());
        existingProduct.setProductDescription(product.getProductDescription());
        existingProduct.setBuyLink(product.getBuyLink());
        existingProduct.setProductImageUrl(product.getProductImageUrl());
        existingProduct.setAvailable(product.isAvailable());
        existingProduct.setCategoryId(product.getCategoryId());
        
        return productRepository.save(existingProduct);
    }
    
    public List<ProductModel> fetchRecentProducts(int limit){
        if (limit == 0){
            throw new IllegalArgumentException("Limit cannot be empty.");
        }
        return productRepository.findByOrderByCreatedAtDesc(PageRequest.of(0, limit));
    }

    public String deleteProduct(Long productId){
        if (productId == null){
            throw new IllegalArgumentException("Product id cannot be empty.");
        }
        ProductModel existingProduct = fetchProduct(productId);
        if (existingProduct == null){
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }
        String productName = existingProduct.getProductName();
        productRepository.deleteById(productId);
        return productName;
    }

}
