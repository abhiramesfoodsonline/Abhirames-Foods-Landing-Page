package com.admin.backend.repositories;

import com.admin.backend.models.PrivacyPolicyModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivacyPolicyRepository extends JpaRepository<PrivacyPolicyModel, Long> {
}
