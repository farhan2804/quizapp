package com.quizai.backend.dto;

import lombok.Data;

@Data
public class QuizRequest {

    private String category;

    private String difficulty;

    private int questionCount;

}