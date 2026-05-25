package com.admin.backend.services;

import com.admin.backend.dto.ChangePasswordRequest;
import com.admin.backend.exceptions.ResourceConflictException;
import com.admin.backend.exceptions.ResourceNotFoundException;
import com.admin.backend.models.AdminUsersModel;
import com.admin.backend.repositories.AdminUsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminUsersService {
    
    @Autowired
    private AdminUsersRepository adminUsersRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    
    public AdminUsersModel createAdminUser(AdminUsersModel adminUsersModel){        
        if (existsByUsername(adminUsersModel.getUsername())){
            throw new ResourceConflictException(adminUsersModel.getUsername() + " user already exists.");
        }  
        adminUsersModel.setPassword(passwordEncoder.encode(adminUsersModel.getPassword()));
        
        return adminUsersRepository.save(adminUsersModel);
    }

    public List<AdminUsersModel> fetchAllAdminUsers(){
        return adminUsersRepository.findAll();
    }
    
    public AdminUsersModel fetchAdminUserByAdminId(Long adminId){
        return adminUsersRepository.findById(adminId)
                .orElseThrow( () -> new ResourceNotFoundException("Admin user not found with id: " + adminId + "."));
    }

    public AdminUsersModel fetchAdminUserByUsername(String username){
        System.out.println("Message from AdminUsersService.java. 43. " + username);
        AdminUsersModel user = adminUsersRepository.findByUsername(username);
        System.out.println("Message from AdminUsersService.java. 45. " + user);
        if (user == null){
            throw new ResourceNotFoundException("Admin user not found with username: " + username + ".");
        }
        System.out.println(user);
        return user;
    }
    
    public List<AdminUsersModel> fetchAdminUsersByRole(String role) {
        List<AdminUsersModel> adminUsers = adminUsersRepository.findAllByRole(role);
        if (adminUsers == null || adminUsers.isEmpty()){
            throw new ResourceNotFoundException("Admin user not found with role: " + role + ".");
        }
        return adminUsers;
    }
    
    public List<AdminUsersModel> fetchAdminUserByCreatedAtAfter(LocalDateTime createdAtAfter){
        if (createdAtAfter == null){
            throw new IllegalArgumentException("Created after date cannot be empty.");
        }
        List<AdminUsersModel> adminUsers = adminUsersRepository.findAllByCreatedAtAfter(createdAtAfter);
        if (adminUsers == null || adminUsers.isEmpty()){
            throw new ResourceNotFoundException("No admin user found for the given date " + createdAtAfter + ".");
        }
        return adminUsers;
    }
    
    public List<AdminUsersModel> fetchAdminUserByCreatedAtBefore(LocalDateTime createdAtBefore){
        if (createdAtBefore == null){
            throw new IllegalArgumentException("Created before date cannot be empty.");
        }
        List<AdminUsersModel> adminUsers = adminUsersRepository.findAllByCreatedAtBefore(createdAtBefore);
        if (adminUsers == null || adminUsers.isEmpty()){
            throw new ResourceNotFoundException("No admin user found for the given date " + createdAtBefore + ".");
        }
        return adminUsers;
    }


    public boolean existsByUsername(String userName){
        return adminUsersRepository.existsByUsername(userName);
    }
    
    public void updateAdminUser(String username, ChangePasswordRequest request){
        if (request == null || username == null || request.getCurrentPassword() == null || request.getNewPassword() == null){
            throw new IllegalArgumentException("one or more fields are empty.");
        }

        AdminUsersModel existingAdminUserModel = fetchAdminUserByUsername(username);
        if (existingAdminUserModel == null){
            throw new ResourceNotFoundException("Admin user not found with username: " + username + ".");
        }
        System.out.println("DB Password = " + existingAdminUserModel.getPassword());
        System.out.println("Input Password = '" + request.getCurrentPassword() + "'");

        System.out.println(passwordEncoder.matches(request.getCurrentPassword(), existingAdminUserModel.getPassword()));

        if (!passwordEncoder.matches(request.getCurrentPassword(), existingAdminUserModel.getPassword())){
            throw new IllegalArgumentException("Current password is incorrect.");
        }

        existingAdminUserModel.setPassword(passwordEncoder.encode(request.getNewPassword()));
        
        adminUsersRepository.save(existingAdminUserModel);
    }

    public void updateAdminRole(String username, String role){
        if (username == null || role == null) {
            throw new IllegalArgumentException(username == null ? "Username" : "Role" + "is empty");
        }

        AdminUsersModel existingAdminUserModel = fetchAdminUserByUsername(username);
        if (existingAdminUserModel == null) {
            throw new ResourceNotFoundException("Admin not found with username: " + username + ".");
        }

        existingAdminUserModel.setRole(role);
        adminUsersRepository.save(existingAdminUserModel);

    }
    
//    public AdminUsersModel updateAdminUser(Long adminId, AdminUsersModel updatedAdminUserModel){
//        if (updatedAdminUserModel == null || updatedAdminUserModel.getUsername() == null || updatedAdminUserModel.getPassword() == null || updatedAdminUserModel.getRole() == null || adminId == null){
//            throw new IllegalArgumentException("one or more fields are empty.");
//        }
//
//        AdminUsersModel existingAdminUserModel = fetchAdminUserByAdminId(adminId);
//        if (existingAdminUserModel == null){
//            throw new ResourceNotFoundException("Admin user not found with id: " + adminId + ".");
//        }
//
//        existingAdminUserModel.setUsername(updatedAdminUserModel.getUsername());
//        existingAdminUserModel.setPassword(updatedAdminUserModel.getPassword());
//        existingAdminUserModel.setRole(updatedAdminUserModel.getRole());
//
//        return adminUsersRepository.save(existingAdminUserModel);
//    }

    @Transactional
    public void deleteAdminUser(String username){
        if (username == null){
            throw new IllegalArgumentException("Username cannot be empty.");
        }
        
        AdminUsersModel adminUsersModel = fetchAdminUserByUsername(username);
        if (adminUsersModel == null){
            throw new ResourceNotFoundException("Admin not found with username: " + username + ".");
        }

        adminUsersRepository.deleteByUsername(username);
    }
}
