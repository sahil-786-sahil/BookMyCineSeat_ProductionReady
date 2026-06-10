package com.bms.BookMyShow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                  // This automatically generates getEmail() and getPassword()
@NoArgsConstructor    // Generates the default constructor
@AllArgsConstructor   // Generates the parameterized constructor
public class LoginRequestDto {

    private String email;
    private String password;
}