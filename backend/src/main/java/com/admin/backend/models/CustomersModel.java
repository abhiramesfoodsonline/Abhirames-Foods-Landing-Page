package com.admin.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "Customers")
@EntityListeners(AuditingEntityListener.class)
public class CustomersModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    @JsonProperty("customer_id")
    private Long customerId;

    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Column(name = "mobile_number")
    @JsonProperty("mobile_number")
    private String mobileNumber;

    @Column(name = "created_at", updatable = false)
    @JsonProperty("created_at")
    @CreatedDate
    private LocalDateTime createdAt;
}
