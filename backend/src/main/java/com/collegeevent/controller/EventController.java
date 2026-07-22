package com.collegeevent.controller;

import com.collegeevent.dto.EventRequestDTO;
import com.collegeevent.dto.EventResponseDTO;
import com.collegeevent.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping
    public EventResponseDTO createEvent(@RequestBody EventRequestDTO requestDTO) {

        return eventService.createEvent(requestDTO);

    }
}
