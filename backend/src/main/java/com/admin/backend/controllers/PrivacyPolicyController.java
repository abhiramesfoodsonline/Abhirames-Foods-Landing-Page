package com.admin.backend.controllers;

import com.admin.backend.models.PrivacyPolicyModel;
import com.admin.backend.services.PrivacyPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/privacy-policy")
public class PrivacyPolicyController {


    @Autowired
    private PrivacyPolicyService privacyPolicyService;


    @PostMapping
    ResponseEntity<PrivacyPolicyModel> createPrivacyPolicy(@RequestBody PrivacyPolicyModel privacyPolicyModel){
        return new ResponseEntity<>(privacyPolicyService.createPrivacyPolicy(privacyPolicyModel), HttpStatus.OK);
    }

    @GetMapping
    ResponseEntity<PrivacyPolicyModel> fetchPrivacyPolicy(){
        return new ResponseEntity<>(privacyPolicyService.fetchPrivacyPolicy(), HttpStatus.OK);
    }

    @PutMapping
    ResponseEntity<PrivacyPolicyModel> updatePrivacyPolicy(@RequestBody PrivacyPolicyModel updatedPrivacyPolicyModel){
        return new ResponseEntity<>(privacyPolicyService.updatePrivacyPolicy(updatedPrivacyPolicyModel), HttpStatus.OK);
    }

    @DeleteMapping
    ResponseEntity<String> deletePrivacyPolicy(){
        return new ResponseEntity<>(privacyPolicyService.deletePrivacyPolicy(), HttpStatus.OK);
    }
}
