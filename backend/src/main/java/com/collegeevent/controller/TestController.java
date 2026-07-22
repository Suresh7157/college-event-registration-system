package com.collegeevent.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/dashboard/test")
    public String adminTest() {
        return "Hello ADMIN";
    }

    @GetMapping("/api/events/test")
    public String organizerTest() {
        return "Hello ADMIN or ORGANIZER";
    }

    @GetMapping("/api/registrations/test")
    public String studentTest() {
        return "Hello STUDENT";
    }

    @GetMapping("/api/volunteers/test")
    public String volunteerTest() {
        return "Hello ADMIN or VOLUNTEER";
    }
}