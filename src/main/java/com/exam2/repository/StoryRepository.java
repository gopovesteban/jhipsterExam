package com.exam2.repository;

import com.exam2.domain.Story;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Story entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {

}
