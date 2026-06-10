package com.bms.BookMyShow.Controller;

import com.bms.BookMyShow.Service.BookingService;
import com.bms.BookMyShow.dto.BookingRequestDto;
import com.bms.BookMyShow.dto.Bookingdto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/bookings")
@RequiredArgsConstructor // Automatically injects the final bookingService bean
public class BookingController {

    private final BookingService bookingService; // Added final for constructor injection

    @PostMapping
    public ResponseEntity<Bookingdto> createBooking(@Valid @RequestBody BookingRequestDto bookingrequest){
        return new ResponseEntity<>(bookingService.createBooking(bookingrequest), HttpStatus.CREATED);
    }

    @GetMapping("/{Id}")
    public ResponseEntity<Bookingdto> getBookingById(@PathVariable Long Id){
        return ResponseEntity.ok(bookingService.getBookingbyId(Id));
    }
}
