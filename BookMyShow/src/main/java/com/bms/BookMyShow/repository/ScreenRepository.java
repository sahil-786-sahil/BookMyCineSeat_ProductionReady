package com.bms.BookMyShow.repository;

import com.bms.BookMyShow.Entity.Screen;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScreenRepository extends JpaRepository<Screen,Long> {
    List<Screen> findByTheaterId(Long theaterId);
}
