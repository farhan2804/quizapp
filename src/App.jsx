import React from "react";
import { Routes, Route } from "react-router-dom";
import FrontPage from "./Components/0_FrontPage/FrontPage";
import Landing from "./Components/Landing/Landing";
import { QuizProvider } from "./context/QuizContext";
import Quiz from "./Components/Quiz/Quiz";
import Result from "./Components/Result/Result";
import Review from "./Components/Review/Review";
import "./App.css";

const App = () => {
  return (
    <QuizProvider>
      <Routes>
        {/* OLD APP */}
        <Route path="/" element={<FrontPage />} />
        {/* NEW APP */}
        <Route path="/new" element={<Landing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </QuizProvider>
  );
};

export default App;
