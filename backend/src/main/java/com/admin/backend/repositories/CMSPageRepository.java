package com.admin.backend.repositories;

import com.admin.backend.models.CMSPageModel;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CMSPageRepository extends JpaRepository<CMSPageModel, Long> {
    boolean existsBySlug (String slug);

    CMSPageModel findByTitle(String title);

    Optional<CMSPageModel> findBySlug(String slug);
}
