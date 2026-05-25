package com.admin.backend.repositories;

import com.admin.backend.models.CustomersModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CustomersRepository extends JpaRepository<CustomersModel, Long> {
    List<CustomersModel> findAllByCreatedAtAfter(LocalDateTime createdAtAfter);
}
