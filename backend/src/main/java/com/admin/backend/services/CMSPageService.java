package com.admin.backend.services;

import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.CMSPageModel;
import com.admin.backend.repositories.CMSPageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CMSPageService {
    
    @Autowired
    private CMSPageRepository cmsPageRepository;


    public CMSPageModel createCMS(CMSPageModel cmsPageModel) {
        if (cmsPageRepository.existsBySlug(cmsPageModel.getTitle())){
            throw new ResourceConflictException(cmsPageModel.getTitle() + " already exists! Try update instead.");
        }
        return cmsPageRepository.save(cmsPageModel);
    }

    public List<CMSPageModel> fetchCMS(){
        List<CMSPageModel> aboutUsList = cmsPageRepository.findAll();
        if (aboutUsList.isEmpty()){
            throw new ResourceNotFoundException("CMS not found.");
        }
        return aboutUsList;
    }

    public CMSPageModel upsertCMSPage(CMSPageModel page) {
        Optional<CMSPageModel> existing =
                cmsPageRepository.findBySlug(page.getSlug());

        CMSPageModel entity = existing.orElseGet(CMSPageModel::new);

        entity.setSlug(page.getSlug());
        entity.setTitle(page.getTitle());
        entity.setContent(page.getContent());
        entity.setUpdatedAt(LocalDateTime.now());

        if (entity.getCreatedAt() == null) {
            entity.setCreatedAt(LocalDateTime.now());
        }

        return cmsPageRepository.save(entity);
    }


//    public String deleteCMS(){
//        CMSPageModel existingAboutUs = fetchAboutUs();
//        CMSPageRepository.delete(existingAboutUs);
//        return "About Us deleted successfully.";
//    }
}
