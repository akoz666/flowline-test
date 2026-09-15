import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TodoPage from "./page";

describe("TodoPage", () => {
  it("renders the todo route", () => {
    render(<TodoPage />);
    expect(screen.getByRole("heading", { name: "Todo" })).toBeInTheDocument();
  });
});
