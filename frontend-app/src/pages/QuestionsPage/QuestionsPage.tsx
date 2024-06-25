import React, { useCallback, useEffect, useState }, { useEffect, useState } from "react";
import "./QuestionsPage.css";
import { QuizComponent } from "./QuizComponent";
import config from "../../config/config.json";
import { Loader } from "../../components/Loader";
import { useLocation } from "react-router-dom";

export const QuestionsPage = (): React.JSX.Element => {
    return <div>
        <h1>Questions page!</h1>
    </div>
  );
};
