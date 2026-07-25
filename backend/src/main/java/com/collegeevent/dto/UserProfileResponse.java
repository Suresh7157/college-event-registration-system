package com.collegeevent.dto;

import com.collegeevent.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponse {

    private Long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String department;
    private Integer year;
    private Role role;
    private LocalDateTime createdAt;
}