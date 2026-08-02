package com.collegeevent.repository;

import com.collegeevent.entity.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Long>
{
    @Query("""
SELECT v.status, COUNT(v)
FROM Volunteer v
GROUP BY v.status
""")
    List<Object[]> getVolunteerStatus();
}