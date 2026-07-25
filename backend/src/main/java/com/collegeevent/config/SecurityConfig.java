package com.collegeevent.config;

import com.collegeevent.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http

                // Enable CORS
                .cors(cors -> {})
                // Disable CSRF
                .csrf(csrf -> csrf.disable())

                // Stateless Session
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Authorization Rules
                .authorizeHttpRequests(auth -> auth

                        // =========================
                        // PUBLIC APIs
                        // =========================
                                .requestMatchers(
                                        "/api/auth/login",
                                        "/api/auth/register"
                                ).permitAll()
                                .requestMatchers("/api/auth/me")
                                .authenticated()
                        .requestMatchers("/error").permitAll()

                        // =========================
                        // ADMIN APIs
                        // =========================
                        .requestMatchers(
                                "/api/dashboard/**",
                                "/api/reports/**",
                                "/api/analytics/**"
                        ).hasRole("ADMIN")

                        // =========================
                        // EVENT MANAGEMENT
                        // ADMIN & ORGANIZER
                        // =========================
                        .requestMatchers("/api/events/**")
                        .hasAnyRole("ADMIN", "ORGANIZER")

                        // =========================
                        // STUDENT REGISTRATION
                        // =========================
                                .requestMatchers(HttpMethod.POST, "/api/registrations")
                                .hasRole("STUDENT")

// Student, Organizer and Admin can view registrations
                                .requestMatchers(HttpMethod.GET, "/api/registrations")
                                .hasAnyRole("STUDENT", "ORGANIZER", "ADMIN")

                                .requestMatchers(HttpMethod.GET, "/api/registrations/**")
                                .hasAnyRole("STUDENT", "ORGANIZER", "ADMIN")

// Organizer and Admin can delete registrations
                                .requestMatchers(HttpMethod.DELETE, "/api/registrations/**")
                                .hasAnyRole("ORGANIZER", "ADMIN")

                        // =========================
                        // VOLUNTEER MANAGEMENT
                        // =========================

                                // Student can apply as a volunteer
                                .requestMatchers(HttpMethod.POST, "/api/volunteers")
                                .hasRole("STUDENT")

                                // Organizer and Admin can view volunteer applications
                                .requestMatchers(HttpMethod.GET, "/api/volunteers")
                                .hasAnyRole("ORGANIZER", "ADMIN")

                                .requestMatchers(HttpMethod.GET, "/api/volunteers/**")
                                .hasAnyRole("ORGANIZER", "ADMIN")

                                // Organizer and Admin can approve/reject applications
                                .requestMatchers(HttpMethod.PUT, "/api/volunteers/**")
                                .hasAnyRole("ORGANIZER", "ADMIN")

                                // Organizer and Admin can delete volunteer applications
                                .requestMatchers(HttpMethod.DELETE, "/api/volunteers/**")
                                .hasAnyRole("ORGANIZER", "ADMIN")

                        // =========================
                        // ALL OTHER APIs
                        // =========================
                        .anyRequest().authenticated()
                )

                // JWT Filter
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )

                // HTTP Basic
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}