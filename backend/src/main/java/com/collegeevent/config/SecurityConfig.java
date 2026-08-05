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
                        .requestMatchers("/api/auth/**").permitAll()
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
                        .requestMatchers("/api/registrations/**")
                        .hasRole("STUDENT")

                        // =========================
                        // VOLUNTEER MANAGEMENT
                        // =========================

                        // Student can apply for volunteer
                        .requestMatchers(HttpMethod.POST, "/api/volunteers")
                        .hasRole("STUDENT")

                        // Admin & Volunteer can view
                        .requestMatchers(HttpMethod.GET, "/api/volunteers/**")
                        .hasAnyRole("ADMIN", "VOLUNTEER")

                        // Only Admin can update
                        .requestMatchers(HttpMethod.PUT, "/api/volunteers/**")
                        .hasRole("ADMIN")

                        // Only Admin can delete
                        .requestMatchers(HttpMethod.DELETE, "/api/volunteers/**")
                        .hasRole("ADMIN")

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