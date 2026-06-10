package com.bms.BookMyShow.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="show_seats")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "show_id",nullable = false)
    private Show show;

    @Column(nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "seat_id",nullable = false)
    private Seat seat;


    @ManyToOne(fetch = FetchType.LAZY, optional = true) // Allow a seat to exist without a booking
    @JoinColumn(name = "booking_id", nullable = true)    // Marks the column as NULL in MySQL
    private Booking booking;


    @Column(nullable = false)
    private String status;
}
