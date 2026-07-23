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
import java.util.stream.Collectors;
import com.collegeevent.exception.EventNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

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
    public Page<EventResponseDTO> getAllEvents(int page,
                                               int size,
                                               String sortBy,
                                               String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Event> eventPage = eventRepository.findAll(pageable);

        return eventPage.map(eventMapper::toResponseDTO);
    }

    @Override
    public EventResponseDTO getEventById(Long id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found with ID: " + id));

        return eventMapper.toResponseDTO(event);
    }

    @Override
    public EventResponseDTO updateEvent(Long id, EventRequestDTO requestDTO) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found with ID: " + id));

        event.setTitle(requestDTO.getTitle());
        event.setDescription(requestDTO.getDescription());
        event.setVenue(requestDTO.getVenue());
        event.setEventDate(requestDTO.getEventDate());
        event.setEventTime(requestDTO.getEventTime());
        event.setCapacity(requestDTO.getCapacity());
        event.setRegistrationDeadline(requestDTO.getRegistrationDeadline());
        event.setStatus(requestDTO.getStatus());
        event.setUpdatedAt(java.time.LocalDateTime.now());

        Event updatedEvent = eventRepository.save(event);

        return eventMapper.toResponseDTO(updatedEvent);
    }

    @Override
    public void deleteEvent(Long id) {

        if (!eventRepository.existsById(id)) {
            throw new EventNotFoundException("Event not found with ID: " + id);
        }

        eventRepository.deleteById(id);

    }

    @Override
    public List<EventResponseDTO> searchEvents(String title) {

        List<Event> events = eventRepository.findByTitleContainingIgnoreCase(title);

        return events.stream()
                .map(eventMapper::toResponseDTO)
                .toList();

    }
}
