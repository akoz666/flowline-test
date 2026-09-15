import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoginPage from "./page";

describe("LoginPage", () => {
  it("renders the login route", () => {
    render(<LoginPage />);
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  });
});
