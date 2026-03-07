package com.admin.backend.controllers;

import com.admin.backend.models.TermsOfServiceModel;
import com.admin.backend.services.TermsOfServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/terms-of-service")
public class TermsOfServiceController {


    @Autowired
    private TermsOfServiceService termsOfServiceService;


    @PostMapping
    ResponseEntity<TermsOfServiceModel> createRefundPolicy(@RequestBody TermsOfServiceModel refundPolicyModel){
        return new ResponseEntity<>(termsOfServiceService.createTermsOfService(refundPolicyModel), HttpStatus.OK);
    }

    @GetMapping
    ResponseEntity<TermsOfServiceModel> fetchRefundPolicy(){
        return new ResponseEntity<>(termsOfServiceService.fetchTermsOfService(), HttpStatus.OK);
    }

    @PutMapping
    ResponseEntity<TermsOfServiceModel> updateRefundPolicy(@RequestBody TermsOfServiceModel updatedTermsOfServiceModel){
        return new ResponseEntity<>(termsOfServiceService.updateTermsOfService(updatedTermsOfServiceModel), HttpStatus.OK);
    }

    @DeleteMapping
    ResponseEntity<String> deleteRefundPolicy(){
        return new ResponseEntity<>(termsOfServiceService.deleteTermsOfService(), HttpStatus.OK);
    }
}
