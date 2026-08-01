package com.quizai.backend.controller;

import com.quizai.backend.dto.QuizQuestion;
import com.quizai.backend.dto.QuizRequest;
import com.quizai.backend.service.GroqService;
import com.quizai.backend.service.QuizService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
// @CrossOrigin(origins = "http://localhost:5173")
public class QuizController {

    private final QuizService quizService;
    private final GroqService groqService;

    public QuizController(QuizService quizService, GroqService groqService) {
        this.quizService = quizService;
        this.groqService = groqService;
    }

    @GetMapping("/test")
    public String test() {
        return "Backend Running Successfully 🚀";
    }

    @PostMapping("/generate")
    public List<QuizQuestion> generateQuiz(@RequestBody QuizRequest request) {
        return quizService.generateQuestions(request);
    }
}