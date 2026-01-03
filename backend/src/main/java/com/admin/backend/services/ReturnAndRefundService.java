package com.admin.backend.services;

import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.ReturnAndRefundModel;
import com.admin.backend.repositories.ReturnAndRefundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class ReturnAndRefundService {
    
    
    @Autowired
    private ReturnAndRefundRepository returnAndRefundRepository;
    
    public ReturnAndRefundModel createReturnAndRefundPolicy(ReturnAndRefundModel returnAndRefundModel){
        if (returnAndRefundRepository.count() > 0){
            throw new ResourceConflictException("Policy already exists. Duplicate policy creation is not allowed.");
        }
        return returnAndRefundRepository.save(returnAndRefundModel);
    }

    public ReturnAndRefundModel fetchReturnAndRefundPolicy(){
        if (returnAndRefundRepository.findAll().isEmpty()){
            throw new ResourceNotFoundException("Return and refund policy not found. Please create one.");
        }
        return returnAndRefundRepository.findAll().getFirst();
    }
    
    public ReturnAndRefundModel updateReturnAndRefundPolicy(ReturnAndRefundModel returnAndRefundModel){
        if (returnAndRefundModel == null || returnAndRefundModel.getDescription() == null){
            throw new IllegalArgumentException("One or more required fields are empty or null.");
        }
        ReturnAndRefundModel existingReturnAndRefundModel = fetchReturnAndRefundPolicy();
        if (existingReturnAndRefundModel == null){
            throw new ResourceConflictException("Unable to update Return and Refund policy. No record exists, please create one.");
        }

        existingReturnAndRefundModel.setDescription(returnAndRefundModel.getDescription());
        existingReturnAndRefundModel.setUpdatedAt(LocalDateTime.now());
        
        return returnAndRefundRepository.save(returnAndRefundModel);
    }
    
    public String deleteReturnAndRefundPolicy(){
        if(fetchReturnAndRefundPolicy() == null){
            throw new ResourceNotFoundException("Return and refund policy not found to delete.");
        }
        returnAndRefundRepository.delete(fetchReturnAndRefundPolicy());
        return "Return and refund policy deleted successfully.";
    }
    
}
