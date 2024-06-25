import React, { useEffect, useState } from "react";
import "./QuizComponent.css";

type QuestionData = {
  questionData: {
    options: string[];
    question: string;
  };
  totalQuestions: Number;
  currentQuestion: Number;
  answer: string | null;
  setAnswer: (answer: string) => void;
  score: number;
  correctAnswer: string | null;
};

export const QuizComponent = ({
  questionData,
  totalQuestions,
  currentQuestion,
  answer,
  setAnswer,
  score,
  correctAnswer,
}: QuestionData): React.JSX.Element => {
  console.log(questionData);

  return (
    <div className="quizComponent">
      <div className="questionContainer">
        <div className="user-stats">
          <p>{`Question ${currentQuestion}/${totalQuestions}`}</p>
          <p>{`Score: ${score}`}</p>
        </div>
        <p className="question">{questionData?.question}</p>
      </div>
      <div className="optionsContainer">
        {questionData.options.map((option) => (
          <label
            className={
              "optionContainer" +
              (option === answer ? " option-selected" : "") +
              (correctAnswer === option ? " option-correct" : "") +
              (correctAnswer && correctAnswer !== answer && answer === option
                ? " option-incorrect"
                : "")
            }
            htmlFor={option}
            key={option}
          >
            <span>{option}</span>
            <input
              disabled={!!correctAnswer}
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
