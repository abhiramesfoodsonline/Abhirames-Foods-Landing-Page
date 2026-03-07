package com.admin.backend.repositories;

import com.admin.backend.models.ShippingPolicyModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShippingPolicyRepository extends JpaRepository<ShippingPolicyModel, Long> {
    
}
