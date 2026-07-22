package com.collegeevent.entity;

import com.collegeevent.enums.VolunteerStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Volunteer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    private String assignedRole;

    @Enumerated(EnumType.STRING)
    private VolunteerStatus status;

    @ManyToOne
    @JoinColumn(name = "assigned_by")
    private User assignedBy;
}