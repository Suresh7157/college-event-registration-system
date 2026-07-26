package com.collegeevent.repository;

import com.collegeevent.entity.User;
import com.collegeevent.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

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
}