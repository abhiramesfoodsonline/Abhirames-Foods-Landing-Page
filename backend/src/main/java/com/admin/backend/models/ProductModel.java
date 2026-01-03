package com.admin.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Products")
@EntityListeners(AuditingEntityListener.class)
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    @JsonProperty("product_id")
    private Long productId;

    @NotBlank(message = "Product name cannot be empty")
    @Column(name = "product_name", unique = true)
    @JsonProperty("product_name")
    private String productName;

    @NotBlank(message = "Product description cannot be empty")
    @Column(name = "product_description")
    @JsonProperty("product_description")
    private String productDescription;

    @NotBlank(message = "Buy Link cannot be empty")
    @Column(name = "buy_link")
    @JsonProperty("buy_link")
    private String buyLink;

    @NotBlank(message = "Image Url cannot be empty")
    @Column(name = "product_image_url")
    @JsonProperty("product_image_url")
    private String productImageUrl;
    
    @Column(name = "is_available")
    @JsonProperty("is_available")
    private boolean isAvailable;
    
    @Column(name = "category_id")
    @JsonProperty("category_id")
    private Long categoryId;


    @Column(name = "created_at", updatable = false)
    @JsonProperty("created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @JsonProperty("updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    @ManyToOne
    @JoinColumn(name = "category_id", insertable = false, updatable = false)
    @JsonProperty("category")
    private CategoriesModel category;
}
