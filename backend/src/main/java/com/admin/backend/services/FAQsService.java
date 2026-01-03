package com.admin.backend.services;

import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.models.FAQsModel;
import com.admin.backend.repositories.FAQsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FAQsService {
    @Autowired
    private FAQsRepository faqsRepository;
    
    public FAQsModel createFAQs(FAQsModel faQsModel){
        if (isQuestionPresent(faQsModel.getQuestion())){
            throw new ResourceConflictException("Question already exists.");
        }
        return faqsRepository.save(faQsModel);
    }
    
    public List<FAQsModel> fetchAllFAQs(){
        if (faqsRepository.findAll().isEmpty()){
            throw new ResourceConflictException("FAQs not found.");
        }
        return faqsRepository.findAll();
    }
    
    public FAQsModel fetchFAQsById(Long faqId){
        if (faqId == null){
            throw new IllegalArgumentException("FAQs id cannot be empty.");
        }
        if (faqsRepository.findByFaqId(faqId) == null){
            throw new ResourceConflictException("FAQs not found.");
        }
        return faqsRepository.findByFaqId(faqId);
    }
    
    public boolean isQuestionPresent(String question){
        if (question == null){
            throw new IllegalArgumentException("Question cannot be empty.");
        }
        if (faqsRepository.existsByQuestion(question)){
            throw new ResourceConflictException("Question already exists.");
        }
        return faqsRepository.existsByQuestion(question);
    }
    
    public FAQsModel updateFAQs(FAQsModel faQsModel, Long faqId){
        if (faQsModel == null || faQsModel.getQuestion() == null || faQsModel.getAnswer() == null){
            throw new IllegalArgumentException("FAQs cannot be empty.");
        }
        FAQsModel existingFAQs = fetchFAQsById(faqId);
        if (existingFAQs == null){
            throw new ResourceConflictException("FAQs not found.");
        }
        existingFAQs.setQuestion(faQsModel.getQuestion());
        existingFAQs.setAnswer(faQsModel.getAnswer());
        existingFAQs.setUpdatedAt(faQsModel.getUpdatedAt());
        
        return faqsRepository.save(faQsModel);
    }
    
    public String deleteFAQs(Long faqId){
        if (faqId == null){
            throw new IllegalArgumentException("FAQs id cannot be empty.");
        }
        FAQsModel existingFAQs = fetchFAQsById(faqId);
        if (existingFAQs == null){
            throw new ResourceConflictException("FAQs not found.");
        }
        faqsRepository.deleteById(faqId);
        return "Question deleted successfully.";
    }
}
