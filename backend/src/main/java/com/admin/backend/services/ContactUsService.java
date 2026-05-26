package com.admin.backend.services;

import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.ContactUsModel;
import com.admin.backend.repositories.ContactUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactUsService {
    @Autowired
    private ContactUsRepository contactUsRepository;
    
    
    public ContactUsModel createContactUs(ContactUsModel contactUs){
        if (contactUsRepository.count() > 0){
            throw new ResourceConflictException("Contact Us already exists. Try update instead.");
        }
        return contactUsRepository.save(contactUs);
    }

    public ContactUsModel fetchContactUs(){
        if (contactUsRepository.findAll().isEmpty()){
            throw new ResourceNotFoundException("Contact Us not found.");
        }
        
        return contactUsRepository.findAll().get(0);
    }
    
    public ContactUsModel updateContactUs(ContactUsModel contactUs) {
        if (contactUs == null || contactUs.getAddress() == null || contactUs.getEmailId() == null || contactUs.getPhoneNumber() == null){
            throw new IllegalArgumentException("Fields cannot be empty.");
        }
        ContactUsModel existingContactUs = contactUsRepository.
                findAll()
                .stream()
                .findFirst()
                .orElse(new ContactUsModel());
        
        existingContactUs.setAddress(contactUs.getAddress());
        existingContactUs.setEmailId(contactUs.getEmailId());
        existingContactUs.setPhoneNumber(contactUs.getPhoneNumber());
        existingContactUs.setUpdatedAt(contactUs.getUpdatedAt());

        return contactUsRepository.save(existingContactUs);
    }

    public String deleteContactUs(){
        if (fetchContactUs() == null){
            throw new ResourceNotFoundException("No contact us found to delete!.");
        }
        contactUsRepository.delete(fetchContactUs());
        return "Contact Us deleted successfully.";
    }
}
