package com.bms.BookMyShow.Controller;

import com.bms.BookMyShow.Service.MovieService;
import com.bms.BookMyShow.dto.MovieDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @PostMapping
    public ResponseEntity<MovieDto> createMovie(@Valid @RequestBody MovieDto movieDto){
        return new ResponseEntity<>(movieService.createMovie(movieDto), HttpStatus.CREATED);
    }

    @GetMapping("/{Id}")
    public ResponseEntity<MovieDto> getMovieById(@PathVariable Long Id) {
        return ResponseEntity.ok(movieService.getMoviebyId(Id));
    }

    @GetMapping
    public ResponseEntity<List<MovieDto>> getAllMovies(){
        return ResponseEntity.ok(movieService.getAllMovies());
    }
}
