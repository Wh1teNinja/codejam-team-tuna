import React, { useState } from "react";
import "./StartPage.css";
import { Link } from "react-router-dom";

export const StartPage = (): React.JSX.Element => {
  const [topic, setTopic] = useState("random");
  const [difficulty, setDifficulty] = useState("0");

  return (
    <main className="StartPage">
      <h1 className="StartPage-header">Welcome to Tuna Quiz!</h1>
      <div className="StartPage-filters-sections">
        <div className="StartPage-dropdown-wrapper">
          <label className="StartPage-dropdown-label" htmlFor="topic">
            Topic
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="StartPage-dropdown"
            id="topic"
          >
            <option value="random">Random</option>
            <option value="Astronomy">Astronomy</option>
            <option value="Physics">Physics</option>
            <option value="Biology">Biology</option>
          </select>
        </div>
        <div className="StartPage-dropdown-wrapper">
          <label className="StartPage-dropdown-label" htmlFor="difficulty">
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="StartPage-dropdown"
            id="difficulty"
          >
            <option value={0}>Random</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
      </div>
      <Link
        to="/questions"
        relative="path"
        state={{ topic, difficulty }}
        className="StartPage-button"
      >
        Start Quiz
      </Link>
    </main>
  );
};
