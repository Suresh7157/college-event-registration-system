package com.collegeevent.repository;

import com.collegeevent.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    boolean existsByUserIdAndEventId(Long userId, Long eventId);

}