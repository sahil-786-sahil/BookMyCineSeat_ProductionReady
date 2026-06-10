package com.bms.BookMyShow.repository;

import com.bms.BookMyShow.Entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie,Long> {
    List<Movie> findByLanguage(String language);

    List<Movie> findBygenre(String genre);

    List<Movie> findByTitleContaining(String title);
}
