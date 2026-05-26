package com.admin.backend.services;

import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.RefundPolicyModel;
import com.admin.backend.repositories.RefundPolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class RefundPolicyService {
    
    
    @Autowired
    private RefundPolicyRepository refundPolicyRepository;
    
    public RefundPolicyModel createRefundPolicy(RefundPolicyModel refundPolicyModel){
        if (refundPolicyRepository.count() > 0){
            throw new ResourceConflictException("Refund policy already exists. Duplicate refund policy creation is not allowed.");
        }
        return refundPolicyRepository.save(refundPolicyModel);
    }

    public RefundPolicyModel fetchRefundPolicy(){
        if (refundPolicyRepository.findAll().isEmpty()){
            throw new ResourceNotFoundException("Refund policy not found. Please create one.");
        }
        return refundPolicyRepository.findAll().get(0);
    }
    
    public RefundPolicyModel updateRefundPolicy(RefundPolicyModel refundPolicyModel){
        if (refundPolicyModel == null || refundPolicyModel.getDescription() == null){
            throw new IllegalArgumentException("One or more required fields are empty or null.");
        }
        RefundPolicyModel existingRefundPolicyModel = fetchRefundPolicy();
        if (existingRefundPolicyModel == null){
            throw new ResourceConflictException("Refund policy. No record exists, please create one.");
        }

        existingRefundPolicyModel.setDescription(refundPolicyModel.getDescription());
        existingRefundPolicyModel.setUpdatedAt(LocalDateTime.now());
        
        return refundPolicyRepository.save(refundPolicyModel);
    }
    
    public String deleteRefundPolicy(){
        if(fetchRefundPolicy() == null){
            throw new ResourceNotFoundException("Refund policy not found to delete.");
        }
        refundPolicyRepository.delete(fetchRefundPolicy());
        return "Refund policy deleted successfully.";
    }
    
}
