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

                        // =========================
                        // EVENT MANAGEMENT
                        // =========================
                        .requestMatchers("/api/events/**")
                        .hasAnyRole("ADMIN", "ORGANIZER")

                        // =========================
                        // =========================
                        .requestMatchers("/api/registrations/**")
                        .hasRole("STUDENT")

                        // =========================
                        // =========================
                        .requestMatchers(HttpMethod.POST, "/api/volunteers")
                        .hasRole("STUDENT")

                        .requestMatchers(HttpMethod.GET, "/api/volunteers/**")
                        .hasAnyRole("ADMIN", "VOLUNTEER")

                        .requestMatchers(HttpMethod.PUT, "/api/volunteers/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/api/volunteers/**")
                        .hasRole("ADMIN")

                        // =========================
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