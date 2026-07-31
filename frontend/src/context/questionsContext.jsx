
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://656c91dae1e03bfd572e81e6.mockapi.io/QuizApp"
        );
        setQuestionsData(response.data);
      } catch (error) {
        console.error("Error fetching questions data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <QuestionsContext.Provider value={questionsData}>
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  return useContext(QuestionsContext);
};
