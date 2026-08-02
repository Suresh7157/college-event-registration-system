package com.collegeevent.repository;

import com.collegeevent.entity.User;
import com.collegeevent.enums.Role;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);
    List<User> findByFullNameContainingIgnoreCase(String keyword);

    List<User> findByRole(Role role);

    List<User> findByRoleAndFullNameContainingIgnoreCase(Role role, String keyword);
    @Query("""
SELECT u.department, COUNT(u)
FROM User u
GROUP BY u.department
""")
    List<Object[]> getUsersByDepartment();
}