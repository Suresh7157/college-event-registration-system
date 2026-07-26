package com.collegeevent.dto;

import java.time.LocalDateTime;

public class RegistrationResponseDTO {

    private Long registrationId;

    private Long userId;
    private String studentName;
    private String studentEmail;

    private Long eventId;
    private String eventTitle;

    private LocalDateTime registrationDate;

    private String status;

    private String remarks;

    public RegistrationResponseDTO() {
    }

    public RegistrationResponseDTO(Long registrationId,
                                   Long userId,
                                   String studentName,
                                   String studentEmail,
                                   Long eventId,
                                   String eventTitle,
                                   LocalDateTime registrationDate,
                                   String status,
                                   String remarks) {

        this.registrationId = registrationId;
        this.userId = userId;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.registrationDate = registrationDate;
        this.status = status;
        this.remarks = remarks;
    }

    public Long getRegistrationId() {
        return registrationId;
    }

    public void setRegistrationId(Long registrationId) {
        this.registrationId = registrationId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}