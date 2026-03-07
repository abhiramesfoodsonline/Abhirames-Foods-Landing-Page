package com.admin.backend.repositories;


import com.admin.backend.models.RefundPolicyModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefundPolicyRepository extends JpaRepository<RefundPolicyModel, Long> {
    
}
