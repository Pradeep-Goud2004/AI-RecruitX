package com.airecruitx.airecruitx_backend.config;

import com.airecruitx.airecruitx_backend.security.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )
            .authorizeHttpRequests(auth -> auth

                // Allow browser CORS preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Authentication
                .requestMatchers("/api/auth/**").permitAll()

                // Public jobs
                .requestMatchers("/api/jobs/**").permitAll()

                // Candidate endpoints
                .requestMatchers("/api/candidates/**")
                    .hasRole("CANDIDATE")

                .requestMatchers("/api/applications/**")
                    .hasRole("CANDIDATE")

                // Recruiter endpoints
                .requestMatchers("/api/recruiters/**")
                    .hasRole("RECRUITER")

                // Admin endpoints
                .requestMatchers("/api/admin/**")
                    .hasRole("ADMIN")

                // Other authenticated endpoints, including notifications
                .anyRequest().authenticated()
            )
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}