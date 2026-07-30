import "./Result.css";
import { Link } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";

const Result = () => {
  const { score, questions, userName, resetQuiz } = useQuiz();

  const percentage = Math.round((score / questions.length) * 100);

  const performanceMessage = () => {
    if (percentage >= 90)
      return {
        title: "Outstanding Performance!",
        emoji: "🏆",
        text: "Excellent work! You have mastered this topic.",
      };

    if (percentage >= 75)
      return {
        title: "Great Job!",
        emoji: "🎉",
        text: "Very good performance. Keep challenging yourself.",
      };

    if (percentage >= 60)
      return {
        title: "Good Attempt!",
        emoji: "👏",
        text: "Nice work! A little more practice will make you even better.",
      };

    if (percentage >= 40)
      return {
        title: "Keep Practicing!",
        emoji: "📚",
        text: "You're improving. Review your answers and try again.",
      };

    return {
      title: "Don't Give Up!",
      emoji: "💪",
      text: "Every expert started as a beginner. Review your mistakes and keep learning.",
    };
  };

  const performance = performanceMessage();

  return (
    <div className="result-container">
      <div className="result-card">

        {/* Trophy */}

        <div className="trophy">
          {performance.emoji}
        </div>

        {/* Heading */}

        <h1 className="result-heading">
          Congratulations, {userName}!
        </h1>

        <h2 className="performance-title">
          {performance.title}
        </h2>

        <p className="result-subtitle">
          {performance.text}
        </p>

        {/* Score */}

        <div className="score-circle">

          <h2>{score}</h2>

          <span>/ {questions.length}</span>

        </div>

        <p className="score-text">
          Overall Score
        </p>

        {/* Progress */}

        <div className="result-progress">

          <div
            className="result-progress-fill"
            style={{
              width: `${percentage}%`,
            }}
          ></div>

        </div>

        <h3 className="accuracy">
          Accuracy {percentage}%
        </h3>

        {/* Statistics */}

        <div className="stats">

          <div className="stat-card">

            <div className="stat-icon success">
              ✔
            </div>

            <h2>{score}</h2>

            <p>Correct Answers</p>

          </div>

          <div className="stat-card">

            <div className="stat-icon danger">
              ✖
            </div>

            <h2>{questions.length - score}</h2>

            <p>Wrong Answers</p>

          </div>

        </div>

        {/* Report Section */}

        <div className="action-card">

          <h3>
            📖 Detailed Performance Report
          </h3>

          <p>
            Review every question, compare your answers with the
            correct answers and identify the topics you should
            improve.
          </p>

          <Link to="/review">
            <button className="review-btn">
              View Report →
            </button>
          </Link>

        </div>

        {/* Restart */}

        <div className="restart-section">

          <h3>
            🚀 Ready for another challenge?
          </h3>

          <p>
            Restart the quiz and try to beat your previous score.
          </p>

          <Link to="/new">

            <button
              className="play-btn"
              onClick={resetQuiz}
            >
              Play Again
            </button>

          </Link>

        </div>

      </div>
    </div>
  );
};

export default Result;