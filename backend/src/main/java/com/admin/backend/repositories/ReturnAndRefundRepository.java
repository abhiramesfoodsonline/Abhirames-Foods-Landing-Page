package com.admin.backend.repositories;


import com.admin.backend.models.ReturnAndRefundModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReturnAndRefundRepository extends JpaRepository<ReturnAndRefundModel, Long> {
    
}
