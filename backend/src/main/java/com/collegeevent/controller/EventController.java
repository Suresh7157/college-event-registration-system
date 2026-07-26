package com.collegeevent.controller;

import com.collegeevent.dto.EventRequestDTO;
import com.collegeevent.dto.EventResponseDTO;
import com.collegeevent.enums.EventStatus;
import com.collegeevent.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestParam;


import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.List;


@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public EventResponseDTO createEvent(

            @Valid @ModelAttribute EventRequestDTO requestDTO,

            @RequestPart(value = "image", required = false) MultipartFile image)

            throws IOException {

        return eventService.createEvent(requestDTO, image);

    }


//    @PostMapping
//    public EventResponseDTO createEvent(@Valid @RequestBody EventRequestDTO requestDTO) {
//
//        return eventService.createEvent(requestDTO);
//
//    }

    @GetMapping
    public Page<EventResponseDTO> getAllEvents(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "eventDate") String sortBy,

            @RequestParam(defaultValue = "asc") String direction) {

        return eventService.getAllEvents(page, size, sortBy, direction);

    }

    @GetMapping("/{id}")
    public EventResponseDTO getEventById(@PathVariable Long id) {

        return eventService.getEventById(id);

    }

    @PutMapping("/{id}")
    public EventResponseDTO updateEvent(@PathVariable Long id,
                                        @Valid @RequestBody EventRequestDTO requestDTO) {

        return eventService.updateEvent(id, requestDTO);

    }

    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable Long id) {

        eventService.deleteEvent(id);

        return "Event deleted successfully.";

    }

    @GetMapping("/search")
    public List<EventResponseDTO> searchEvents(@RequestParam String title) {

        return eventService.searchEvents(title);

    }

    @GetMapping("/status")
    public List<EventResponseDTO> getEventsByStatus(
            @RequestParam EventStatus status){

        return eventService.getEventsByStatus(status);

    }

}
