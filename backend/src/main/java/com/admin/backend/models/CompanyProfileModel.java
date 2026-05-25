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
@Table(name = "CompanyProfile")
@EntityListeners(AuditingEntityListener.class)
public class CompanyProfileModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_profile_id")
    @JsonProperty("company_profile_id")
    private Long companyProfileId;

    @NotBlank(message = "Company Name cannot be empty")
    @Column(name = "company_name", unique = true)
    @JsonProperty("company_name")
    private String companyName;
    
    @Column(name = "logo_url", unique = true)
    @JsonProperty("logo_url")
    private String logoUrl;

    @Column(name = "created_at", updatable = false)
    @JsonProperty("created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @JsonProperty("updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

}
