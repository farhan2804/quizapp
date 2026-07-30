import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState("");

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
    setSelectedOption(optionKey);

    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = optionKey;
    setSelectedAnswers(updatedAnswers);
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

        nextQuestion,
        previousQuestion,

        selectAnswer,

        calculateScore,

        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
