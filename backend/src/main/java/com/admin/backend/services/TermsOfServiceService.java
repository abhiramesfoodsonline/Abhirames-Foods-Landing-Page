package com.admin.backend.services;

import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.TermsOfServiceModel;
import com.admin.backend.repositories.TermsOfServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TermsOfServiceService {

    @Autowired
    private TermsOfServiceRepository termsOfServiceRepository;

    public TermsOfServiceModel createTermsOfService(TermsOfServiceModel termsOfServiceModel){
        if (termsOfServiceRepository.count() > 0){
            throw new ResourceConflictException("Terms of Service already exists. Duplicate terms of service creation is not allowed.");
        }
        return termsOfServiceRepository.save(termsOfServiceModel);
    }

    public TermsOfServiceModel fetchTermsOfService(){
        if (termsOfServiceRepository.findAll().isEmpty()){
            throw new ResourceNotFoundException("Terms of Service not found. Please create one.");
        }
        return termsOfServiceRepository.findAll().getFirst();
    }

    public TermsOfServiceModel updateTermsOfService(TermsOfServiceModel termsOfServiceModel){
        if (termsOfServiceModel == null || termsOfServiceModel.getDescription() == null){
            throw new IllegalArgumentException("One or more required fields are empty or null.");
        }
        TermsOfServiceModel existingTermsOfServiceModel = fetchTermsOfService();
        if (existingTermsOfServiceModel == null){
            throw new ResourceConflictException("Terms of Service. No record exists, please create one.");
        }

        existingTermsOfServiceModel.setDescription(termsOfServiceModel.getDescription());
        existingTermsOfServiceModel.setUpdatedAt(LocalDateTime.now());

        return termsOfServiceRepository.save(termsOfServiceModel);
    }

    public String deleteTermsOfService(){
        if(fetchTermsOfService() == null){
            throw new ResourceNotFoundException("Terms of Service not found to delete.");
        }
        termsOfServiceRepository.delete(fetchTermsOfService());
        return "Terms of Service deleted successfully.";
    }

}
