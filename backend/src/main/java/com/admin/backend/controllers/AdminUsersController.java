package com.admin.backend.controllers;

import com.admin.backend.dto.ChangePasswordRequest;
import com.admin.backend.models.AdminUsersModel;
import com.admin.backend.services.AdminUsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/admin-users")
public class AdminUsersController {
    
    
    @Autowired
    private AdminUsersService adminUsersService;
    

    @PostMapping
    ResponseEntity<AdminUsersModel> createAdminUser(@RequestBody AdminUsersModel adminUsersModel){
        return new ResponseEntity<>(adminUsersService.createAdminUser(adminUsersModel), HttpStatus.OK);
    }

    @GetMapping
    ResponseEntity<List<AdminUsersModel>> fetchAdminUsers() {
        return new ResponseEntity<>(adminUsersService.fetchAllAdminUsers(), HttpStatus.OK);
    }

    @GetMapping("/{adminId}")
    ResponseEntity<AdminUsersModel> fetchAdminUserByAdminId(@PathVariable Long adminId){
        return new ResponseEntity<>(adminUsersService.fetchAdminUserByAdminId(adminId), HttpStatus.OK);
    }

//    @GetMapping("/search-username/{userName}")
//    ResponseEntity<AdminUsersModel> fetchAdminUserByUserName(@PathVariable String userName){
//        System.out.println(userName);
//        return new ResponseEntity<>(adminUsersService.fetchAdminUserByUsername(userName), HttpStatus.OK);
//    }

    @GetMapping("/search-username/{userName}")
    ResponseEntity<AdminUsersModel> fetchAdminUserByUserName(@PathVariable String userName){
        System.out.println(userName + "Hello");
        AdminUsersModel user = adminUsersService.fetchAdminUserByUsername(userName);

        System.out.println(user);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @GetMapping("/search-role/{role}")
    ResponseEntity<List<AdminUsersModel>> fetchAdminUsersByRole(@PathVariable String role){
        return new ResponseEntity<>(adminUsersService.fetchAdminUsersByRole(role), HttpStatus.OK);
    }

    @GetMapping("/search-createdAfter/{createdAfter}")
    ResponseEntity<List<AdminUsersModel>> fetchAdminUserByCreatedAtAfter(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime createdAfter){
        return new ResponseEntity<>(adminUsersService.fetchAdminUserByCreatedAtAfter(createdAfter), HttpStatus.OK);
    }

    @GetMapping("/search-createdBefore/{createdBefore}")
    ResponseEntity<List<AdminUsersModel>> fetchAdminUserByCreatedAtBefore(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime createdBefore){
        return new ResponseEntity<>(adminUsersService.fetchAdminUserByCreatedAtBefore(createdBefore), HttpStatus.OK);
    }
    

    @PutMapping("/{username}")
    ResponseEntity<Void> updateAdminPassword(@PathVariable String username, @RequestBody ChangePasswordRequest updatedAdminUserModel){
        adminUsersService.updateAdminUser(username, updatedAdminUserModel);
        return ResponseEntity.ok().build();
        
    }

    @PutMapping("/update-role")
    ResponseEntity<Void> updateAdminRole(@RequestParam String username, @RequestParam String role){
        adminUsersService.updateAdminRole(username, role);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/{username}")
    ResponseEntity<Void> deleteAdminUser(@PathVariable String username){
        try {
            adminUsersService.deleteAdminUser(username);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok().build();

    }

}
