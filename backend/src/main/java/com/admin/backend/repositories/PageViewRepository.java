package com.admin.backend.repositories;

import com.admin.backend.models.PageViewModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface PageViewRepository extends JpaRepository<PageViewModel, Long> {
    long countByViewedAtAfter(LocalDateTime date);
}