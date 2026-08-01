import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Quiz from "./Components/Quiz/Quiz";
import Result from "./Components/Result/Result";
import Review from "./Components/Review/Review";
import { QuizProvider } from "./context/QuizContext";

import "./App.css";

const App = () => {
  return (
   
      <QuizProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </QuizProvider>
   
  );
};

export default App;