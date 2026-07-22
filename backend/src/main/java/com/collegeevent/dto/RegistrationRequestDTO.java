package com.collegeevent.dto;

public class RegistrationRequestDTO {

    private Long userId;
    private Long eventId;
    private String remarks;

    public RegistrationRequestDTO() {
    }

    public RegistrationRequestDTO(Long userId, Long eventId, String remarks) {
        this.userId = userId;
        this.eventId = eventId;
        this.remarks = remarks;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}