package com.collegeevent.service.impl;

import com.collegeevent.dto.*;
import com.collegeevent.entity.User;
import com.collegeevent.entity.Volunteer;
import com.collegeevent.enums.Role;
import com.collegeevent.enums.VolunteerStatus;
import com.collegeevent.repository.EventRepository;
import com.collegeevent.repository.RegistrationRepository;
import com.collegeevent.repository.UserRepository;
import com.collegeevent.repository.VolunteerRepository;
import com.collegeevent.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;
    private final VolunteerRepository volunteerRepository;

    @Override
    public DashboardResponse getDashboardStatistics() {

        DashboardResponse response = new DashboardResponse();

        response.setTotalUsers(userRepository.count());
        response.setTotalEvents(eventRepository.count());
        response.setTotalRegistrations(registrationRepository.count());
        response.setTotalVolunteers(volunteerRepository.count());

        response.setUsersByDepartment(

                userRepository.getUsersByDepartment()
                        .stream()
                        .map(obj -> new UserDepartmentDTO(

                                (String) obj[0],

                                (Long) obj[1]

                        ))
                        .toList()

        );

        response.setRegistrationsByEvent(

                registrationRepository.getRegistrationsByEvent()
                        .stream()
                        .map(obj -> new EventRegistrationDTO(

                                (String) obj[0],

                                (Long) obj[1]

                        ))
                        .toList()

        );

        response.setVolunteerStatus(

                volunteerRepository.getVolunteerStatus()
                        .stream()
                        .map(obj -> new VolunteerStatusDTO(

                                obj[0].toString(),

                                (Long) obj[1]

                        ))
                        .toList()

        );

        return response;

    }

    @Override
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getDepartment(),
                        user.getYear(),
                        user.getRole()
                ))
                .toList();
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<UserResponse> searchUsers(String keyword) {

        return userRepository.findByFullNameContainingIgnoreCase(keyword)
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getDepartment(),
                        user.getYear(),
                        user.getRole()
                ))
                .toList();
    }

    @Override
    public List<EventResponseDTO> getAllEvents() {

        return eventRepository.findAll()
                .stream()
                .map(event -> EventResponseDTO.builder()
                        .id(event.getId())
                        .title(event.getTitle())
                        .description(event.getDescription())
                        .venue(event.getVenue())
                        .eventDate(event.getEventDate())
                        .eventTime(event.getEventTime())
                        .capacity(event.getCapacity())
                        .registrationDeadline(event.getRegistrationDeadline())
                        .status(event.getStatus())
                        .createdAt(event.getCreatedAt())
                        .updatedAt(event.getUpdatedAt())
                        .imageUrl(event.getImageUrl())
                        .build())
                .toList();
    }

    @Override
    public List<EventResponseDTO> searchEvents(String keyword) {

        return eventRepository.findByTitleContainingIgnoreCase(keyword)
                .stream()
                .map(event -> EventResponseDTO.builder()
                        .id(event.getId())
                        .title(event.getTitle())
                        .description(event.getDescription())
                        .venue(event.getVenue())
                        .eventDate(event.getEventDate())
                        .eventTime(event.getEventTime())
                        .capacity(event.getCapacity())
                        .registrationDeadline(event.getRegistrationDeadline())
                        .status(event.getStatus())
                        .createdAt(event.getCreatedAt())
                        .updatedAt(event.getUpdatedAt())
                        .imageUrl(event.getImageUrl())
                        .build())
                .toList();
    }

    @Override
    public List<UserResponse> getAllOrganizers() {

        return userRepository.findByRole(Role.ORGANIZER)
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getDepartment(),
                        user.getYear(),
                        user.getRole()
                ))
                .toList();
    }

    @Override
    public List<UserResponse> searchOrganizers(String keyword) {

        return userRepository
                .findByRoleAndFullNameContainingIgnoreCase(Role.ORGANIZER, keyword)
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getDepartment(),
                        user.getYear(),
                        user.getRole()
                ))
                .toList();
    }

    @Override
    public void deleteOrganizer(Long id) {
        userRepository.deleteById(id);
    }
    @Override
    public Long getTotalUsers() {
        return userRepository.count();
    }
    @Override
    public List<Volunteer> getAllVolunteers() {
        return volunteerRepository.findAll();
    }
    @Override
    public List<Object[]> getUsersByDepartment() {
        return userRepository.getUsersByDepartment();
    }

    @Override
    public List<Object[]> getRegistrationsByEvent() {
        return registrationRepository.getRegistrationsByEvent();
    }

    @Override
    public List<Object[]> getVolunteerStatus() {
        return volunteerRepository.getVolunteerStatus();
    }
    @Override
    public UserResponse getProfileByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getDepartment(),
                user.getYear(),
                user.getRole()
        );
    }

    @Override
    public UserResponse getAdminProfile(Long id) {

        var user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getDepartment(),
                user.getYear(),
                user.getRole()
        );

    }
    @Override
    public void approveVolunteer(Long id) {

        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        volunteer.setStatus(VolunteerStatus.APPROVED);

        volunteerRepository.save(volunteer);

    }
    @Override
    public void rejectVolunteer(Long id) {

        volunteerRepository.deleteById(id);

    }

}