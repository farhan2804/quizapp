import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [userName, setUserName] = useState("");
  const [category, setCategory] = useState("React");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [lockedQuestions, setLockedQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionEndTimes, setQuestionEndTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   fetchQuestions();
  // }, []);
  const shuffleQuestion = (question) => {
    const options = [
      { key: "optionA", value: question.optionA },
      { key: "optionB", value: question.optionB },
      { key: "optionC", value: question.optionC },
      { key: "optionD", value: question.optionD },
    ];

    // Fisher-Yates Shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    const shuffledQuestion = {
      ...question,
      optionA: options[0].value,
      optionB: options[1].value,
      optionC: options[2].value,
      optionD: options[3].value,
    };

    // Find where the original correct answer moved
    const correctOptionText = question[question.ans];

    const correctIndex = options.findIndex(
      (option) => option.value === correctOptionText,
    );

    shuffledQuestion.ans = ["optionA", "optionB", "optionC", "optionD"][
      correctIndex
    ];

    return shuffledQuestion;
  };
  const fetchQuestions = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/quiz/generate",
        {
          category,
          difficulty,
          questionCount,
        },
      );
      const fetchedQuestions = response.data;
      const shuffledQuestions = fetchedQuestions.map(shuffleQuestion);
      setQuestions(shuffledQuestions);
      setQuestionEndTimes(shuffledQuestions.map(() => null));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const selectAnswer = (optionKey) => {
    // Prevent changing answer if question is locked
    if (lockedQuestions[currentQuestion]) {
      return;
    }
    setSelectedOption(optionKey);
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = optionKey;
    setSelectedAnswers(updatedAnswers);
  };

  const lockCurrentQuestion = () => {
    // Already locked? Don't update state again.
    if (lockedQuestions[currentQuestion]) {
      return;
    }
    const updatedLockedQuestions = [...lockedQuestions];
    updatedLockedQuestions[currentQuestion] = true;
    setLockedQuestions(updatedLockedQuestions);
  };
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const nextIndex = currentQuestion + 1;
      setCurrentQuestion(nextIndex);
      setSelectedOption(selectedAnswers[nextIndex] || null);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      const previousIndex = currentQuestion - 1;
      setCurrentQuestion(previousIndex);
      setSelectedOption(selectedAnswers[previousIndex] || null);
      if (!lockedQuestions[previousIndex]) {
      }
    }
  };

  const getTimerByDifficulty = () => {
    switch (difficulty) {
      case "Easy":
        return 45;
      case "Hard":
        return 20;
      default:
        return 30;
    }
  };

  const calculateScore = () => {
    let total = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.ans) {
        total++;
      }
    });
    setScore(total);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setSelectedAnswers([]);
    setScore(0);
    setQuestionEndTimes(questions.map(() => null));
    setCategory("React");
    setDifficulty("Medium");
    setQuestionCount(10);
    setLockedQuestions([]);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestion,
        setCurrentQuestion,
        selectedOption,
        setSelectedOption,
        selectedAnswers,
        score,
        userName,
        setUserName,
        category,
        setCategory,
        difficulty,
        setDifficulty,
        questionCount,
        setQuestionCount,
        nextQuestion,
        previousQuestion,
        selectAnswer,
        calculateScore,
        resetQuiz,
        questionEndTimes,
        setQuestionEndTimes,
        getTimerByDifficulty,
        lockedQuestions,
        setLockedQuestions,
        lockCurrentQuestion,
        fetchQuestions,
        isLoading,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
