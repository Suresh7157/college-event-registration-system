package com.collegeevent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {

    private long totalUsers;

    private long totalEvents;

    private long totalRegistrations;

    private long totalVolunteers;
    private List<UserDepartmentDTO> usersByDepartment;
    private List<EventRegistrationDTO> registrationsByEvent;
    private List<VolunteerStatusDTO> volunteerStatus;
}
