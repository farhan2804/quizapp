package com.quizai.backend.service;

import com.quizai.backend.dto.QuizQuestion;
import com.quizai.backend.dto.QuizRequest;
import com.quizai.backend.questionbank.ReactQuestions;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class QuizService {

    private final GroqService groqService;

    public QuizService(GroqService groqService) {
        this.groqService = groqService;
    }

    public List<QuizQuestion> generateQuestions(QuizRequest request) {

        try {

            // Generate AI Questions
            return groqService.generateQuestions(request);

        } catch (Exception e) {

            System.out.println("AI Failed. Using Static Questions...");

            List<QuizQuestion> questions;

            switch (request.getCategory()) {

                case "React":
                    questions = new ArrayList<>(ReactQuestions.getQuestions());
                    break;

                default:
                    questions = new ArrayList<>(ReactQuestions.getQuestions());
            }

            Collections.shuffle(questions);

            int count = Math.min(
                    request.getQuestionCount(),
                    questions.size()
            );

            return questions.subList(0, count);
        }
    }
}