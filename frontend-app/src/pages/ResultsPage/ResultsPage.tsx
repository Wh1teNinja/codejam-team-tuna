import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const ResultsPage = (): React.JSX.Element => {
  const { state } = useLocation();

  const { roomId, score, maxScore } = state || {
    roomId: 1,
    score: 6,
    maxScore: 10
  };
  function Fun() {
    if (score > maxScore / 2) {
        return <img src="https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f3a3@2x.png"></img>
    }
    return <img src="https://emoji.slack-edge.com/T029QBC60MB/nervous_fish/637ec1c40d9abc94.png"></img>
  }

  return (
    <div>
      <h1>Quiz Completed</h1>
      <h2>You scored...</h2>
      <h3>{ score } out of { maxScore }</h3>
      <Fun />
      <div></div>
      <Link
        to="/questions"
        relative="path"
        state={{ roomId }}
        className="PlayAgain-button"
      >
        Play Again
      </Link>
      <div></div>
      <Link
        to="/"
        relative="path"
        className="Exit-button"
      >
        Exit
      </Link>
    </div>
  );
};
