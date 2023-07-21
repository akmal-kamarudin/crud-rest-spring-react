package com.contact.contactspring.model;

import jakarta.persistence.*;

@Entity
@Table(name = "contacts")
public class Contact {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "user_uuid")
  private String uuid;

  @Column(name = "user_name")
  private String name;

  @Column(name = "email_id")
  private String email;

  public Contact() {

  }

  public Contact(String uuid, String name, String email) {
    super();
    this.uuid = uuid;
    this.name = name;
    this.email = email;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
