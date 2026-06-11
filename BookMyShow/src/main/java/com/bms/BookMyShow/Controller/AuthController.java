package com.bms.BookMyShow.Controller;

import com.bms.BookMyShow.Security.JwtTokenProvider;
import com.bms.BookMyShow.Service.UserService;
import com.bms.BookMyShow.dto.LoginRequestDto;
import com.bms.BookMyShow.dto.RegistrationRequestDto;
import com.bms.BookMyShow.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody RegistrationRequestDto regDto) {
        UserDto userDto = new UserDto();
        userDto.setName(regDto.getName());
        userDto.setEmail(regDto.getEmail());
        userDto.setPhoneNumber(regDto.getPhoneNumber());

        // Call the complete UserService that handles encryption
        UserDto createdUser = userService.registerUser(userDto, regDto.getPassword());
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginRequestDto loginDto) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok("Bearer " + jwtToken);
    }
}
