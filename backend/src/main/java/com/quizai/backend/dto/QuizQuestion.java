package com.quizai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizQuestion {

    private String ques;

    private String optionA;

    private String optionB;

    private String optionC;

    private String optionD;

    private String ans;

}