package com.admin.backend.controllers;

import com.admin.backend.models.ShippingPolicyModel;
import com.admin.backend.services.ShippingPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipping-policy")
public class ShippingPolicyController {
    
    
    @Autowired
    private ShippingPolicyService shippingPolicyService;
    

    @PostMapping
    ResponseEntity<ShippingPolicyModel> createShippingPolicy(@RequestBody ShippingPolicyModel shippingPolicyModel){
        return new ResponseEntity<>(shippingPolicyService.createShippingPolicyModel(shippingPolicyModel), HttpStatus.OK);
    }

    @GetMapping
    ResponseEntity<ShippingPolicyModel> fetchShippingPolicy(){
        return new ResponseEntity<>(shippingPolicyService.fetchShippingPolicyModel(), HttpStatus.OK);
    }

    @PutMapping
    ResponseEntity<ShippingPolicyModel> updateShippingPolicy(@RequestBody ShippingPolicyModel updatedShippingPolicyModel){
        return new ResponseEntity<>(shippingPolicyService.updateShippingPolicyModel(updatedShippingPolicyModel), HttpStatus.OK);
    }

    @DeleteMapping
    ResponseEntity<String> deleteShippingPolicy(){
        return new ResponseEntity<>(shippingPolicyService.deleteShippingPolicyModel(), HttpStatus.OK);
    }
}
