package com.collegeevent.service.impl;

import com.collegeevent.dto.EventRequestDTO;
import com.collegeevent.dto.EventResponseDTO;
import com.collegeevent.service.EventService;
import org.springframework.stereotype.Service;
import com.collegeevent.mapper.EventMapper;
import com.collegeevent.repository.EventRepository;

import com.collegeevent.dto.EventRequestDTO;
import com.collegeevent.dto.EventResponseDTO;
import com.collegeevent.entity.Event;

import lombok.RequiredArgsConstructor;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    private final EventMapper eventMapper;

    @Override
    public EventResponseDTO createEvent(EventRequestDTO requestDTO) {

        Event event = eventMapper.toEntity(requestDTO);

        Event savedEvent = eventRepository.save(event);

        return eventMapper.toResponseDTO(savedEvent);
    }

    @Override
    public List<EventResponseDTO> getAllEvents() {
        return List.of();
    }

    @Override
    public EventResponseDTO getEventById(Long id) {
        return null;
    }

    @Override
    public EventResponseDTO updateEvent(Long id, EventRequestDTO requestDTO) {
        return null;
    }

    @Override
    public void deleteEvent(Long id) {

    }
}
