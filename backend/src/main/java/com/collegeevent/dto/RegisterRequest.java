package com.collegeevent.dto;

import com.collegeevent.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    private String fullName;
    private String email;
    private String password;
    private String phoneNumber;
    private String department;
    private Integer year;

    // User Role
    private Role role;
    // NEW FIELD
    private String organizerCode;
}