package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dto.UserDTORequest;
import ru.kata.spring.boot_security.demo.dto.UserDTOResponse;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.management.relation.RoleNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersRestController {
    private final UserService userService;
    private final RoleService roleService;

    public UsersRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users/current")
    public ResponseEntity<UserDTORequest> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDTORequest userDTORequest = new UserDTORequest((User) auth.getPrincipal());
        return new ResponseEntity<>(userDTORequest, HttpStatus.OK);
    }

    @GetMapping("/users/")
    public List<UserDTORequest> getAllUsers() {
        return userService.listUsers()
                .stream().map(UserDTORequest::new)
                .toList();
    }


    @PostMapping("/users/")
    public ResponseEntity<HttpStatus> createNewUser(@RequestBody UserDTOResponse userDTOResponse) throws RoleNotFoundException {
        User user = new User(userDTOResponse);
        if (userDTOResponse.getRoles().contains("ADMIN")) {
            user.setRole(roleService.findRoleByName("ROLE_ADMIN"));
        }
        if (userDTOResponse.getRoles().contains("USER")) {
            user.setRole(roleService.findRoleByName("ROLE_USER"));
        }
        userService.addUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDTOResponse> getUserById(@PathVariable("id") int id) {
        User user = userService.getUserById(id);
        UserDTOResponse userDTOResponse = new UserDTOResponse(user);
        return new ResponseEntity<>(userDTOResponse, HttpStatus.OK);
    }

    @PatchMapping("/users/")
    public ResponseEntity<HttpStatus> editUser(@RequestBody UserDTOResponse userDTOResponse) throws RoleNotFoundException {
        User user = new User(userDTOResponse);
        if (userDTOResponse.getRoles().contains("ADMIN")) {
            user.setRole(roleService.findRoleByName("ROLE_ADMIN"));
        }
        if (userDTOResponse.getRoles().contains("USER")) {
            user.setRole(roleService.findRoleByName("ROLE_USER"));
        }
        user.setRoles(roleService.setRolesId(user.getRoles()));
        userService.editUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
