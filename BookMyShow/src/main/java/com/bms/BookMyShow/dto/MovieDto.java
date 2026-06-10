package com.bms.BookMyShow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDto {

    private Long id;
    private String title;
    private String descriiption;
    private String language;
    private String genre;
    private Integer durationmins;
    private String realiseDate;
    private String posterUrl;
}
