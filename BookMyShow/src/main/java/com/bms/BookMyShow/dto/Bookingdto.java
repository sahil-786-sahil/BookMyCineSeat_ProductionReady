package com.bms.BookMyShow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bookingdto {
    private Long id;
    private String bookingNumber;
    private LocalDateTime bookingTime;
    private UserDto user;
    private String status;
    private ShowDto show;
    private Double totalAmount;
    private List<showSeatDto> Seats;
    private PaymentDto payment;
}
