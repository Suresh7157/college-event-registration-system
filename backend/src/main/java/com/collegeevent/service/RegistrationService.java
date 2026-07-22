package com.collegeevent.service;

import com.collegeevent.entity.Registration;

import java.util.List;

public interface RegistrationService {

    Registration registerStudent(Registration registration);

    List<Registration> getAllRegistrations();

    Registration getRegistrationById(Long id);

    void deleteRegistration(Long id);
}