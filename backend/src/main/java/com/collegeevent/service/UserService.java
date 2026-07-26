package com.collegeevent.service;

import com.collegeevent.dto.AuthResponse;
import com.collegeevent.dto.LoginRequest;
import com.collegeevent.dto.RegisterRequest;
import com.collegeevent.dto.UserProfileResponse;

public interface UserService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    UserProfileResponse getCurrentUserProfile();

}