import React, { useEffect, useState } from "react";
import "./QuizComponent.css";

type QuestionData = {
  questionData: any;
  totalQuestions: Number;
};

export const QuizComponent = ({
  questionData,
  totalQuestions,
}: QuestionData): React.JSX.Element => {
  console.log(questionData);

  return (
    <div className="quizComponent">
      <div className="questionContainer">
        <p>{`Question ${0}/${totalQuestions}`}</p>
        <p>{questionData?.question}</p>
      </div>
      <div className="optionsContainer">
        <div className="optionContainer">
          <label>Option 1</label>
          <input type="radio" value="option1" />
        </div>
        <div className="optionContainer">
          <label>Option 2</label>
          <input type="radio" value="option2" />
        </div>
        <div className="optionContainer">
          <label>Option 3</label>
          <input type="radio" value="option3" />
        </div>
        <div className="optionContainer">
          <label>Option 4</label>
          <input type="radio" value="option4" />
        </div>
      </div>
    </div>
  );
};
