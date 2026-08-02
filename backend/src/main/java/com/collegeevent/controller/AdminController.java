package com.collegeevent.controller;

import com.collegeevent.dto.DashboardResponse;
import com.collegeevent.dto.EventResponseDTO;
import com.collegeevent.dto.UserResponse;
import com.collegeevent.entity.Volunteer;
import com.collegeevent.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboardStatistics());
    }
    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }
    @GetMapping("/users/search")
    public ResponseEntity<List<UserResponse>> searchUsers(
            @RequestParam String keyword) {

        return ResponseEntity.ok(adminService.searchUsers(keyword));
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {

        adminService.deleteUser(id);

        return ResponseEntity.ok("User deleted successfully");
    }
    @GetMapping("/events")
    public ResponseEntity<List<EventResponseDTO>> getAllEvents() {
        return ResponseEntity.ok(adminService.getAllEvents());
    }
    @GetMapping("/events/search")
    public ResponseEntity<List<EventResponseDTO>> searchEvents(
            @RequestParam String keyword) {

        return ResponseEntity.ok(adminService.searchEvents(keyword));
    }
    @GetMapping("/volunteers")
    public ResponseEntity<List<Volunteer>> getAllVolunteers() {
        return ResponseEntity.ok(adminService.getAllVolunteers());
    }

    @GetMapping("/volunteers/search")
    public ResponseEntity<List<UserResponse>> searchOrganizers(
            @RequestParam String keyword) {

        return ResponseEntity.ok(adminService.searchOrganizers(keyword));
    }

    @DeleteMapping("/volunteer/{id}")
    public ResponseEntity<String> deleteOrganizer(@PathVariable Long id) {

        adminService.deleteOrganizer(id);

        return ResponseEntity.ok("Organizer deleted successfully");
    }

    @GetMapping("/organizers")
    public ResponseEntity<List<UserResponse>> getAllOrganizers() {
        return ResponseEntity.ok(adminService.getAllOrganizers());
    }
    @GetMapping("/analytics/users")
    public ResponseEntity<List<Object[]>> usersAnalytics() {
        return ResponseEntity.ok(adminService.getUsersByDepartment());
    }

    @GetMapping("/analytics/registrations")
    public ResponseEntity<List<Object[]>> registrationAnalytics() {
        return ResponseEntity.ok(adminService.getRegistrationsByEvent());
    }

    @GetMapping("/analytics/volunteers")
    public ResponseEntity<List<Object[]>> volunteerAnalytics() {
        return ResponseEntity.ok(adminService.getVolunteerStatus());
    }
    @GetMapping("/profile/{id}")
    public ResponseEntity<UserResponse> getAdminProfile(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getAdminProfile(id));
    }
    @PutMapping("/volunteers/{id}/approve")
    public ResponseEntity<String> approveVolunteer(@PathVariable Long id) {

        adminService.approveVolunteer(id);

        return ResponseEntity.ok("Volunteer Approved");

    }
    @DeleteMapping("/volunteers/{id}")
    public ResponseEntity<String> rejectVolunteer(@PathVariable Long id) {

        adminService.rejectVolunteer(id);

        return ResponseEntity.ok("Volunteer Rejected");

    }






}
