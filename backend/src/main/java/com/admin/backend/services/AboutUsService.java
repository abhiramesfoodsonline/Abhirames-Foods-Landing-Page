package com.admin.backend.services;

import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.AboutUsModel;
import com.admin.backend.repositories.AboutUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AboutUsService {
    
    
    @Autowired
    private AboutUsRepository aboutUsRepository;
    
    public AboutUsModel createAboutUs(AboutUsModel aboutUs) {
        if (aboutUsRepository.count() > 0){
            throw new ResourceConflictException("About Us already exists! Try update instead.");
        }
        return aboutUsRepository.save(aboutUs);
    }

    public AboutUsModel fetchAboutUs(){
        List<AboutUsModel> aboutUsList = aboutUsRepository.findAll();
        if (aboutUsList.isEmpty()){
            throw new ResourceNotFoundException("About Us not found.");
        }
        return aboutUsList.get(0);
    }
    
    public AboutUsModel updateAboutUs(AboutUsModel aboutUs){
        AboutUsModel existingAboutUs = fetchAboutUs();
        existingAboutUs.setDescription(aboutUs.getDescription());
        
        return aboutUsRepository.save(existingAboutUs);
    }

    public String deleteAboutUs(){
        AboutUsModel existingAboutUs = fetchAboutUs();
        aboutUsRepository.delete(existingAboutUs);
        return "About Us deleted successfully.";
    }
}
