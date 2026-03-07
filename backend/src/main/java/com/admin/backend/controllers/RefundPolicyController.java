package com.admin.backend.controllers;

import com.admin.backend.models.RefundPolicyModel;
import com.admin.backend.services.RefundPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/refund-policy")
public class RefundPolicyController {
    
    
    @Autowired
    private RefundPolicyService refundPolicyService;
    

    @PostMapping
    ResponseEntity<RefundPolicyModel> createRefundPolicy(@RequestBody RefundPolicyModel refundPolicyModel){
        return new ResponseEntity<>(refundPolicyService.createRefundPolicy(refundPolicyModel), HttpStatus.OK);
    }

    @GetMapping
    ResponseEntity<RefundPolicyModel> fetchRefundPolicy(){
        return new ResponseEntity<>(refundPolicyService.fetchRefundPolicy(), HttpStatus.OK);
    }

    @PutMapping
    ResponseEntity<RefundPolicyModel> updateRefundPolicy(@RequestBody RefundPolicyModel updatedRefundPolicyModel){
        return new ResponseEntity<>(refundPolicyService.updateRefundPolicy(updatedRefundPolicyModel), HttpStatus.OK);
    }

    @DeleteMapping
    ResponseEntity<String> deleteRefundPolicy(){
        return new ResponseEntity<>(refundPolicyService.deleteRefundPolicy(), HttpStatus.OK);
    }
}
