package com.admin.backend.controllers;

import com.admin.backend.models.FAQsModel;
import com.admin.backend.services.FAQsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faqs")
public class FAQsController {

    @Autowired
    private FAQsService faqsService;
    
    @PostMapping
    ResponseEntity<FAQsModel> createFAQs(@RequestBody FAQsModel faQsModel){
        return new ResponseEntity<>(faqsService.createFAQs(faQsModel), HttpStatus.OK);
    }
    
    @GetMapping
    ResponseEntity<List<FAQsModel>> fetchFAQs(){
        return new ResponseEntity<>(faqsService.fetchAllFAQs(), HttpStatus.OK);
    }

    @PutMapping
    ResponseEntity<FAQsModel> updateFAQs(@RequestBody FAQsModel updatedFAQsModel, @RequestParam Long faqId) {
        return new ResponseEntity<>(faqsService.updateFAQs(updatedFAQsModel, faqId), HttpStatus.OK);
    }

    @DeleteMapping
    ResponseEntity<String> deleteFAQs(@RequestParam Long faqId){
        return new ResponseEntity<>(faqsService.deleteFAQs(faqId), HttpStatus.OK);
    }
}
