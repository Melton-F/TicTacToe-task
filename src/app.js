import express from "express";
import morgan from "morgan";
import gameRouter from '../src/tictactoeRouter/tictactoeRouter'

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use('/api/tictactoe', gameRouter)

module.exports = app;