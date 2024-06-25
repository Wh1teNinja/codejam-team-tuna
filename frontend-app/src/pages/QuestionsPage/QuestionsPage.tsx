import React, { useCallback, useEffect, useState } from "react";
import "./QuestionsPage.css";
import { QuizComponent } from "./QuizComponent";
import config from "../../config/config.json";
import { Loader } from "../../components/Loader";
import { Link, useLocation } from "react-router-dom";

type Question = {
  question: string;
  options: string[];
};

export const QuestionsPage = (): React.JSX.Element => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const [id, setId] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const { topic, difficulty } = state || {
    topic: "random",
    difficulty: "0",
  };

  console.log(state);

  useEffect(() => {
    fetch(
      config.env.server +
        `/questions/${topic !== "random" ? topic : "0"}/${difficulty}`
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

  const onSubmitButtonClick = () => {
    setIsAnswered(true);
    fetch(
      config.env.server +
        `/validate/${id}/${encodeURIComponent(
          questions[currentQuestion].question
        )}/${encodeURIComponent(answer as string)}`
    )
      .then((res) => res.json())
      .then(({score, result}) => {
        setScore(score);
      });
  };

  const onNextButtonClick = () => {
    if (currentQuestion !== questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer(null);
      setIsAnswered(false);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="questionsPage">
      <QuizComponent
        questionData={questions[currentQuestion]}
        totalQuestions={questions.length}
        setAnswer={setAnswer}
        currentQuestion={currentQuestion + 1}
      />
      {!isAnswered ? (
        <button disabled={!answer} onClick={onSubmitButtonClick}>
          Submit
        </button>
      ) : currentQuestion + 1 === questions.length ? (
        <Link
          to="/results"
          state={{ roomId: id, score: score, maxScore: questions.length }}
        >
          Finish
        </Link>
      ) : (
        <button onClick={onNextButtonClick}>Next</button>
      )}
    </div>
  );
};
