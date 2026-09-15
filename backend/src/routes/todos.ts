import { Router, type Request, type Response } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  listTodos,
  updateTodo,
} from "../store/todoStore.js";

export const todosRouter = Router();

todosRouter.get("/", (_req: Request, res: Response) => {
  res.json(listTodos());
});

todosRouter.post("/", (req: Request, res: Response) => {
  const { title } = req.body ?? {};
  if (typeof title !== "string" || title.trim().length === 0) {
    res.status(400).json({ error: "title is required" });
    return;
  }
  const todo = createTodo({ title });
  res.status(201).json(todo);
});

todosRouter.get("/:id", (req: Request, res: Response) => {
  const todo = getTodo(req.params.id);
  if (!todo) {
    res.status(404).json({ error: "todo not found" });
    return;
  }
  res.json(todo);
});

todosRouter.put("/:id", (req: Request, res: Response) => {
  const { title, completed } = req.body ?? {};
  if (title !== undefined && typeof title !== "string") {
    res.status(400).json({ error: "title must be a string" });
    return;
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    res.status(400).json({ error: "completed must be a boolean" });
    return;
  }
  const todo = updateTodo(req.params.id, { title, completed });
  if (!todo) {
    res.status(404).json({ error: "todo not found" });
    return;
  }
  res.json(todo);
});

todosRouter.delete("/:id", (req: Request, res: Response) => {
  const deleted = deleteTodo(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "todo not found" });
    return;
  }
  res.status(204).send();
});
