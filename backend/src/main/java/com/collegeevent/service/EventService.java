package com.collegeevent.service;

import com.collegeevent.dto.EventRequestDTO;
import com.collegeevent.dto.EventResponseDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EventService {

    EventResponseDTO createEvent(EventRequestDTO requestDTO);

    Page<EventResponseDTO> getAllEvents(int page,
                                        int size,
                                        String sortBy,
                                        String direction);

    EventResponseDTO getEventById(Long id);

    EventResponseDTO updateEvent(Long id, EventRequestDTO requestDTO);

    void deleteEvent(Long id);

    List<EventResponseDTO> searchEvents(String title);

}