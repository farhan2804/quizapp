import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";
import Select from "react-select";

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
    isLoading,
  } = useQuiz();

  const categoryOptions = [
    { value: "React", label: "⚛️ React" },
    { value: "Java", label: "☕ Java" },
    { value: "Spring Boot", label: "🌱 Spring Boot" },
    { value: "JavaScript", label: "🟨 JavaScript" },
    { value: "HTML", label: "🌐 HTML" },
    { value: "CSS", label: "🎨 CSS" },
    { value: "Python", label: "🐍 Python" },
    { value: "SQL", label: "🗄️ SQL" },
  ];

  const difficultyOptions = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];

  const questionOptions = [
    { value: 5, label: "5 Questions" },
    { value: 10, label: "10 Questions" },
    { value: 15, label: "15 Questions" },
    { value: 20, label: "20 Questions" },
  ];

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "58px",
      borderRadius: "18px",
      border: state.isFocused ? "2px solid #18c6d1" : "2px solid #c8f4f7",

      backgroundColor: "#ffffff",

      boxShadow: state.isFocused
        ? "0 0 0 5px rgba(24,198,209,0.18)"
        : "0 4px 12px rgba(0,0,0,0.06)",

      transition: "all .25s ease",
      cursor: "pointer",

      "&:hover": {
        border: "2px solid #18c6d1",
      },
    }),

    valueContainer: (provided) => ({
      ...provided,
      padding: "2px 16px",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#0f172a",
      fontSize: "17px",
      fontWeight: 600,
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#94a3b8",
    }),

    menu: (provided) => ({
      ...provided,
      marginTop: 8,
      borderRadius: "18px",
      overflow: "hidden",
      border: "1px solid #d8f5f7",
      boxShadow: "0 12px 30px rgba(0,0,0,.15)",
      zIndex: 9999,
    }),

    menuList: (provided) => ({
      ...provided,
      padding: 8,
      background: "#ffffff",
    }),

    option: (provided, state) => ({
      ...provided,

      padding: "14px 18px",
      marginBottom: 6,
      borderRadius: "12px",

      fontSize: "16px",
      fontWeight: 500,

      cursor: "pointer",
      transition: "all .2s ease",

      background: state.isSelected
        ? "linear-gradient(90deg, #21c8cf 0%, #169fb8 100%)"
        : state.isFocused
          ? "#eefcfd"
          : "#ffffff",

      color: state.isSelected ? "#ffffff" : "#1e293b",
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,

      color: state.isFocused ? "#18c6d1" : "#64748b",

      transition: "all .25s ease",

      transform: state.selectProps.menuIsOpen
        ? "rotate(180deg)"
        : "rotate(0deg)",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),
  };
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
        {isLoading ? (
          <>
            <div className="loader"></div>

            <h2> ⚙️ Groq AI is building your assessment...</h2>

            <p className="subtitle">
              Preparing {questionCount} {difficulty} {category} questions.
              <br />
              Please wait a few seconds...
            </p>
          </>
        ) : (
          <>
            <span className="badge">AI Powered Learning Platform</span>

            <h1>QuizGenius AI</h1>

            <p className="subtitle">
              Master programming through intelligent quizzes, AI generated
              questions and instant feedback.
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

              <Select
                options={categoryOptions}
                value={categoryOptions.find(
                  (option) => option.value === category,
                )}
                onChange={(selected) => setCategory(selected.value)}
                styles={customSelectStyles}
                isSearchable={false}
              />
            </div>

            {/* Difficulty */}

            <div className="input-group">
              <label>Difficulty</label>

              <Select
                options={difficultyOptions}
                value={difficultyOptions.find(
                  (option) => option.value === difficulty,
                )}
                onChange={(selected) => setDifficulty(selected.value)}
                styles={customSelectStyles}
                isSearchable={false}
              />
            </div>

            {/* Question Count */}

            <div className="input-group">
              <label>Questions</label>

              <Select
                options={questionOptions}
                value={questionOptions.find(
                  (option) => option.value === questionCount,
                )}
                onChange={(selected) => setQuestionCount(selected.value)}
                styles={customSelectStyles}
                isSearchable={false}
              />
            </div>

            <button
              className="start-btn"
              onClick={startQuiz}
              disabled={isLoading}
            >
              {isLoading ? "Generating Quiz..." : <i>"Start Learning →"</i>}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Landing;
