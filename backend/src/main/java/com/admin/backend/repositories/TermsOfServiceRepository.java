package com.admin.backend.repositories;

import com.admin.backend.models.TermsOfServiceModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TermsOfServiceRepository extends JpaRepository<TermsOfServiceModel, Long> {
}
