package com.collegeevent.service.impl;

import com.collegeevent.entity.Volunteer;
import com.collegeevent.repository.VolunteerRepository;
import com.collegeevent.service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VolunteerServiceImpl implements VolunteerService {

    @Autowired
    private VolunteerRepository volunteerRepository;

    @Override
    public Volunteer saveVolunteer(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);
    }

    @Override
    public List<Volunteer> getAllVolunteers() {
        return volunteerRepository.findAll();
    }

    @Override
    public Optional<Volunteer> getVolunteerById(Long id) {
        return volunteerRepository.findById(id);
    }

    @Override
    public Volunteer updateVolunteer(Long id, Volunteer volunteer) {

        Volunteer existingVolunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        existingVolunteer.setAssignedRole(volunteer.getAssignedRole());
        existingVolunteer.setStatus(volunteer.getStatus());
        existingVolunteer.setAssignedBy(volunteer.getAssignedBy());
        existingVolunteer.setUser(volunteer.getUser());
        existingVolunteer.setEvent(volunteer.getEvent());

        return volunteerRepository.save(existingVolunteer);
    }

    @Override
    public void deleteVolunteer(Long id) {

        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        volunteerRepository.delete(volunteer);
    }
}