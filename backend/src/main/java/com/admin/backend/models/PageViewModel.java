package com.admin.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;


@Data
@Entity
@Table(name = "PageView")
@EntityListeners(AuditingEntityListener.class)
public class PageViewModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "path")
    @JsonProperty("path")
    private String path;


    private LocalDateTime viewedAt;

}
