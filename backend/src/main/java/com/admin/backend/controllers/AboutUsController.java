package com.admin.backend.controllers;

import com.admin.backend.models.AboutUsModel;
import com.admin.backend.services.AboutUsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/about-us")
public class AboutUsController {
    
    @Autowired
    private AboutUsService aboutUsService;
    
    
    @PostMapping
    ResponseEntity<AboutUsModel> createAboutUs(@Valid @RequestBody AboutUsModel request){
        return new ResponseEntity<>(aboutUsService.createAboutUs(request), HttpStatus.OK);
    }
    
    @GetMapping
    ResponseEntity<AboutUsModel> fetchAboutUs(){
        return new ResponseEntity<>(aboutUsService.fetchAboutUs(), HttpStatus.OK);
    }
    
    @PutMapping
    ResponseEntity<AboutUsModel> updateAboutUs(@Valid @RequestBody AboutUsModel updatedAboutUsModel) {
        return new ResponseEntity<>(aboutUsService.updateAboutUs(updatedAboutUsModel), HttpStatus.OK);
    }
    
    @DeleteMapping
    ResponseEntity<String> deleteAboutUs(){
        return new ResponseEntity<>(aboutUsService.deleteAboutUs(), HttpStatus.OK);
    }
}
