import express, { type Express } from "express";
import { todosRouter } from "./routes/todos.js";

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/todos", todosRouter);

  return app;
}
