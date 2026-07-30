import "./Quiz.css";
import { useEffect, useState } from "react";
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
    questionEndTimes,
    setQuestionEndTimes,
    getTimerByDifficulty,
    lockedQuestions,
    lockCurrentQuestion,
  } = useQuiz();

  if (questions.length === 0) {
    return (
      <div className="quiz-loading">
        <h2>Loading Questions...</h2>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const endTime = questionEndTimes[currentQuestion];
  const [timeLeft, setTimeLeft] = useState(getTimerByDifficulty());
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
    // Lock current question
    if (!lockedQuestions[currentQuestion]) {
      lockCurrentQuestion();
    }
    if (currentQuestion === questions.length - 1) {
      calculateScore();
      navigate("/result");
    } else {
      nextQuestion();
    }
  };
  useEffect(() => {
    if (lockedQuestions[currentQuestion]) return;

    // First visit? Start timer now.
    if (!questionEndTimes[currentQuestion]) {
      const updated = [...questionEndTimes];

      updated[currentQuestion] = Date.now() + getTimerByDifficulty() * 1000;

      setQuestionEndTimes(updated);

      return;
    }

    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((questionEndTimes[currentQuestion] - Date.now()) / 1000),
      );

      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);

        lockCurrentQuestion();

        if (currentQuestion === questions.length - 1) {
          calculateScore();
          navigate("/result");
        } else {
          nextQuestion();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion, questionEndTimes, lockedQuestions]);
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
            <div
              className={`timer ${
                !lockedQuestions[currentQuestion] && timeLeft <= 10
                  ? "danger"
                  : ""
              }`}
            >
              {lockedQuestions[currentQuestion]
                ? "🔒 Locked"
                : `⏱ ${timeLeft}s`}
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
              disabled={lockedQuestions[currentQuestion]}
              onClick={() => {
                if (!lockedQuestions[currentQuestion]) {
                  selectAnswer(option.key);
                }
              }}
            >
              <div className="option-letter">{option.label}</div>

              <div className="option-text">{option.value}</div>
            </button>
          ))}
        </div>
        {!lockedQuestions[currentQuestion] && selectedOption === null && (
          <p className="select-message">Please select an answer to continue.</p>
        )}
        {lockedQuestions[currentQuestion] && (
          <p className="select-message">
            🔒 Answer submitted. This question is locked.
          </p>
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
            disabled={
              selectedOption === null && !lockedQuestions[currentQuestion]
            }
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
