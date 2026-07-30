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
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://656c91dae1e03bfd572e81e6.mockapi.io/QuizApp",
      );
      setQuestions(response.data);
    } catch (error) {
      console.log(error);
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
  const nextQuestion = () => {
    const updatedLockedQuestions = [...lockedQuestions];
    updatedLockedQuestions[currentQuestion] = true;
    setLockedQuestions(updatedLockedQuestions);
    if (currentQuestion < questions.length - 1) {
      const nextIndex = currentQuestion + 1;
      setCurrentQuestion(nextIndex);
      setSelectedOption(selectedAnswers[nextIndex] || null);
      setTimeLeft(getTimerByDifficulty());
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      const previousIndex = currentQuestion - 1;
      setCurrentQuestion(previousIndex);
      setSelectedOption(selectedAnswers[previousIndex] || null);
      setTimeLeft(getTimerByDifficulty());
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
    setTimeLeft(getTimerByDifficulty());
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
        timeLeft,
        setTimeLeft,
        getTimerByDifficulty,
        lockedQuestions,
        setLockedQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
