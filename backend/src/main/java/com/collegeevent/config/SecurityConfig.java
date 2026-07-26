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
                .csrf(csrf -> csrf.disable())

                .cors(Customizer.withDefaults())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // Public APIs
                        .requestMatchers(
                                "/api/auth/login",
                                "/api/auth/register"
                        ).permitAll()

                        .requestMatchers("/api/auth/me").authenticated()
                        .requestMatchers("/error").permitAll()

                        // Admin APIs
                        .requestMatchers("/api/admin/**")
                        .hasRole("ADMIN")

                        // Event Management
                        .requestMatchers("/api/events/**")
                        .hasAnyRole("ADMIN", "ORGANIZER")

                        // Student Registration
                        .requestMatchers(HttpMethod.POST, "/api/registrations")
                        .hasRole("STUDENT")

                        .requestMatchers(HttpMethod.GET, "/api/registrations")
                        .hasAnyRole("STUDENT", "ORGANIZER", "ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/registrations/**")
                        .hasAnyRole("STUDENT", "ORGANIZER", "ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/api/registrations/**")
                        .hasAnyRole("ORGANIZER", "ADMIN")

                        // Volunteer Management
                        .requestMatchers(HttpMethod.POST, "/api/volunteers")
                        .hasRole("STUDENT")

                        .requestMatchers(HttpMethod.GET, "/api/volunteers")
                        .hasAnyRole("ORGANIZER", "ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/volunteers/**")
                        .hasAnyRole("ORGANIZER", "ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/api/volunteers/**")
                        .hasAnyRole("ORGANIZER", "ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/api/volunteers/**")
                        .hasAnyRole("ORGANIZER", "ADMIN")

                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )

                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}