import "./Review.css";
import { Link } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";

const Review = () => {
  const { questions, selectedAnswers, score, resetQuiz } = useQuiz();
  const percentage = Math.round((score / questions.length) * 100);

  const getOptionText = (question, optionKey) => {
    switch (optionKey) {
      case "optionA":
        return question.optionA;

      case "optionB":
        return question.optionB;

      case "optionC":
        return question.optionC;

      case "optionD":
        return question.optionD;

      default:
        return "Not Answered";
    }
  };

  return (
    <div className="review-container">
      <div className="review-wrapper">
        {/* Heading */}
        <h1 className="review-title">📖 Quiz Review Report</h1>
        <p className="review-subtitle">
          Compare your answers with the correct ones and identify the concepts
          you need to improve.
        </p>

        {/* Summary */}

        <div className="summary-cards">
          <div className="summary-card">
            <h2>{score}</h2>
            <p>Correct</p>
          </div>
          <div className="summary-card">
            <h2>{questions.length - score}</h2>

            <p>Wrong</p>
          </div>
          <div className="summary-card">
            <h2>{percentage}%</h2>
            <p>Accuracy</p>
          </div>
        </div>

        {/* Questions */}

        {questions.map((question, index) => {
          const userAnswer = selectedAnswers[index];
          const isCorrect = userAnswer === question.ans;
          return (
            <div
              key={`${question.id ?? "question"}-${index}`}
              className="review-card"
            >
              <div className="review-header">
                <h2>Question {String(index + 1).padStart(2, "0")}</h2>
                <span className={isCorrect ? "status correct" : "status wrong"}>
                  {isCorrect ? "✔ Correct" : "✖ Incorrect"}
                </span>
              </div>
              <h3 className="question-text">{question.ques}</h3>
              <div className="answer-box wrong-answer">
                <h4>🔴 Your Answer</h4>
                <p>{getOptionText(question, userAnswer)}</p>
              </div>

              <div className="answer-box correct-answer">
                <h4>✅ Correct Answer</h4>
                <p>{getOptionText(question, question.ans)}</p>
              </div>

              <div className="ai-box">
                <h4>AI Explanation</h4>
                <p>
                  AI explanations will be available in the next version. They
                  will explain why the correct answer is right and help you
                  learn the concept more effectively.
                </p>
              </div>
            </div>
          );
        })}

        {/* Footer */}

        <div className="review-footer">
          <Link to="/">
            <button className="play-again-btn" onClick={resetQuiz}>
              🔄 Play Again
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Review;
