import React, { useEffect, useState } from "react";
import "./QuizComponent.css";

type QuestionData = {
  questionData: {
    options: string[];
    question: string;
  };
  totalQuestions: Number;
  currentQuestion: Number;
  setAnswer: (answer: string) => void;
};

export const QuizComponent = ({
  questionData,
  totalQuestions,
  currentQuestion,
  setAnswer,
}: QuestionData): React.JSX.Element => {
  console.log(questionData);

  return (
    <div className="quizComponent">
      <div className="questionContainer">
        <p>{`Question ${currentQuestion}/${totalQuestions}`}</p>
        <p>{questionData?.question}</p>
      </div>
      <div className="optionsContainer">
        {questionData.options.map((option) => (
          <label className="optionContainer" htmlFor={option} key={option}>
            <span>{option}</span>
            <input
              id={option}
              name="option"
              type="radio"
              value={option}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};
