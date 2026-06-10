package com.bms.BookMyShow.Service;

import com.bms.BookMyShow.Entity.Theater;
import com.bms.BookMyShow.dto.TheaterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bms.BookMyShow.repository.TheaterRepository;
import com.bms.BookMyShow.Exception.ResourseNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TheaterService {

    @Autowired
    private TheaterRepository theaterRepository;

    public TheaterDto createTheater(TheaterDto theaterDto){
        Theater theater=mapToEntity(theaterDto);
        Theater savedTheater=theaterRepository.save(theater);
        return mapToDto(savedTheater);
    }
    private TheaterDto getTheaterById(Long id){
        Theater theater=theaterRepository.findById(id)
                .orElseThrow(()->new ResourseNotFoundException("Theater not found"));
        return mapToDto(theater);
    }
    private List<TheaterDto> getAllTheater(){
        List<Theater> theaters=theaterRepository.findAll();
         return theaters.stream()
                .map(this::mapToDto)
                 .collect(Collectors.toList());
    }
    private List<TheaterDto> getAllTheaterByCity(String city){
        List<Theater> theaters=theaterRepository.findByCity(city);
        return theaters.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private TheaterDto updateTheater(Long theaterId,TheaterDto theaterDto){
        Theater theater=theaterRepository.findById(theaterId)
                .orElseThrow(()-> new ResourseNotFoundException("Theater not found"));
        theater.setId(theaterDto.getId());
        theater.setName(theaterDto.getName());
        theater.setCity(theaterDto.getCity());
        theater.setAdress(theaterDto.getAdress());
        theater.setTotalScreen(theaterDto.getTotalScreen());
        return mapToDto(theater);
    }
    private void deleteTheater(Long theaterId){
        Theater theater=theaterRepository.findById(theaterId)
                .orElseThrow(()-> new ResourseNotFoundException("Theater not found"));
        theaterRepository.delete(theater);
    }
    public Theater mapToEntity(TheaterDto theaterDto){
        Theater theater=new Theater();
        theater.setName(theaterDto.getName());
        theater.setCity(theaterDto.getCity());
        theater.setAdress(theaterDto.getAdress());
        return theater;
    }
    public TheaterDto mapToDto(Theater theater){
        TheaterDto theaterDto=new TheaterDto();
        theaterDto.setId(theater.getId());
        theaterDto.setName(theater.getName());
        theaterDto.setAdress(theater.getAdress());
        theaterDto.setCity(theater.getCity());
        theaterDto.setTotalScreen(theater.getTotalScreen());
        return theaterDto;
    }
}
