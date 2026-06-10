package com.bms.BookMyShow.repository;


import com.bms.BookMyShow.Entity.ShowSeat;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ShowSeatRepository extends JpaRepository<ShowSeat, Long> {
//    List<findByShowId(Long showId);
    List<ShowSeat> findByShowIdAndStatus(Long showId, String status);

    // CRITICAL FOR LIVE DEPLOYMENT: Prevents race conditions / double booking
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM ShowSeat s WHERE s.id IN :ids")
    List<ShowSeat> findAllByIdWithPessimisticLock(@Param("ids") List<Long> ids);
}