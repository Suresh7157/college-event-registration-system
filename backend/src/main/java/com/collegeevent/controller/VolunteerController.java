package com.collegeevent.controller;

import com.collegeevent.entity.Volunteer;
import com.collegeevent.service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {

    @Autowired
    private VolunteerService volunteerService;

    // Create a volunteer application
    @PostMapping
    public Volunteer createVolunteer(@RequestBody Volunteer volunteer) {
        return volunteerService.saveVolunteer(volunteer);
    }

    // Get all volunteers
    @GetMapping
    public List<Volunteer> getAllVolunteers() {
        return volunteerService.getAllVolunteers();
    }

    // Get volunteer by ID
    @GetMapping("/{id}")
    public Optional<Volunteer> getVolunteerById(@PathVariable Long id) {
        return volunteerService.getVolunteerById(id);
    }

    // Update volunteer
    @PutMapping("/{id}")
    public Volunteer updateVolunteer(@PathVariable Long id,
                                     @RequestBody Volunteer volunteer) {
        return volunteerService.updateVolunteer(id, volunteer);
    }

    // Delete volunteer
    @DeleteMapping("/{id}")
    public String deleteVolunteer(@PathVariable Long id) {
        volunteerService.deleteVolunteer(id);
        return "Volunteer deleted successfully.";
    }
}