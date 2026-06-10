package com.bms.BookMyShow.Service;

import com.bms.BookMyShow.Entity.*;
import com.bms.BookMyShow.dto.*;
import com.bms.BookMyShow.repository.*;
import com.bms.BookMyShow.Exception.ResourseNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShowService {

    private final MovieRepository movieRepository;
    private final ScreenRepository screenRepository;
    private final ShowRepository showRepository;
    private final ShowSeatRepository showSeatRepository;

    @Transactional
    public ShowDto createShow(ShowDto showDto) {
        Show show = new Show();
        Movie movie = movieRepository.findById(showDto.getMovie().getId())
                .orElseThrow(() -> new ResourseNotFoundException("Movie not found"));
        // FIXED BUG: Corrected referencing target from Movie ID to Screen ID
        Screen screen = screenRepository.findById(showDto.getScreen().getId())
                .orElseThrow(() -> new ResourseNotFoundException("Screen not found"));

        show.setMovie(movie);
        show.setScreen(screen);
        show.setStartTime(showDto.getStartTime());
        show.setEndTime(showDto.getEndTime());

        Show savedShow = showRepository.save(show);

        // When creating a new show, generate default ShowSeat instances based on Screen master seats setup
        if (screen.getSeats() != null) {
            List<ShowSeat> initialSeats = screen.getSeats().stream().map(masterSeat -> {
                ShowSeat showSeat = new ShowSeat();
                showSeat.setShow(savedShow);
                showSeat.setSeat(masterSeat);
                showSeat.setPrice(masterSeat.getBasePrice()); // Default pricing strategy configuration
                showSeat.setStatus("AVAILABLE");
                return showSeat;
            }).collect(Collectors.toList());
            showSeatRepository.saveAll(initialSeats);
        }

        List<ShowSeat> availableSeats = showSeatRepository.findByShowIdAndStatus(savedShow.getId(), "AVAILABLE");
        return maptoDto(savedShow, availableSeats);
    }

    @Transactional(readOnly = true)
    public ShowDto findById(Long id) {
        Show show = showRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Show not found"));
        List<ShowSeat> availableSeats = showSeatRepository.findByShowIdAndStatus(show.getId(), "AVAILABLE");
        return maptoDto(show, availableSeats);
    }

    private ShowDto maptoDto(Show show, List<ShowSeat> availableSeat) {
        ShowDto showDto = new ShowDto();
        showDto.setId(show.getId());
        showDto.setStartTime(show.getStartTime());
        showDto.setEndTime(show.getEndTime());
        showDto.setMovie(new MovieDto(
                show.getMovie().getId(), show.getMovie().getTitle(), show.getMovie().getDescriiption(),
                show.getMovie().getLanguage(), show.getMovie().getGenre(), show.getMovie().getDurationmins(),
                show.getMovie().getRealiseDate(), show.getMovie().getPosterUrl()
        ));

        TheaterDto theaterDto = new TheaterDto(
                show.getScreen().getTheater().getId(), show.getScreen().getTheater().getName(),
                show.getScreen().getTheater().getCity(), show.getScreen().getTheater().getAdress(),
                show.getScreen().getTheater().getTotalScreen()
        );

        showDto.setScreen(new ScreenDto(
                show.getScreen().getId(), show.getScreen().getName(), show.getScreen().getTotalSeats(), theaterDto
        ));

        List<showSeatDto> seatDtos = availableSeat.stream().map(seat -> {
            showSeatDto seatdto = new showSeatDto();
            seatdto.setId(seat.getId());
            seatdto.setStatus(seat.getStatus());
            seatdto.setPrice(seat.getPrice());

            SeatDto baseseatDto = new SeatDto();
            baseseatDto.setId(seat.getSeat().getId());
            baseseatDto.setSeatNumber(seat.getSeat().getSeatNumber());
            baseseatDto.setSeatType(seat.getSeat().getSeatType());
            baseseatDto.setBasePrice(seat.getSeat().getBasePrice());
            seatdto.setSeat(baseseatDto);
            return seatdto;
        }).collect(Collectors.toList());

        showDto.setAvailableseats(seatDtos);
        return showDto;
    }
}
