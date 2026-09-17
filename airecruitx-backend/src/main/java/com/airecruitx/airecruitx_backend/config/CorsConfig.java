package com.airecruitx.airecruitx_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        // Allow local development and deployed frontend
     configuration.setAllowedOrigins(
        List.of(
                "http://localhost:5173",
                "https://airecruitx-frontend-production.up.railway.app"
        )
);

        // Allow HTTP methods
        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "OPTIONS"
                )
        );

        // Allow request headers, including Authorization
        configuration.setAllowedHeaders(
                List.of("*")
        );

        // Allow cookies and authorization credentials
        configuration.setAllowCredentials(true);

        // Register CORS configuration for all endpoints
        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}