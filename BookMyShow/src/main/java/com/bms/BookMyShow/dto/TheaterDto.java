package com.bms.BookMyShow.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TheaterDto {

    private Long id;

    private String name;

    private String city;
    private String adress;
    private Integer totalScreen;

}
