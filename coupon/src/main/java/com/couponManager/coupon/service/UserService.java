package com.couponManager.coupon.service;

import com.couponManager.coupon.model.User;
import com.couponManager.coupon.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Encode the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Set createdAt timestamp
        user.setCreatedAt(LocalDateTime.now());
        user.setEnabled(true);
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);

        return userRepository.save(user);
    }
    public User authenticateUser(String username, String password) {
        Optional<User> foundUser = userRepository.findByUsername(username);
        if (foundUser.isPresent() && passwordEncoder.matches(password, foundUser.get().getPassword())) {
            return foundUser.get();
        }
        throw new RuntimeException("Invalid username or password");
    }
}
