package com.admin.backend.repositories;

import com.admin.backend.models.SocialMediaLinksModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SocialMediaLinksRepository extends JpaRepository<SocialMediaLinksModel, Long> {
    
}
