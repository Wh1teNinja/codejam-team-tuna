import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { StartPage } from "./pages/StartPage/StartPage";
import { QuestionsPage } from "./pages/QuestionsPage/QuestionsPage";

const router = createBrowserRouter([
  { path: "/", element: <StartPage /> },
  { path: "QuestionsPage", element: <QuestionsPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
