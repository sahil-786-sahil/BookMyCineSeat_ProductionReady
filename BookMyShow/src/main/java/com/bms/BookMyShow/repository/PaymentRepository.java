package com.bms.BookMyShow.repository;

import com.bms.BookMyShow.Entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment,Long> {


    @Query("SELECT p FROM Payment p WHERE p.transaction_Id = :transactionId")
    Optional<Payment> findByTransactionId(@Param("transactionId") String transactionId);
}
