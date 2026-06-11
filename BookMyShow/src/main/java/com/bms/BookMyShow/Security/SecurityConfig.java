package com.bms.BookMyShow.Security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

   @Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // Crucial for stateless REST APIs using JWT
        .authorizeHttpRequests(auth -> auth
            // 1. Let ANYONE visit your root URL layout without a 403 error
            .requestMatchers("/").permitAll()
            
            // 2. Let ANYONE handle authentication (Signup, Signin, Registration)
            .requestMatchers("/api/v1/auth/**").permitAll() 
            
            // 3. Let ANYONE view movies, shows, and screens (Public Browsing)
            .requestMatchers(HttpMethod.GET, "/api/v1/movies/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/v1/shows/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/v1/screens/**").permitAll()
            
            // 4. LOCK everything else! (Booking seats, making payments requires a token)
            // Any POST request to /api/v1/bookings will automatically demand Login/Signup
            .anyRequest().authenticated()
        )
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
}
}
