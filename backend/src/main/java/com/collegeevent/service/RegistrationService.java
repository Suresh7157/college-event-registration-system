package com.collegeevent.service;

import com.collegeevent.dto.RegistrationRequestDTO;
import com.collegeevent.dto.RegistrationResponseDTO;

import java.util.List;

public interface RegistrationService {

    RegistrationResponseDTO registerStudent(RegistrationRequestDTO request);

    List<RegistrationResponseDTO> getAllRegistrations();

    RegistrationResponseDTO getRegistrationById(Long id);

    void deleteRegistration(Long id);
}