package com.example.demo.story.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.story.model.Story;

public interface StoryRepository extends JpaRepository<Story, Integer>{

}
