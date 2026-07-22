package com.collegeevent.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventRequestDTO {

    private String title;

    private String description;

    private String venue;

    private LocalDate eventDate;

    private LocalTime eventTime;

    private Integer capacity;

    private LocalDate registrationDeadline;

}