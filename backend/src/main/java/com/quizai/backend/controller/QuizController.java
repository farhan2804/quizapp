package com.quizai.backend.controller;

import com.quizai.backend.dto.QuizQuestion;
import com.quizai.backend.dto.QuizRequest;
import com.quizai.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/test")
    public String test() {
        return "Backend Running Successfully 🚀";
    }

    @PostMapping("/generate")
    public List<QuizQuestion> generateQuiz(
            @RequestBody QuizRequest request) {

        return quizService.generateQuestions(request);
    }
}