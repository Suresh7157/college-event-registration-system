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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Value("${app.organizer.secret-code}")
    private String organizerSecretCode;

    @Override
    public AuthResponse register(RegisterRequest request) {

        try {

            System.out.println("\n========== REGISTER REQUEST ==========");
            System.out.println("Full Name       : " + request.getFullName());
            System.out.println("Email           : " + request.getEmail());
            System.out.println("Role            : " + request.getRole());
            System.out.println("Organizer Code  : " + request.getOrganizerCode());
            System.out.println("Expected Code   : " + organizerSecretCode);
            System.out.println("======================================\n");

            // Check if email already exists
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email already exists");
            }

            // Check if phone number already exists
            if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
                throw new RuntimeException("Phone number already exists");
            }

            // Validate Organizer Secret Code
            if (request.getRole() == Role.ORGANIZER) {

                if (request.getOrganizerCode() == null ||
                        request.getOrganizerCode().trim().isEmpty()) {
                    throw new RuntimeException("Organizer Secret Code is required");
                }

                if (!organizerSecretCode.equals(request.getOrganizerCode().trim())) {
                    throw new RuntimeException("Invalid Organizer Secret Code");
                }
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

            return AuthResponse.builder()
                    .token(token)
                    .role(savedUser.getRole().name())
                    .message("Registration Successful")
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Credentials");
        }

        String token = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .message("Login Successful")
                .build();
    }
}