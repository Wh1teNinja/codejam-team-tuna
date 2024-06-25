import React, { useCallback, useEffect, useState } from "react";
import "./QuestionsPage.css";
import { QuizComponent } from "./QuizComponent";

export const QuestionsPage = (): React.JSX.Element => {
  const [questionsList, setQuestionsList] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("https://opentdb.com/api.php?amount=10");
        const data = await response.json();
        console.log(data.results);

        setQuestionsList(data?.results);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      if (questionsList.length !== 0) {
        setTotalQuestions(questionsList.length);
        setCurrentQuestion(1);
      }
    }
  }, []);

  const onSubmitButtonClick = useCallback(() => {}, []);

  return (
    <div className="questionsPage">
      <QuizComponent
        questionData={questionsList[0]}
        totalQuestions={totalQuestions}
      />
      <button onClick={onSubmitButtonClick}>Submit</button>
    </div>
  );
};
