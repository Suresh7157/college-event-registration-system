package com.collegeevent.mapper;

import org.springframework.stereotype.Component;
import com.collegeevent.dto.EventRequestDTO;
import com.collegeevent.entity.Event;
import com.collegeevent.enums.EventStatus;
import org.springframework.stereotype.Component;
import com.collegeevent.dto.EventResponseDTO;

import java.time.LocalDateTime;

@Component

public class EventMapper {
    public Event toEntity(EventRequestDTO requestDTO) {

        return Event.builder()
                .title(requestDTO.getTitle())
                .description(requestDTO.getDescription())
                .venue(requestDTO.getVenue())
                .eventDate(requestDTO.getEventDate())
                .eventTime(requestDTO.getEventTime())
                .capacity(requestDTO.getCapacity())
                .registrationDeadline(requestDTO.getRegistrationDeadline())
                .status(requestDTO.getStatus())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    public EventResponseDTO toResponseDTO(Event event) {

        return EventResponseDTO.builder()
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
                .build();
    }
}
