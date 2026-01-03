package com.admin.backend.controllers;

import com.admin.backend.models.ContactUsModel;
import com.admin.backend.services.ContactUsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact-us")
public class ContactUsController {
    
    
    @Autowired
    private ContactUsService contactUsService;
    
    
    @PostMapping
    ResponseEntity<ContactUsModel> createContactUs(@RequestBody ContactUsModel contactUsModel){
        return new ResponseEntity<>(contactUsService.createContactUs(contactUsModel), HttpStatus.OK);
    }
    
    @GetMapping
    ResponseEntity<ContactUsModel> fetchContactUs() {
        return new ResponseEntity<>(contactUsService.fetchContactUs(), HttpStatus.OK);
    }
    
    @PutMapping
    ResponseEntity<ContactUsModel> updateContactUs(@RequestBody ContactUsModel updatedContactUs){
        return new ResponseEntity<>(contactUsService.updateContactUs(updatedContactUs), HttpStatus.OK);
    }
    
    @DeleteMapping
    ResponseEntity<String> deleteContactUs(){
        return new ResponseEntity<>(contactUsService.deleteContactUs(), HttpStatus.OK);
    }
}
