package com.collegeevent.service;

import com.collegeevent.dto.EventRequestDTO;
import com.collegeevent.dto.EventResponseDTO;
import com.collegeevent.enums.EventStatus;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import java.util.List;

public interface EventService {

    EventResponseDTO createEvent(EventRequestDTO requestDTO,
                                 MultipartFile image) throws IOException;

    Page<EventResponseDTO> getAllEvents(int page,
                                        int size,
                                        String sortBy,
                                        String direction);

    EventResponseDTO getEventById(Long id);

    EventResponseDTO updateEvent(Long id, EventRequestDTO requestDTO);

    void deleteEvent(Long id);

    List<EventResponseDTO> searchEvents(String title);

    List<EventResponseDTO> getEventsByStatus(EventStatus status);



}