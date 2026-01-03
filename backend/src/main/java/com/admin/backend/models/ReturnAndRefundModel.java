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
@Table(name = "ReturnAndRefund")
@EntityListeners(AuditingEntityListener.class)
public class ReturnAndRefundModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "return_and_refund_id")
    @JsonProperty("return_and_refund_id")
    private Long returnAndRefundId;

    @NotBlank(message = "Description cannot be empty")
    @Column(name = "description")
    @JsonProperty("description")
    private String description;

    @Column(name = "created_at", updatable = false)
    @JsonProperty("created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @JsonProperty("updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

}
