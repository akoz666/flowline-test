import { describe, expect, it } from "vitest";
import { resetSeedData, todos, users } from "./seedData";

describe("seedData", () => {
  it("boots with one admin user", () => {
    expect(users).toHaveLength(1);
    expect(users[0]).toMatchObject({ username: "admin", password: "admin" });
  });

  it("boots with two seed todos", () => {
    expect(todos).toHaveLength(2);
  });

  it("returns to the original seed state after a reset", () => {
    users.push({ id: "2", username: "intruder", password: "hunter2" });
    todos.pop();
    todos.push({ id: "99", title: "rogue todo", completed: true });

    resetSeedData();

    expect(users).toHaveLength(1);
    expect(users[0]).toMatchObject({ username: "admin", password: "admin" });
    expect(todos).toHaveLength(2);
    expect(todos.some((todo) => todo.title === "rogue todo")).toBe(false);
  });
});
