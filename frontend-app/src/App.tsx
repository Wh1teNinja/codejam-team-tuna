import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { StartPage } from "./pages/StartPage/StartPage";
import { QuestionsPage } from "./pages/QuestionsPage/QuestionsPage";
import { ResultsPage } from "./pages/ResultsPage/ResultsPage";

const router = createBrowserRouter([
  { path: "/", element: <StartPage /> },
  { path: "/questions", element: <QuestionsPage /> },
  { path: "/results", element: <ResultsPage /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
