package com.quizai.backend.service;

import com.quizai.backend.dto.QuizQuestion;
import com.quizai.backend.dto.QuizRequest;
import com.quizai.backend.questionbank.ReactQuestions;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuizService {

        public List<QuizQuestion> generateQuestions(QuizRequest request) {

                List<QuizQuestion> questions;

                switch (request.getCategory()) {

                        case "React":
                                questions = new ArrayList<>(ReactQuestions.getQuestions());
                                break;

                        default:
                                questions = new ArrayList<>(ReactQuestions.getQuestions());
                }

                // Shuffle questions randomly
                Collections.shuffle(questions);

                // Return only the requested number of questions
                int count = Math.min(request.getQuestionCount(), questions.size());

                return questions.subList(0, count);
        }
}