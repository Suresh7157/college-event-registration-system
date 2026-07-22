package com.collegeevent.service;

import com.collegeevent.entity.Volunteer;

import java.util.List;
import java.util.Optional;

public interface VolunteerService {

    Volunteer saveVolunteer(Volunteer volunteer);

    List<Volunteer> getAllVolunteers();

    Optional<Volunteer> getVolunteerById(Long id);

    Volunteer updateVolunteer(Long id, Volunteer volunteer);

    void deleteVolunteer(Long id);
}