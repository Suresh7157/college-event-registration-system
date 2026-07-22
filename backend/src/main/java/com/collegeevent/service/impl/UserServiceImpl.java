package com.collegeevent.service.impl;

import com.collegeevent.dto.AuthResponse;
import com.collegeevent.dto.LoginRequest;
import com.collegeevent.dto.RegisterRequest;
import com.collegeevent.entity.User;
import com.collegeevent.enums.Role;
import com.collegeevent.repository.UserRepository;
import com.collegeevent.security.JwtService;
import com.collegeevent.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public AuthResponse register(RegisterRequest request) {

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Check if phone number already exists
        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RuntimeException("Phone number already exists");
        }

        // Create User
        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .department(request.getDepartment())
                .year(request.getYear())
                .role(request.getRole() != null ? request.getRole() : Role.STUDENT)
                .build();

        // Save User
        User savedUser = userRepository.save(user);

        // Generate JWT Token
        String token = jwtService.generateToken(savedUser.getEmail());

        // Return Response
        return AuthResponse.builder()
                .token(token)
                .message("Registration Successful")
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Credentials");
        }

        // Generate JWT Token
        String token = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .message("Login Successful")
                .build();
    }
}