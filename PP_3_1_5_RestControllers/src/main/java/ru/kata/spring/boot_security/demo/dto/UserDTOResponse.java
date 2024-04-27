package ru.kata.spring.boot_security.demo.dto;

import ru.kata.spring.boot_security.demo.model.User;

public class UserDTOResponse {
    private int id;
    private String name;
    private String surname;
    private int age;
    private String email;
    private String password;
    private String roles;

    public UserDTOResponse() {
    }

    public UserDTOResponse(User user) {
        id = user.getId();
        name = user.getName();
        surname = user.getSurname();
        age = user.getAge();
        email = user.getEmail();
        roles = user.getStringOfUsersRoles();
        password = user.getPassword();
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoles(String roles) {
        this.roles = roles;
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
}
