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
@Table(name = "FAQs")
@EntityListeners(AuditingEntityListener.class)
public class FAQsModel {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "faq_id")
    @JsonProperty("faq_id")
    private Long faqId;

    @NotBlank(message = "Question cannot be empty")
    @Column(name = "question", unique = true)
    private String question;

    @NotBlank(message = "Answer cannot be empty")
    @Column(name = "answer")
    private String answer;

    @JsonProperty("created_at")
    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
