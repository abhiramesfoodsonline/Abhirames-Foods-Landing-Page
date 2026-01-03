package com.admin.backend.services;

import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.CompanyProfileModel;
import com.admin.backend.repositories.CompanyProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyProfileService {
    
    
    @Autowired
    private CompanyProfileRepository companyProfileRepository;
    

    public CompanyProfileModel createCompanyProfile(CompanyProfileModel companyProfile) {
        if (companyProfileRepository.count() > 0){
            throw new ResourceConflictException("Company profile already exists! Try update instead.");
        }
        return companyProfileRepository.save(companyProfile);
    }

    public CompanyProfileModel fetchCompanyProfile(){
        List<CompanyProfileModel> companyProfileList = companyProfileRepository.findAll();
        if (companyProfileList.isEmpty()){
            throw new ResourceNotFoundException("Company profile not found.");
        }
        return companyProfileList.get(0);
    }

    public CompanyProfileModel updateCompanyProfile(CompanyProfileModel companyProfile){
        CompanyProfileModel existingCompanyProfile =
                companyProfileRepository.findAll()
                        .stream()
                        .findFirst()
                        .orElse(new CompanyProfileModel());
        
        existingCompanyProfile.setCompanyName(companyProfile.getCompanyName());
        existingCompanyProfile.setLogoUrl(companyProfile.getLogoUrl());

        return companyProfileRepository.save(existingCompanyProfile);
    }

    public String deleteCompanyProfile(){
        CompanyProfileModel existingCompanyProfile = fetchCompanyProfile();
        companyProfileRepository.delete(existingCompanyProfile);
        return "Company Profile deleted successfully.";
    }
}
