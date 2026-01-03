package com.admin.backend.repositories;

import com.admin.backend.models.ContactUsModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactUsRepository extends JpaRepository<ContactUsModel, Long> {
}
