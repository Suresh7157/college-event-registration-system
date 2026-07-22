package com.collegeevent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {

    private long totalUsers;

    private long totalEvents;

    private long totalRegistrations;

    private long totalVolunteers;
}
