package com.admin.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Data
@Entity
@Table(name = "TrendingProducts")
@EntityListeners(AuditingEntityListener.class)
public class TrendingProductsModels {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trending_product_id")
    @JsonProperty("trending_product_id")
    private Long trendingProductId;

    @Column(name = "product_id")
    @JsonProperty("product_id")
    private Long productId;

    @ManyToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    @JsonProperty("product")
    private ProductModel product;

}
