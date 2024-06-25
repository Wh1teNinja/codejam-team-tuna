import React, { useCallback, useEffect, useState } from "react";
import "./QuestionsPage.css";
import { QuizComponent } from "./QuizComponent";
import config from "../../config/config.json";
import { Loader } from "../../components/Loader";
import { useLocation } from "react-router-dom";

export const QuestionsPage = (): React.JSX.Element => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const [id, setId] = useState("");
  const [questions, setQuestions] = useState([]);

  const { topic, difficulty } = state || {
    topic: "random",
    difficulty: "0",
  };

  console.log(state);

  const [questionsList, setQuestionsList] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // useEffect(() => {
  //   try {
  //     const fetchData = async () => {
  //       const response = await fetch("https://opentdb.com/api.php?amount=10");
  //       const data = await response.json();
  //       console.log(data.results);

  //       setQuestionsList(data?.results);
  //     };

  //     fetchData();
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     if (questionsList.length !== 0) {
  //       setTotalQuestions(questionsList.length);
  //       setCurrentQuestion(1);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    fetch(
      config.env.server +
        `/questions/${topic !== "random" ? topic : "0"}/${difficulty}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then(({ id, questions }) => {
        setId(id);
        setQuestions(questions);
        setTimeout(() => setIsLoading(false), 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onSubmitButtonClick = useCallback(() => {}, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="questionsPage">
      <QuizComponent
        questionData={questionsList[0]}
        totalQuestions={totalQuestions}
      />
      <button onClick={onSubmitButtonClick}>Submit</button>
    </div>
  );
};
