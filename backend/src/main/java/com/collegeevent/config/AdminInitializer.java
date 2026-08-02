package com.collegeevent.config;

import com.collegeevent.entity.User;
import com.collegeevent.enums.Role;
import com.collegeevent.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (userRepository.findByEmail("admin@collegeevent.com").isEmpty()) {

            User admin = new User();

            admin.setFullName("System Administrator");
            admin.setEmail("admin@collegeevent.com");
            admin.setPassword(passwordEncoder.encode("Admin@1234"));
            admin.setPhoneNumber("9999999999");
            admin.setDepartment("CST");
            admin.setYear(4);
            admin.setRole(Role.ADMIN);

            userRepository.save(admin);

            System.out.println("Admin account created successfully.");

        } else {

            System.out.println("Admin already exists.");

        }

    }
}
