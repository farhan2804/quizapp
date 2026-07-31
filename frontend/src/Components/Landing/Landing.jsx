import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";

const Landing = () => {
  const navigate = useNavigate();
  const {
    userName,
    setUserName,
    category,
    setCategory,
    difficulty,
    setDifficulty,
    questionCount,
    setQuestionCount,
    fetchQuestions,
  } = useQuiz();

  const startQuiz = async () => {
    if (!userName.trim()) {
      alert("Please enter your name.");
      return;
    }
    await fetchQuestions();
    navigate("/quiz");
  };

  return (
    <div className="landing">
      <div className="landing-card">
        <span className="badge">AI Powered Learning Platform</span>

        <h1>QuizGenius AI</h1>

        <p className="subtitle">
          Master programming through intelligent quizzes, AI generated questions
          and instant feedback.
        </p>

        {/* Name */}

        <div className="input-group">
          <label>Your Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        {/* Category */}

        <div className="input-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>React</option>

            <option>Java</option>

            <option>Spring Boot</option>

            <option>JavaScript</option>

            <option>SQL</option>
          </select>
        </div>

        {/* Difficulty */}

        <div className="input-group">
          <label>Difficulty</label>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Easy</option>

            <option>Medium</option>

            <option>Hard</option>
          </select>
        </div>

        {/* Question Count */}

        <div className="input-group">
          <label>Questions</label>

          <select
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
          >
            <option value={5}>5</option>

            <option value={10}>10</option>

            <option value={15}>15</option>

            <option value={20}>20</option>
          </select>
        </div>

        <button className="start-btn" onClick={startQuiz}>
          Start Learning →
        </button>
      </div>
    </div>
  );
};

export default Landing;
