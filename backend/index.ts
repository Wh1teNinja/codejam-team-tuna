import express from "express";
import path from "path"

const app = express();

const PORT = process.env.PORT || 4200;

app.use(express.static(path.resolve(__dirname, "../frontend-app/build")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend-app/build", "index.html"));
});

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});