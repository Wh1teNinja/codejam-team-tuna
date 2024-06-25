import React, { useEffect, useState } from "react";
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

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <h1>Questions page!</h1>
    </div>
  );
};
