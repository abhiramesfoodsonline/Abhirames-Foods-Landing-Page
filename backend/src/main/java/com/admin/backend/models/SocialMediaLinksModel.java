package com.admin.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@Data
@Entity
@Table(name = "SocialMediaLinks")
@EntityListeners(AuditingEntityListener.class)
public class SocialMediaLinksModel {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "social_media_link_id")
    @JsonProperty("social_media_link_id")
    private Long socialMediaLinkId;

    @NotBlank(message = "Instagram link name cannot be empty")
    @Column(name = "instagram", unique = true)
    @JsonProperty("instagram")
    private String instagram;

    @NotBlank(message = "Facebook link name cannot be empty")
    @Column(name = "facebook", unique = true)
    @JsonProperty("facebook")
    private String facebook;

    @NotBlank(message = "WhatsApp number name cannot be empty")
    @Column(name = "whatsapp", unique = true)
    @JsonProperty("whatsapp")
    private String whatsapp;
    
    @NotBlank(message = "Twitter link cannot be empty")
    @Column(name = "twitter", unique = true)
    @JsonProperty("twitter")
    private String twitter;


}
