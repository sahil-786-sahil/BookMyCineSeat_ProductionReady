package com.bms.BookMyShow.Service;

import com.bms.BookMyShow.Entity.*;
import com.bms.BookMyShow.dto.*;
import com.bms.BookMyShow.repository.*;
import com.bms.BookMyShow.Exception.ResourseNotFoundException;
import com.bms.BookMyShow.Exception.SeatUnavailableException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Best Practice: Constructor injection over @Autowired field injection
public class BookingService {

    private final UserRepository userRepository;
    private final ShowRepository showRepository;
    private final ShowSeatRepository showSeatRepository;
    private final BookingRepository bookingRepository;

    @Transactional
    public Bookingdto createBooking(BookingRequestDto bookingRequestDto) {
        User user = userRepository.findById(bookingRequestDto.getUserId())
                .orElseThrow(() -> new ResourseNotFoundException("User not found"));
        Show show = showRepository.findById(bookingRequestDto.getShowId())
                .orElseThrow(() -> new ResourseNotFoundException("Show not found"));

        // Acquire explicit database pessimistic lock to prevent concurrent double-booking
        List<ShowSeat> selectedSeats = showSeatRepository.findAllByIdWithPessimisticLock(bookingRequestDto.getSeatIds());

        if (selectedSeats.size() != bookingRequestDto.getSeatIds().size()) {
            throw new ResourseNotFoundException("One or more selected seats do not exist.");
        }

        for (ShowSeat seat : selectedSeats) {
            if (!"AVAILABLE".equalsIgnoreCase(seat.getStatus())) {
                throw new SeatUnavailableException("Seat " + seat.getSeat().getSeatNumber() + " is already occupied or locked.");
            }
            // Temporarily lock the seat state during checkout processing
            seat.setStatus("LOCKED");
        }
        showSeatRepository.saveAll(selectedSeats);

        Double totalAmount = selectedSeats.stream().mapToDouble(ShowSeat::getPrice).sum();

        Payment payment = new Payment();
        payment.setAmount(totalAmount);
        payment.setPaymentTime(LocalDateTime.now());
        payment.setPaymentMethod(bookingRequestDto.getPaymentMethod());
        payment.setStatus("SUCCESS"); // In production, this shifts to PENDING until payment provider gateway callback triggers
        payment.setTransaction_Id(UUID.randomUUID().toString());

        Booking booking = new Booking();
        booking.setShow(show);
        booking.setStatus("CONFIRMED");
        booking.setTotalAmount(totalAmount);
        booking.setUser(user);
        booking.setBookingNumber("BKG-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        booking.setBookingTime(LocalDateTime.now());
        booking.setPayment(payment);

        Booking savedBooking = bookingRepository.save(booking);

        selectedSeats.forEach(seat -> {
            seat.setStatus("BOOKED");
            seat.setBooking(savedBooking);
        });
        showSeatRepository.saveAll(selectedSeats);

        return mapToBookingDto(savedBooking, selectedSeats);
    }

    @Transactional(readOnly = true)
    public Bookingdto getBookingbyId(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Booking not found"));
        return mapToBookingDto(booking, booking.getShowSeats());
    }

    @Transactional
    public Bookingdto bookingCancel(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Booking not found"));

        if ("CANCELLED".equals(booking.getStatus())) {
            throw new IllegalStateException("Booking is already cancelled.");
        }

        booking.setStatus("CANCELLED");
        List<ShowSeat> seats = booking.getShowSeats();
        seats.forEach(seat -> {
            seat.setStatus("AVAILABLE");
            seat.setBooking(null);
        });

        if (booking.getPayment() != null) {
            booking.getPayment().setStatus("REFUNDED");
        }

        Booking updatedBooking = bookingRepository.save(booking);
        showSeatRepository.saveAll(seats);
        return mapToBookingDto(updatedBooking, seats);
    }

    private Bookingdto mapToBookingDto(Booking booking, List<ShowSeat> seats) {
        Bookingdto dto = new Bookingdto();
        dto.setId(booking.getId());
        dto.setBookingNumber(booking.getBookingNumber());
        dto.setBookingTime(booking.getBookingTime());
        dto.setStatus(booking.getStatus());
        dto.setTotalAmount(booking.getTotalAmount());

        UserDto userDto = new UserDto();
        userDto.setId(booking.getUser().getId());
        userDto.setName(booking.getUser().getName());
        userDto.setEmail(booking.getUser().getEmail());
        userDto.setPhoneNumber(booking.getUser().getPhoneNumber());
        dto.setUser(userDto);

        ShowDto showDto = new ShowDto();
        showDto.setId(booking.getShow().getId());
        showDto.setStartTime(booking.getShow().getStartTime());
        showDto.setEndTime(booking.getShow().getEndTime());

        MovieDto movieDto = new MovieDto();
        movieDto.setId(booking.getShow().getMovie().getId());
        movieDto.setTitle(booking.getShow().getMovie().getTitle());
        movieDto.setDescriiption(booking.getShow().getMovie().getDescriiption());
        movieDto.setGenre(booking.getShow().getMovie().getGenre());
        movieDto.setLanguage(booking.getShow().getMovie().getLanguage());
        movieDto.setDurationmins(booking.getShow().getMovie().getDurationmins());
        movieDto.setRealiseDate(booking.getShow().getMovie().getRealiseDate());
        movieDto.setPosterUrl(booking.getShow().getMovie().getPosterUrl());
        showDto.setMovie(movieDto);

        ScreenDto screenDto = new ScreenDto();
        screenDto.setId(booking.getShow().getScreen().getId());
        screenDto.setName(booking.getShow().getScreen().getName());
        screenDto.setTotalSeats(booking.getShow().getScreen().getTotalSeats());

        TheaterDto theaterDto = new TheaterDto();
        theaterDto.setId(booking.getShow().getScreen().getTheater().getId());
        theaterDto.setName(booking.getShow().getScreen().getTheater().getName());
        theaterDto.setAdress(booking.getShow().getScreen().getTheater().getAdress());
        theaterDto.setCity(booking.getShow().getScreen().getTheater().getCity());
        theaterDto.setTotalScreen(booking.getShow().getScreen().getTheater().getTotalScreen());

        screenDto.setTheater(theaterDto);
        showDto.setScreen(screenDto);
        dto.setShow(showDto);

        List<showSeatDto> seatDtos = seats.stream().map(seat -> {
            showSeatDto sDto = new showSeatDto();
            sDto.setId(seat.getId());
            sDto.setStatus(seat.getStatus());
            sDto.setPrice(seat.getPrice());

            SeatDto baseSeat = new SeatDto();
            baseSeat.setId(seat.getSeat().getId());
            baseSeat.setSeatNumber(seat.getSeat().getSeatNumber());
            baseSeat.setBasePrice(seat.getSeat().getBasePrice());
            baseSeat.setSeatType(seat.getSeat().getSeatType());
            sDto.setSeat(baseSeat);
            return sDto;
        }).collect(Collectors.toList());
        dto.setSeats(seatDtos);

        if (booking.getPayment() != null) {
            PaymentDto pDto = new PaymentDto();
            pDto.setId(booking.getPayment().getId());
            pDto.setStatus(booking.getPayment().getStatus());
            pDto.setPaymentTime(booking.getPayment().getPaymentTime());
            pDto.setAmount(booking.getPayment().getAmount());
            pDto.setPaymentMethod(booking.getPayment().getPaymentMethod());
            pDto.setTransaction_Id(booking.getPayment().getTransaction_Id());
            dto.setPayment(pDto);
        }
        return dto;
    }
}