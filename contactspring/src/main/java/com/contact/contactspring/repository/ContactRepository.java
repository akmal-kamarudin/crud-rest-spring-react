package com.contact.contactspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.contact.contactspring.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, String> {
  Contact findByUuid(String uuid);
}
