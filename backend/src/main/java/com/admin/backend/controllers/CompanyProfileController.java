package com.admin.backend.controllers;

import com.admin.backend.models.CompanyProfileModel;
import com.admin.backend.services.CompanyProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/company-profile")
public class CompanyProfileController {
    
    
    @Autowired
    private CompanyProfileService companyProfileService;
    
    
    @PostMapping
    ResponseEntity<CompanyProfileModel> createCompanyProfile(@Valid @RequestBody CompanyProfileModel request){
        return new ResponseEntity<>(companyProfileService.createCompanyProfile(request), HttpStatus.OK);
    }
    
    @GetMapping
    ResponseEntity<CompanyProfileModel> fetchCompanyProfile(){
        return new ResponseEntity<>(companyProfileService.fetchCompanyProfile(), HttpStatus.OK);
    }
    
    @PutMapping
    ResponseEntity<CompanyProfileModel> updateCompanyProfile(@Valid @RequestBody CompanyProfileModel updatedCompanyProfileModel) {
        return new ResponseEntity<>(companyProfileService.updateCompanyProfile(updatedCompanyProfileModel), HttpStatus.OK);
    }
    
    @DeleteMapping
    ResponseEntity<String> deleteCompanyProfile(){
        return new ResponseEntity<>(companyProfileService.deleteCompanyProfile(), HttpStatus.OK);
    }
}
