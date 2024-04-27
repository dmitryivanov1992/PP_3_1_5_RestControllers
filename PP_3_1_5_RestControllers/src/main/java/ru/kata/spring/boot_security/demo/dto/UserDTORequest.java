package ru.kata.spring.boot_security.demo.dto;

import ru.kata.spring.boot_security.demo.model.User;

public class UserDTORequest {
    private int id;
    private String name;
    private String surname;
    private int age;
    private String email;
    private String roles;


    public UserDTORequest() {
    }

    public UserDTORequest(User user) {
        id = user.getId();
        name = user.getName();
        surname = user.getSurname();
        age = user.getAge();
        email = user.getEmail();
        roles = user.getStringOfUsersRoles();
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public int getAge() {
        return age;
    }

    public String getEmail() {
        return email;
    }

    public String getRoles() {
        return roles;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}
