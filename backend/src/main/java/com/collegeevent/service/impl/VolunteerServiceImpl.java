package com.collegeevent.service.impl;

import com.collegeevent.entity.Volunteer;
import com.collegeevent.enums.VolunteerStatus;
import com.collegeevent.repository.VolunteerRepository;
import com.collegeevent.service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.collegeevent.entity.User;
import com.collegeevent.entity.Event;
import com.collegeevent.enums.VolunteerStatus;
import com.collegeevent.repository.UserRepository;
import com.collegeevent.repository.EventRepository;

import java.util.List;
import java.util.Optional;

@Service
public class VolunteerServiceImpl implements VolunteerService {

    @Autowired
    private VolunteerRepository volunteerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Override
    public Volunteer saveVolunteer(Volunteer volunteer) {

        User user = userRepository.findById(volunteer.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = eventRepository.findById(volunteer.getEvent().getId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        volunteer.setUser(user);
        volunteer.setEvent(event);
        volunteer.setStatus(VolunteerStatus.PENDING);

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

    @Override
    public Volunteer approveVolunteer(Long id) {

        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        volunteer.setStatus(VolunteerStatus.APPROVED);

        return volunteerRepository.save(volunteer);
    }

    @Override
    public Volunteer rejectVolunteer(Long id) {

        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        volunteer.setStatus(VolunteerStatus.REJECTED);

        return volunteerRepository.save(volunteer);
    }
}