import express, { NextFunction, Request, Response } from "express";
import { parse } from "path";
import { WeatherController } from "./controller/WeatherController";

import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import { API_KEY } from "./constantes/config";
dotenv.config();

const app = express();
const weatherController = new WeatherController(API_KEY);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.get("/test", (req: Request, res: Response) => {
  res.send("serv yes");
});

app.get(
  "/weather/:city",
  async (req: Request, res: Response, next: NextFunction) => {
    await weatherController.getWeather(req, res, next);
  }
);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
