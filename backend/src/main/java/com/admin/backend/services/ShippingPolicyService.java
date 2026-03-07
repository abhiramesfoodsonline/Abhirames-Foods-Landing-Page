package com.admin.backend.services;

import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.ShippingPolicyModel;
import com.admin.backend.repositories.ShippingPolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ShippingPolicyService {
    
    
    @Autowired
    private ShippingPolicyRepository shippingPolicyRepository;
    
    public ShippingPolicyModel fetchShippingPolicyModel(){
        if (shippingPolicyRepository.findAll().isEmpty()){
            throw new ResourceNotFoundException("Shipping policy not found. Please create one.");
        }
        return shippingPolicyRepository.findAll().getFirst();
    }

    public ShippingPolicyModel createShippingPolicyModel(ShippingPolicyModel shippingPolicyModel){
        if (shippingPolicyRepository.count() > 0){
            throw new ResourceConflictException("Shipping policy already exists. Duplicate shipping policy creation is not allowed.");
        }
        return shippingPolicyRepository.save(shippingPolicyModel);
    }

    public ShippingPolicyModel updateShippingPolicyModel(ShippingPolicyModel shippingPolicyModel){
        if (shippingPolicyModel == null || shippingPolicyModel.getDescription() == null){
            throw new IllegalArgumentException("One or more required fields are empty or null.");
        }
        ShippingPolicyModel existingShippingPolicyModel = fetchShippingPolicyModel();
        if (existingShippingPolicyModel == null){
            throw new ResourceConflictException("Shipping policy. No record exists, please create one.");
        }

        existingShippingPolicyModel.setDescription(shippingPolicyModel.getDescription());
        existingShippingPolicyModel.setUpdatedAt(LocalDateTime.now());
        
        return shippingPolicyRepository.save(shippingPolicyModel);
    }
    
    public String deleteShippingPolicyModel(){
        if(fetchShippingPolicyModel() == null){
            throw new ResourceNotFoundException("Shipping policy not found to delete.");
        }
        shippingPolicyRepository.delete(fetchShippingPolicyModel());
        return "Shipping policy deleted successfully.";
    }
    
}
