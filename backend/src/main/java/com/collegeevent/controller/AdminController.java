package com.collegeevent.controller;

import com.collegeevent.dto.DashboardResponse;
import com.collegeevent.dto.EventResponseDTO;
import com.collegeevent.dto.UserResponse;
import com.collegeevent.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<List<UserResponse>> getAllOrganizers() {
        return ResponseEntity.ok(adminService.getAllOrganizers());
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


}
