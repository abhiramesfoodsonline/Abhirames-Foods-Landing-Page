package com.admin.backend.repositories;

import com.admin.backend.models.FAQsModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FAQsRepository extends JpaRepository<FAQsModel, Long> {
    Boolean existsByQuestion(String question);

    FAQsModel findByFaqId(Long faqId);
}
