import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test('Todo should be rendered correctly', () => {
    const todo = {text: "hello", done: true}
    render(<Todo todo={todo} />)
    const todoElement = screen.getByText("hello")
    expect(todoElement).toBeVisible()
})