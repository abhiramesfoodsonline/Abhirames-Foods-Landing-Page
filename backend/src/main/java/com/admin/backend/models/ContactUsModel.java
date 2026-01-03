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
@Table(name = "ContactUs")
@EntityListeners(AuditingEntityListener.class)
public class ContactUsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contact_us_id")
    private Long contactUsId;

    @NotBlank(message = "Phone Number cannot be empty")
    @Column(name = "phone_number")
    @JsonProperty("phone_number")
    private String phoneNumber;

    @NotBlank(message = "Email Id cannot be empty")
    @Column(name = "email_id")
    @JsonProperty("email_id")
    private String emailId;

    @NotBlank(message = "Address cannot be empty")
    @Column(name = "address")
    @JsonProperty("address")
    private String address;

    @Column(name = "created_at", updatable = false)
    @JsonProperty("created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @JsonProperty("updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

}
