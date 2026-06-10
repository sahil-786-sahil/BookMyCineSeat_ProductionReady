package com.bms.BookMyShow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class showSeatDto {

    private Long id;
    private Double price;
    private SeatDto seat;;
    private String status;
}
