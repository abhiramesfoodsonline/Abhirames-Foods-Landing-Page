package com.admin.backend.repositories;

import com.admin.backend.models.CompanyProfileModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyProfileRepository extends JpaRepository<CompanyProfileModel, Long> {
    
}
