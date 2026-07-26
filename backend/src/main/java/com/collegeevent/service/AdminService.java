package com.collegeevent.service;

import com.collegeevent.dto.DashboardResponse;
import com.collegeevent.dto.EventResponseDTO;
import com.collegeevent.dto.UserResponse;
import java.util.List;

public interface AdminService {

    DashboardResponse getDashboardStatistics();

    List<UserResponse> getAllUsers();

    List<UserResponse> searchUsers(String keyword);
    List<EventResponseDTO> getAllEvents();
    List<EventResponseDTO> searchEvents(String keyword);
    List<UserResponse> getAllOrganizers();

    List<UserResponse> searchOrganizers(String keyword);
    void deleteOrganizer(Long id);
    void deleteUser(Long id);
}
