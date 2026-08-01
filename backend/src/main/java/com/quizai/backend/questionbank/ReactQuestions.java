package com.quizai.backend.questionbank;

import com.quizai.backend.dto.QuizQuestion;

import java.util.ArrayList;
import java.util.List;

public class ReactQuestions {

    public static List<QuizQuestion> getQuestions() {

        List<QuizQuestion> questions = new ArrayList<>();

        questions.add(new QuizQuestion(
                "THIS IS STATIC QUESTION TEST",
                "useEffect",
                "useState",
                "useMemo",
                "useRef",
                "optionB"
        ));

        questions.add(new QuizQuestion(
                "Which hook is used for side effects?",
                "useState",
                "useEffect",
                "useMemo",
                "useCallback",
                "optionB"
        ));

        questions.add(new QuizQuestion(
                "Which company developed React?",
                "Google",
                "Meta",
                "Microsoft",
                "Netflix",
                "optionB"
        ));

        questions.add(new QuizQuestion(
                "JSX stands for?",
                "Java Syntax Extension",
                "JavaScript XML",
                "JSON XML",
                "Java Source XML",
                "optionB"
        ));

        questions.add(new QuizQuestion(
                "Which hook is used to store mutable values without re-rendering?",
                "useMemo",
                "useRef",
                "useEffect",
                "useState",
                "optionB"
        ));

        questions.add(new QuizQuestion(
                "Which method is used to render a React application in React 18?",
                "ReactDOM.render()",
                "createRoot().render()",
                "renderApp()",
                "mount()",
                "optionB"
        ));

        questions.add(new QuizQuestion(
                "Props in React are?",
                "Mutable",
                "Read Only",
                "Functions Only",
                "State Variables",
                "optionB"
        ));

        questions.add(new QuizQuestion(
                "Which hook is used to optimize expensive calculations?",
                "useRef",
                "useMemo",
                "useEffect",
                "useState",
                "optionB"
        ));

        questions.add(new QuizQuestion(
                "Which hook is used for component lifecycle behaviour in functional components?",
                "useState",
                "useEffect",
                "useContext",
                "useRef",
                "optionB"
        ));

        questions.add(new QuizQuestion(
                "React follows which architecture?",
                "MVC",
                "Component-Based",
                "Monolithic",
                "Layered",
                "optionB"
        ));

        return questions;
    }
}