import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  Storage.prototype.getItem = vi.fn(() => null);
  Storage.prototype.setItem = vi.fn();
});

describe("Task Manager App", () => {
  it("renders the title", () => {
    render(<App />);
    expect(screen.getByText(/Task Manager/i)).toBeInTheDocument();
  });

  it("toggles TaskForm when clicking Create Task", () => {
    render(<App />);
    const button = screen.getByText(/Create Task/i);
    fireEvent.click(button);
    expect(
      screen.getByRole("button", { name: /Add Task/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Cancel/i));
    expect(
      screen.queryByRole("button", { name: /Add Task/i })
    ).not.toBeInTheDocument();
  });
});