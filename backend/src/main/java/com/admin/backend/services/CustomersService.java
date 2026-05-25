package com.admin.backend.services;

import com.admin.backend.models.CustomersModel;
import com.admin.backend.repositories.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CustomersService {
    @Autowired
    private CustomersRepository customersRepository;

    public CustomersModel createCustomer(CustomersModel customersModel){
        return customersRepository.save(customersModel);
    }

    public List<CustomersModel> fetchAllCustomers(){
        return customersRepository.findAll();
    }

    public List<CustomersModel> fetchAllCustomers(LocalDateTime createdAtAfter){
        return customersRepository.findAllByCreatedAtAfter(createdAtAfter);
    }

    public void deleteCustomerById(Long customerId){
        customersRepository.deleteById(customerId);
    }
}
