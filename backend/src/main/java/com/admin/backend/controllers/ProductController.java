package com.admin.backend.controllers;

import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.ProductModel;
import com.admin.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    
    
    @PostMapping
    ResponseEntity<ProductModel> createProduct(@RequestBody ProductModel productModel){
        return new ResponseEntity<>(productService.createProduct(productModel), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    ResponseEntity<ProductModel> fetchProductById(@PathVariable Long id){
        ProductModel productModel = productService.fetchProduct(id);
        
        if (productModel == null){
            throw new ResourceNotFoundException("Product not found with id: " + id + ".");
        }
        return new ResponseEntity<>(productModel, HttpStatus.OK);
    }
    
    @GetMapping("/search/{product_name}")
    ResponseEntity<ProductModel> fetchProductByName(@PathVariable String product_name){
        ProductModel productModel = productService.fetchProductByName(product_name);

        if (productModel == null){
            throw new ResourceNotFoundException("Product not found with name: " + product_name + ".");
        }
        return new ResponseEntity<>(productModel, HttpStatus.OK);
    }
    
    @GetMapping
    ResponseEntity<List<ProductModel>> fetchProducts(@RequestParam(required = false) Long categoryId, @RequestParam(required = false) Boolean isAvailable){
        List<ProductModel> products;
        if(categoryId != null){
            products = productService.fetchProductsByCategoryId(categoryId);
        }
        else if (isAvailable != null){
            products = productService.fetchProductByAvailability(isAvailable);
        }
        else {
            products = productService.fetchAllProducts();
        }
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found.");
        }
        
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    
    @GetMapping("/search/recent")
    ResponseEntity<List<ProductModel>> fetchRecentProducts(@RequestParam(defaultValue = "5") Integer limit){
        List<ProductModel> products = productService.fetchRecentProducts(limit);
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found.");
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    
    
    @PutMapping("/{id}")
    ResponseEntity<ProductModel> updateProduct(@PathVariable Long id, @RequestBody ProductModel updatedProductModel){
        return new ResponseEntity<>(productService.updateProduct(id, updatedProductModel), HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteProduct(@PathVariable Long id){
        return new ResponseEntity<>(productService.deleteProduct(id) + " deleted successfully", HttpStatus.OK);
    }
    
}
