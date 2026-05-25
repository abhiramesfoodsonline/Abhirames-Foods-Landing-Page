package com.admin.backend.controllers;

import com.admin.backend.models.CMSPageModel;
import com.admin.backend.services.CMSPageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// TODO
// Temporarily blocking CMS. Requested by Client.
// @RestController
// @RequestMapping("/api/cms")
public class CMSPageController {
    
    @Autowired
    private CMSPageService cmsPageService;
    
    
    @PostMapping
    ResponseEntity<CMSPageModel> createCMS(@Valid @RequestBody CMSPageModel request){
        return new ResponseEntity<>(cmsPageService.createCMS(request), HttpStatus.OK);
    }
    
    @GetMapping
    ResponseEntity<List<CMSPageModel>> fetchCMS(){
        return new ResponseEntity<>(cmsPageService.fetchCMS(), HttpStatus.OK);
    }
    
    @PutMapping("/{slug}")
    ResponseEntity<CMSPageModel> updateCMS(@PathVariable String slug, @Valid @RequestBody CMSPageModel updatedCMSPageModel) {
        updatedCMSPageModel.setSlug(slug);
        return new ResponseEntity<>(cmsPageService.upsertCMSPage(updatedCMSPageModel), HttpStatus.OK);
    }
    
//    @DeleteMapping
//    ResponseEntity<String> deleteCMS(){
//        return new ResponseEntity<>(cmsPa geService.de(), HttpStatus.OK);
//    }
}
