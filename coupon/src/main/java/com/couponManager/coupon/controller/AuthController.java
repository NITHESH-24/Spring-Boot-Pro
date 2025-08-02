package com.couponManager.coupon.controller;

import com.couponManager.coupon.dto.LoginRequest;
import com.couponManager.coupon.model.User;
import com.couponManager.coupon.service.UserService;
import com.couponManager.coupon.service.JwtService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            registeredUser.setPassword(null); // Don't send password back
            return ResponseEntity.status(201).body(registeredUser);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            User authenticatedUser = userService.authenticateUser(
                    loginRequest.getUsername(), loginRequest.getPassword()
            );


            String token = jwtService.generateToken(authenticatedUser.getUsername());


            authenticatedUser.setPassword(null);


            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", authenticatedUser);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(401).body(error);
        }
    }
}