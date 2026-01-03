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
@Table(name = "AdminUsers")
@EntityListeners(AuditingEntityListener.class)
public class AdminUsersModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    @JsonProperty("admin_id")
    private Long adminId;
    
    @NotBlank(message = "Username cannot be empty")
    @Column(name = "username", unique = true)
    @JsonProperty("username")
    private String username;

    @NotBlank(message = "Password cannot be empty")
    @Column(name = "password")
    @JsonProperty(value = "password", access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @NotBlank(message = "Role cannot be empty")
    @Column(name = "role")
    @JsonProperty("role")
    private String role;
    
    @JsonProperty("created_at")
    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
