package com.collegeevent.service.impl;

import com.collegeevent.dto.RegistrationRequestDTO;
import com.collegeevent.dto.RegistrationResponseDTO;
import com.collegeevent.entity.Event;
import com.collegeevent.entity.Registration;
import com.collegeevent.entity.User;
import com.collegeevent.enums.RegistrationStatus;
import com.collegeevent.exception.DuplicateRegistrationException;
import com.collegeevent.exception.ResourceNotFoundException;
import com.collegeevent.repository.EventRepository;
import com.collegeevent.repository.RegistrationRepository;
import com.collegeevent.repository.UserRepository;
import com.collegeevent.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Override
    public RegistrationResponseDTO registerStudent(RegistrationRequestDTO request) {

        Long userId = request.getUserId();
        Long eventId = request.getEventId();

        // Check whether user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id: " + userId));

        // Check whether event exists
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Event not found with id: " + eventId));

        // Prevent duplicate registration
        if (registrationRepository.existsByUserIdAndEventId(userId, eventId)) {
            throw new DuplicateRegistrationException(
                    "Student is already registered for this event.");
        }

        // Create Registration Entity
        Registration registration = new Registration();

        registration.setUser(user);
        registration.setEvent(event);
        registration.setRemarks(request.getRemarks());

        registration.setRegistrationDate(LocalDateTime.now());
        registration.setStatus(RegistrationStatus.REGISTERED);

        Registration savedRegistration = registrationRepository.save(registration);

        return convertToDTO(savedRegistration);
    }

    @Override
    public List<RegistrationResponseDTO> getAllRegistrations() {

        return registrationRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RegistrationResponseDTO getRegistrationById(Long id) {

        Registration registration = registrationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Registration not found with id: " + id));

        return convertToDTO(registration);
    }

    @Override
    public void deleteRegistration(Long id) {

        Registration registration = registrationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Registration not found with id: " + id));

        registrationRepository.delete(registration);
    }

    // Convert Entity to DTO
    private RegistrationResponseDTO convertToDTO(Registration registration) {

        RegistrationResponseDTO dto = new RegistrationResponseDTO();

        dto.setRegistrationId(registration.getId());

        dto.setUserId(registration.getUser().getId());
        dto.setStudentName(registration.getUser().getFullName());
        dto.setStudentEmail(registration.getUser().getEmail());

        dto.setEventId(registration.getEvent().getId());
        dto.setEventTitle(registration.getEvent().getTitle());

        dto.setRegistrationDate(registration.getRegistrationDate());

        dto.setStatus(registration.getStatus().name());

        dto.setRemarks(registration.getRemarks());

        return dto;
    }
}