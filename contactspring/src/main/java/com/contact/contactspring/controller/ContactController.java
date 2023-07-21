package com.contact.contactspring.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.contact.contactspring.exception.ResourceNotFoundException;
import com.contact.contactspring.model.Contact;
import com.contact.contactspring.repository.ContactRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/")
public class ContactController {

  @Autowired
  private ContactRepository contactRepository;

  // get all contacts
  @GetMapping("/contacts")
  public List<Contact> getAllContacts() {
    return contactRepository.findAll();
  }

  // create contacts rest api
  @PostMapping("/contacts")
  public Contact createContact(@RequestBody Contact contact) {
    return contactRepository.save(contact);
  }

  // get contacts by uuid rest api
  @GetMapping("/contacts/{uuid}")
  public ResponseEntity<Contact> getContactByUuid(@PathVariable String uuid) {
    Contact contact = contactRepository.findByUuid(uuid);
    if (contact == null) {
      throw new ResourceNotFoundException("Contact not exist with UUID: " + uuid);
    }
    return ResponseEntity.ok(contact);
  }

  // update contacts rest api
  @PutMapping("/contacts/{uuid}")
  public ResponseEntity<Contact> updateContact(@PathVariable String uuid, @RequestBody Contact contactDetails) {
    Contact contact = contactRepository.findByUuid(uuid);
    if (contact == null) {
      throw new ResourceNotFoundException("Contact not exist with UUID: " + uuid);
    }

    // Update the contact properties
    contact.setName(contactDetails.getName());
    contact.setEmail(contactDetails.getEmail());

    Contact updatedContact = contactRepository.save(contact);
    return ResponseEntity.ok(updatedContact);
  }

  // delete contacts rest api
  @DeleteMapping("/contacts/{uuid}")
  public ResponseEntity<Map<String, Boolean>> deleteContact(@PathVariable String uuid) {
    Contact contacts = contactRepository.findByUuid(uuid);
    if (contacts == null) {
      throw new ResourceNotFoundException("Contact not exist with UUID: " + uuid);
    }

    contactRepository.delete(contacts);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return ResponseEntity.ok(response);
  }
}
