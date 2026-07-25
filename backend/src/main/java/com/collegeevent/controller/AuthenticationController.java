package com.collegeevent.controller;

import com.collegeevent.dto.AuthResponse;
import com.collegeevent.dto.LoginRequest;
import com.collegeevent.dto.RegisterRequest;
import com.collegeevent.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.collegeevent.dto.UserProfileResponse;
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserService userService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {

        System.out.println("====================================");
        System.out.println("REGISTER API CALLED");
        System.out.println("Email : " + request.getEmail());
        System.out.println("====================================");

        return userService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        System.out.println("====================================");
        System.out.println("LOGIN API CALLED");
        System.out.println("Email : " + request.getEmail());
        System.out.println("====================================");

        return userService.login(request);
    }

    @GetMapping("/me")
    public UserProfileResponse getCurrentUserProfile() {
        return userService.getCurrentUserProfile();
    }
}