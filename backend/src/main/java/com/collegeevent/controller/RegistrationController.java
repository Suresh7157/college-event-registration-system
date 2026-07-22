package com.collegeevent.controller;

import com.collegeevent.dto.RegistrationRequestDTO;
import com.collegeevent.dto.RegistrationResponseDTO;
import com.collegeevent.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registration")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping
    public RegistrationResponseDTO registerStudent(@RequestBody RegistrationRequestDTO request) {
        return registrationService.registerStudent(request);
    }

    @GetMapping
    public List<RegistrationResponseDTO> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }

    @GetMapping("/{id}")
    public RegistrationResponseDTO getRegistrationById(@PathVariable Long id) {
        return registrationService.getRegistrationById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteRegistration(@PathVariable Long id) {
        registrationService.deleteRegistration(id);
    }
}