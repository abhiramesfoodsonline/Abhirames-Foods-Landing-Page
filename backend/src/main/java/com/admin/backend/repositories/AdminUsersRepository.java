package com.admin.backend.repositories;

import com.admin.backend.models.AdminUsersModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AdminUsersRepository extends JpaRepository<AdminUsersModel, Long> {
    AdminUsersModel findByUsername(String username);
    AdminUsersModel findByAdminId(Long adminId);
    List<AdminUsersModel> findAllByRole(String role);
    List<AdminUsersModel> findAllByCreatedAtAfter(LocalDateTime createdAtAfter);
    List<AdminUsersModel> findAllByCreatedAtBefore(LocalDateTime createdAtBefore);

    Boolean existsByUsername(String username);
    

}
