import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../app.js";
import { resetTodos } from "../store/todoStore.js";

describe("todos API", () => {
  const app = createApp();

  beforeEach(() => {
    resetTodos();
  });

  it("returns an empty list initially", async () => {
    const res = await request(app).get("/todos");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("creates a todo", async () => {
    const res = await request(app).post("/todos").send({ title: "Buy milk" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: "Buy milk", completed: false });
    expect(res.body.id).toBeDefined();
  });

  it("rejects creating a todo without a title", async () => {
    const res = await request(app).post("/todos").send({});
    expect(res.status).toBe(400);
  });

  it("gets a todo by id", async () => {
    const created = await request(app).post("/todos").send({ title: "Read book" });
    const res = await request(app).get(`/todos/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Read book");
  });

  it("returns 404 for a missing todo", async () => {
    const res = await request(app).get("/todos/does-not-exist");
    expect(res.status).toBe(404);
  });

  it("updates a todo", async () => {
    const created = await request(app).post("/todos").send({ title: "Old title" });
    const res = await request(app)
      .put(`/todos/${created.body.id}`)
      .send({ title: "New title", completed: true });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ title: "New title", completed: true });
  });

  it("returns 404 when updating a missing todo", async () => {
    const res = await request(app).put("/todos/does-not-exist").send({ title: "x" });
    expect(res.status).toBe(404);
  });

  it("deletes a todo", async () => {
    const created = await request(app).post("/todos").send({ title: "Delete me" });
    const del = await request(app).delete(`/todos/${created.body.id}`);
    expect(del.status).toBe(204);

    const get = await request(app).get(`/todos/${created.body.id}`);
    expect(get.status).toBe(404);
  });

  it("returns 404 when deleting a missing todo", async () => {
    const res = await request(app).delete("/todos/does-not-exist");
    expect(res.status).toBe(404);
  });
});
