package com.bms.BookMyShow.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {

    private Long id;

    private String transaction_Id;

    private Double amount;

    private LocalDateTime paymentTime;

    private String paymentMethod;

    private String status;

}
