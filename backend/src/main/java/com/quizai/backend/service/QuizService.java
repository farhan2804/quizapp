package com.quizai.backend.service;

import com.quizai.backend.dto.QuizQuestion;
import com.quizai.backend.dto.QuizRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizService {

   public List<QuizQuestion> generateQuestions(QuizRequest request) {

    List<QuizQuestion> questions = new ArrayList<>();

    questions.add(new QuizQuestion(
            "Which hook is used for state management in React?",
            "useEffect",
            "useState",
            "useMemo",
            "useRef",
            "optionB"
    ));

    questions.add(new QuizQuestion(
            "Which company developed Java?",
            "Microsoft",
            "Google",
            "Sun Microsystems",
            "Apple",
            "optionC"
    ));

    questions.add(new QuizQuestion(
            "Which keyword is used to inherit a class in Java?",
            "implements",
            "inherits",
            "extends",
            "super",
            "optionC"
    ));

    return questions;
}

}