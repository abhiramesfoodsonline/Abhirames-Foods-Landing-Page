package com.admin.backend.controllers;

import com.admin.backend.models.SocialMediaLinksModel;
import com.admin.backend.services.SocialMediaLinksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/social-media")
public class SocialMediaLinksController {
    
    
    @Autowired
    private SocialMediaLinksService socialMediaLinksService;

    
    @PostMapping
    ResponseEntity<SocialMediaLinksModel> createSocialMediaLinks(@RequestBody SocialMediaLinksModel socialMediaLinksModel){
        return new ResponseEntity<>(socialMediaLinksService.createSocialMediaLinks(socialMediaLinksModel), HttpStatus.OK);
    }

    @GetMapping
    ResponseEntity<SocialMediaLinksModel> fetchSocialMediaLinks(){
        return new ResponseEntity<>(socialMediaLinksService.fetchSocialMedia(), HttpStatus.OK);
    }
    

    @PutMapping
    ResponseEntity<SocialMediaLinksModel> updateSocialMediaLink(@RequestBody SocialMediaLinksModel updatedSocialMediaLinksModel){
        return new ResponseEntity<>(socialMediaLinksService.updateSocialMediaLinks(updatedSocialMediaLinksModel), HttpStatus.OK);
    }

    @DeleteMapping
    ResponseEntity<String> deleteSocialMediaLinks(){
        return new ResponseEntity<>(socialMediaLinksService.deleteSocialMediaLinks(), HttpStatus.OK);
    }

}
