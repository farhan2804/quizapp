import "./Quiz.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";

const Quiz = () => {
  const navigate = useNavigate();

  const {
    questions,
    currentQuestion,
    selectedOption,
    previousQuestion,
    nextQuestion,
    selectAnswer,
    calculateScore,
    timeLeft,
    setTimeLeft,
    getTimerByDifficulty,
  } = useQuiz();

  if (questions.length === 0) {
    return (
      <div className="quiz-loading">
        <h2>Loading Questions...</h2>
      </div>
    );
  }

  const question = questions[currentQuestion];

  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  const options = [
    {
      key: "optionA",
      label: "A",
      value: question.optionA,
    },
    {
      key: "optionB",
      label: "B",
      value: question.optionB,
    },
    {
      key: "optionC",
      label: "C",
      value: question.optionC,
    },
    {
      key: "optionD",
      label: "D",
      value: question.optionD,
    },
  ];

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      calculateScore();
      navigate("/result");
    } else {
      nextQuestion();
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          if (currentQuestion === questions.length - 1) {
            calculateScore();
            navigate("/result");
          } else {
            nextQuestion();
          }

          return getTimerByDifficulty();
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    currentQuestion,
    questions.length,
    calculateScore,
    navigate,
    nextQuestion,
    setTimeLeft,
    getTimerByDifficulty,
  ]);
  return (
    <div className="quiz-container">
      <div className="quiz-card">
        {/* Header */}

        <div className="quiz-header">
          <div>
            <p className="question-count">
              Question {currentQuestion + 1} of {questions.length}
            </p>

            <h1 className="question-title">{question.ques}</h1>
          </div>

          <div className="quiz-info">
            <div className={`timer ${timeLeft <= 10 ? "danger" : ""}`}>
              ⏱ {timeLeft}s
            </div>

            <div className="progress-percentage">{progress}%</div>
          </div>
        </div>

        {/* Progress Bar */}

        <div className="progress">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>

        {/* Options */}

        <div className="option-list">
          {options.map((option) => (
            <button
              key={option.key}
              className={`option-card ${
                selectedOption === option.key ? "selected" : ""
              }`}
              onClick={() => selectAnswer(option.key)}
            >
              <div className="option-letter">{option.label}</div>

              <div className="option-text">{option.value}</div>
            </button>
          ))}
        </div>
        {selectedOption === null && (
          <p className="select-message">Please select an answer to continue.</p>
        )}
        {/* Footer */}

        <div className="quiz-footer">
          <button
            className="nav-btn"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>

          <button
            className="nav-btn next-btn"
            onClick={handleNext}
            disabled={selectedOption === null}
          >
            {currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
