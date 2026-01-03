package com.admin.backend.services;

import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.SocialMediaLinksModel;
import com.admin.backend.repositories.SocialMediaLinksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SocialMediaLinksService {
    @Autowired
    private SocialMediaLinksRepository socialMediaLinksRepository;
    
    public SocialMediaLinksModel createSocialMediaLinks(SocialMediaLinksModel socialMediaLinksModel){
        if (socialMediaLinksRepository.count() > 0){
            throw new ResourceConflictException("Social media already exists");
        }
        return socialMediaLinksRepository.save(socialMediaLinksModel);
    }
    
    public SocialMediaLinksModel fetchSocialMedia(){
        
        List<SocialMediaLinksModel> socialMedia = socialMediaLinksRepository.findAll();
        if (socialMedia.isEmpty()){
            throw new ResourceNotFoundException("Provided social media not found!");
        }

        return socialMedia.get(0);
    }


     public SocialMediaLinksModel updateSocialMediaLinks(SocialMediaLinksModel updatedSocialMediaLinksModel){
         if (updatedSocialMediaLinksModel == null || updatedSocialMediaLinksModel.getInstagram() == null || updatedSocialMediaLinksModel.getFacebook() == null || updatedSocialMediaLinksModel.getTwitter() == null || updatedSocialMediaLinksModel.getWhatsapp() == null) {
             throw new IllegalArgumentException("One or more required fields are empty or null.");
         }

         SocialMediaLinksModel existingSocialMediaLinks = socialMediaLinksRepository
                 .findAll()
                 .stream()
                 .findFirst()
                 .orElse(new SocialMediaLinksModel());

         existingSocialMediaLinks.setInstagram(updatedSocialMediaLinksModel.getInstagram());
         existingSocialMediaLinks.setFacebook(updatedSocialMediaLinksModel.getFacebook());
         existingSocialMediaLinks.setTwitter(updatedSocialMediaLinksModel.getTwitter());
         existingSocialMediaLinks.setWhatsapp(updatedSocialMediaLinksModel.getWhatsapp());
         
        return socialMediaLinksRepository.save(existingSocialMediaLinks);
    }
    
    public String deleteSocialMediaLinks(){
        SocialMediaLinksModel existingSocialMedia = fetchSocialMedia();
        socialMediaLinksRepository.delete(existingSocialMedia);
        return "Social media link deleted successfully.";
    }
}
