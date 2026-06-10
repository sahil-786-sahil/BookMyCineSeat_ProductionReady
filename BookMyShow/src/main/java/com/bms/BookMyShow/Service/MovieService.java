package com.bms.BookMyShow.Service;

import com.bms.BookMyShow.Entity.Movie;
import com.bms.BookMyShow.dto.MovieDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bms.BookMyShow.repository.MovieRepository;
import com.bms.BookMyShow.Exception.ResourseNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
     private MovieRepository movieRepository;

    public MovieDto createMovie(MovieDto moviedto){
        Movie movie=maptoEntity(moviedto);
        Movie savemovie=movieRepository.save(movie);
        return maptoDto(savemovie);
    }
    public Movie maptoEntity(MovieDto movieDto){
        Movie movie=new Movie();
        movie.setDescriiption(movieDto.getDescriiption());
        movie.setDurationmins(movieDto.getDurationmins());
        movie.setLanguage(movieDto.getLanguage());
        movie.setGenre(movieDto.getGenre());
        movie.setTitle(movieDto.getTitle());
        movie.setPosterUrl(movieDto.getPosterUrl());
        movie.setRealiseDate(movieDto.getRealiseDate());
        return movie;
    }
    private MovieDto maptoDto(Movie movie){
        MovieDto movieDto=new MovieDto();
        movieDto.setId(movie.getId());
        movieDto.setDescriiption(movie.getDescriiption());
        movieDto.setDurationmins(movie.getDurationmins());
        movieDto.setLanguage(movie.getLanguage());
        movieDto.setGenre(movie.getGenre());
        movieDto.setTitle(movie.getTitle());
        movieDto.setPosterUrl(movie.getPosterUrl());
        movieDto.setRealiseDate(movie.getRealiseDate());
        return movieDto;
    }
    public MovieDto getMoviebyId(Long Id){
       Movie movie=movieRepository.findById(Id)
               .orElseThrow((()->new ResourseNotFoundException("Movie not found with id:"+Id)));
       return maptoDto(movie);
    }
    public List<MovieDto> getAllMovies(){
        List<Movie> movies=movieRepository.findAll();
        return movies.stream()
                .map(this::maptoDto)
                .collect(Collectors.toList());
    }
    public List<MovieDto> getMovieByLanguage(String language){
        List<Movie> movies=movieRepository.findByLanguage(language);
        return movies.stream()
                .map(this::maptoDto)
                .collect(Collectors.toList());
    }
    public List<MovieDto> getMovieByGenre(String genre){
        List<Movie> movies=movieRepository.findBygenre(genre);
        return movies.stream()
                .map(this::maptoDto)
                .collect(Collectors.toList());
    }
    public List<MovieDto> searchMovies(String title){
        List<Movie> movies=movieRepository.findByLanguage(title);
        return movies.stream()
                .map(this::maptoDto)
                .collect(Collectors.toList());
    }

    public MovieDto updateMovie(Long Id,MovieDto movieDto){
        Movie movie=movieRepository.findById(Id)
                .orElseThrow((()->new ResourseNotFoundException("Movie not found with id:"+Id)));
        movie.setDescriiption(movieDto.getDescriiption());
        movie.setDurationmins(movieDto.getDurationmins());
        movie.setLanguage(movieDto.getLanguage());
        movie.setGenre(movieDto.getGenre());
        movie.setTitle(movieDto.getTitle());
        movie.setPosterUrl(movieDto.getPosterUrl());
        movie.setRealiseDate(movieDto.getRealiseDate());
        Movie updatedMovie=movieRepository.save(movie);
        return maptoDto(updatedMovie);
    }

     public void deleteMovie(Long id){
         Movie movie=movieRepository.findById(id)
                 .orElseThrow((()->new ResourseNotFoundException("Movie not found with id:"+id)));
         movieRepository.delete(movie);
     }
}
