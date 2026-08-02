package com.collegeevent.service;

import com.collegeevent.dto.DashboardResponse;
import com.collegeevent.dto.EventResponseDTO;
import com.collegeevent.dto.UserResponse;
import com.collegeevent.entity.Volunteer;

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
    Long getTotalUsers();

    List<Volunteer> getAllVolunteers();
    List<Object[]> getUsersByDepartment();

    List<Object[]> getRegistrationsByEvent();

    List<Object[]> getVolunteerStatus();

    UserResponse getProfileByEmail(String email);

    UserResponse getAdminProfile(Long id);
    void approveVolunteer(Long id);

    void rejectVolunteer(Long id);
}
