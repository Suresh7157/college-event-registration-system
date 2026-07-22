package com.collegeevent.service;

import com.collegeevent.dto.EventRequestDTO;
import com.collegeevent.dto.EventResponseDTO;

import java.util.List;

public interface EventService {

    EventResponseDTO createEvent(EventRequestDTO requestDTO);

    List<EventResponseDTO> getAllEvents();

    EventResponseDTO getEventById(Long id);

    EventResponseDTO updateEvent(Long id, EventRequestDTO requestDTO);

    void deleteEvent(Long id);

}