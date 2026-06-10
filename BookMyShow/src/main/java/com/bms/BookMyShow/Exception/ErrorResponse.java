package com.bms.BookMyShow.Exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private Date Timestamp;
    private int status;
    private String error;
    private String messege;
    private String path;
}
