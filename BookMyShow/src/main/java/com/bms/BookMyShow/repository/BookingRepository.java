package com.bms.BookMyShow.repository;

import com.bms.BookMyShow.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking,Long> {

    List<Booking> findByUserId(Long userId);

    Optional<Booking> findByBookingNumber(String BookingNumber);

    List<Booking> findByShowId(Long id);
}
