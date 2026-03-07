package com.admin.backend.services;

import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.PrivacyPolicyModel;
import com.admin.backend.repositories.PrivacyPolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class PrivacyPolicyService {

    @Autowired
    private PrivacyPolicyRepository privacyPolicyRepository;

    public PrivacyPolicyModel createPrivacyPolicy(PrivacyPolicyModel privacyPolicyModel){
        if (privacyPolicyRepository.count() > 0){
            throw new ResourceConflictException("Policy already exists. Duplicate policy creation is not allowed.");
        }
        return privacyPolicyRepository.save(privacyPolicyModel);
    }

    public PrivacyPolicyModel fetchPrivacyPolicy(){
        if (privacyPolicyRepository.findAll().isEmpty()){
            throw new ResourceNotFoundException("Privacy policy not found. Please create one.");
        }
        return privacyPolicyRepository.findAll().getFirst();
    }

    public PrivacyPolicyModel updatePrivacyPolicy(PrivacyPolicyModel privacyPolicyModel){
        if (privacyPolicyModel == null || privacyPolicyModel.getDescription() == null){
            throw new IllegalArgumentException("One or more required fields are empty or null.");
        }
        PrivacyPolicyModel existingPrivacyPolicyModel = fetchPrivacyPolicy();
        if (existingPrivacyPolicyModel == null){
            throw new ResourceConflictException("Unable to update privacy policy. No record exists, please create one.");
        }

        existingPrivacyPolicyModel.setDescription(privacyPolicyModel.getDescription());
        existingPrivacyPolicyModel.setUpdatedAt(LocalDateTime.now());

        return privacyPolicyRepository.save(privacyPolicyModel);
    }

    public String deletePrivacyPolicy(){
        if(fetchPrivacyPolicy() == null){
            throw new ResourceNotFoundException("Privacy policy not found to delete.");
        }
        privacyPolicyRepository.delete(fetchPrivacyPolicy());
        return "Privacy policy deleted successfully.";
    }

}
