package com.collegeevent.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import com.collegeevent.enums.EventStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    private String description;

    private String venue;

    private LocalDate eventDate;

    private LocalTime eventTime;

    private Integer capacity;

    private LocalDate registrationDeadline;

    @Enumerated(EnumType.STRING)
    private EventStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

