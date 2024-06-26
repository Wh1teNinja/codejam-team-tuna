import express from "express";
import path from "path";
const cors = require("cors");

const app = express();
const questionList = require("./assets/questions.json");
const rooms = [];

const PORT = process.env.PORT || 4200;

app.use(cors({ origin: "*" }));

function getQuestions(difficulty: number, topic: string, roomid: number) {
  let filteredQuestions = questionList;
  if (topic !== "0") {
    filteredQuestions = filteredQuestions.filter(
      (question) => question.topic === topic
    );
  }
  if (difficulty) {
    filteredQuestions = filteredQuestions.filter(
      (question) => question.difficulty === difficulty
    );
  }

  let currentIndex = filteredQuestions.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [filteredQuestions[currentIndex], filteredQuestions[randomIndex]] = [
      filteredQuestions[randomIndex], filteredQuestions[currentIndex]];
  }

  if (filteredQuestions.length > 5) {
    filteredQuestions = filteredQuestions.slice(0, 5);
  }
  return filteredQuestions;
}

app.use(express.static(path.resolve(__dirname, "../frontend-app/build")));

app.get("/questions/:topic/:difficulty/:roomid", (req, res) => {
  const { topic, difficulty, roomid } = req.params;

  let questions = getQuestions(Number(difficulty), topic, Number(roomid));

    if (questions.length == 0) {
        res.status(400).send({ error: "Invalid Topic and Difficulty!" });
        return;
    }

  let id = ("00000" + Math.floor(Math.random() * 99999) + 1).slice(-5);

    let room = {
        id: id,
        difficulty: difficulty,
        topic: topic,
        questions: questions.map((q) => ({
            question: q.question,
            options: q.options,
            isAnswered: false,
        })),
        score: 0,
    };
    rooms.push(room);
    res.json({ id: room.id, questions: room.questions });
});

app.get("/validate/:roomid/:question/:option", (req, res) => {
    const { roomid, question, option } = req.params;
    let index = rooms.findIndex((x) => x.id == roomid);
    const roomQuestion = rooms[index].questions.find(
        (x) => x.question == question
    );

  if (!roomQuestion) {
    res.status(400).send({ error: "Invalid question for room!" });
    return;
  }
  if (roomQuestion.isAnswered) {
    res.status(400).send({ error: "Repeated question!" });
    return;
  }
  roomQuestion.isAnswered = true;
  let answer = questionList.find((x) => x.question == question).correctAnswer;
  if (answer == option) {
    rooms[index].score++;
  }
  res.json({ answer: answer, score: rooms[index].score });
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend-app/build", "index.html"));
});

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});
