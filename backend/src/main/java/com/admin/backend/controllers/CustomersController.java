package com.admin.backend.controllers;

import com.admin.backend.models.CustomersModel;
import com.admin.backend.services.CustomersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomersController {
    @Autowired
    private CustomersService customersService;

    @GetMapping
    public ResponseEntity<List<CustomersModel>> fetchAllCustomers(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime createdAtAfter) {
        List<CustomersModel> customers;

        if (createdAtAfter != null) {
            customers = customersService.fetchAllCustomers(createdAtAfter);
        } else {
            customers = customersService.fetchAllCustomers();
        }

        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CustomersModel> createCustomer(@RequestBody CustomersModel customersModel) {
        return new ResponseEntity<>(customersService.createCustomer(customersModel), HttpStatus.OK);
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<Void> deleteCustomerById(@PathVariable Long customerId) {
        customersService.deleteCustomerById(customerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
