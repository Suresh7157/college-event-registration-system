package com.collegeevent;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {

    public static void main(String[] args) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String password = "Tabrez@1234";

        System.out.println("BCrypt Password:");
        System.out.println(encoder.encode(password));
    }
}