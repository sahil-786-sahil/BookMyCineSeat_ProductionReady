package com.bms.BookMyShow.Service;

import com.bms.BookMyShow.Entity.User;
import com.bms.BookMyShow.dto.UserDto;
import com.bms.BookMyShow.repository.UserRepository;
import com.bms.BookMyShow.Exception.ResourseNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Automatically handles Constructor Injection for fields marked final
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    /**
     * Spring Security infrastructure method.
     * Loads the user credentials directly from the database by email during authentication.
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Maps our custom database User entity directly to Spring Security's User core object
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword()) // Employs the encrypted bcrypt string
                .authorities("ROLE_USER")      // Sets default role authorities mapping context
                .build();
    }

    /**
     * Registers a brand new user while securely hashing their raw password.
     */
    @Transactional
    public UserDto registerUser(UserDto userDto, String rawPassword) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new IllegalArgumentException("An account with this email address already exists.");
        }

        User user = new User();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());

        // CRITICAL SECURITY FIX: Never store passwords in plain text! Hashing with BCrypt.
        user.setPassword(passwordEncoder.encode(rawPassword));

        User savedUser = userRepository.save(user);
        return mapToDto(savedUser);
    }

    @Transactional(readOnly = true)
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("User Not Found with id: " + id));
        return mapToDto(user);
    }

    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDto updateUser(Long userId, UserDto userDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourseNotFoundException("User not Found with id: " + userId));

        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());

        User updatedUser = userRepository.save(user);
        return mapToDto(updatedUser);
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourseNotFoundException("User not found with id: " + userId));
        userRepository.delete(user);
    }

    // --- Object Mapping Data Transformations ---

    private User mapToEntity(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setEmail(userDto.getEmail());
        return user;
    }

    private UserDto mapToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setPhoneNumber(user.getPhoneNumber());
        // FIXED TYPO: Now correctly reads from entity user object instead of running into recursion loop
        userDto.setEmail(user.getEmail());
        return userDto;
    }
}
