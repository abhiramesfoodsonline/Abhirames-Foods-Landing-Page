package com.admin.backend.controllers;

import com.admin.backend.models.ReturnAndRefundModel;
import com.admin.backend.services.ReturnAndRefundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/return-refund")
public class ReturnAndRefundController {
    
    
    @Autowired
    private ReturnAndRefundService returnAndRefundService;
    

    @PostMapping
    ResponseEntity<ReturnAndRefundModel> createReturnAndRefund(@RequestBody ReturnAndRefundModel returnAndRefundModel){
        return new ResponseEntity<>(returnAndRefundService.createReturnAndRefundPolicy(returnAndRefundModel), HttpStatus.OK);
    }

    @GetMapping
    ResponseEntity<ReturnAndRefundModel> fetchReturnAndRefund(){
        return new ResponseEntity<>(returnAndRefundService.fetchReturnAndRefundPolicy(), HttpStatus.OK);
    }

    @PutMapping
    ResponseEntity<ReturnAndRefundModel> updateReturnAndRefund(@RequestBody ReturnAndRefundModel updatedReturnAndRefundModel){
        return new ResponseEntity<>(returnAndRefundService.updateReturnAndRefundPolicy(updatedReturnAndRefundModel), HttpStatus.OK);
    }

    @DeleteMapping
    ResponseEntity<String> deleteReturnAndRefund(){
        return new ResponseEntity<>(returnAndRefundService.deleteReturnAndRefundPolicy(), HttpStatus.OK);
    }
}
