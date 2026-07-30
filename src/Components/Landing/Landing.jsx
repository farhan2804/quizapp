import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";

const Landing = () => {
  const navigate = useNavigate();

  const { userName, setUserName } = useQuiz();

  const startQuiz = () => {
    if (!userName.trim()) {
      alert("Please enter your name.");
      return;
    }

    navigate("/quiz");
  };

  return (
    <div className="landing">
      <div className="landing-card">
        <span className="badge">AI Powered Learning Platform</span>

        <h1>QuizGenius AI</h1>

        <p className="subtitle">
          Master programming through intelligent quizzes and instant feedback.
        </p>

        <div className="input-group">
          <label>Your Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <button className="start-btn" onClick={startQuiz}>
          Start Quiz →
        </button>
      </div>
    </div>
  );
};

export default Landing;
