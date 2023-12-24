import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("Sidebar component", () => {
  it("renders the Sidebar component", () => {
    render(<Sidebar />);
    const sidebarElement = screen.getByText(/popular/i);
    expect(sidebarElement).toBeInTheDocument();
  });

  it("renders 10 popular subreddits initially", () => {
    render(<Sidebar />);
    const subredditElements = screen.getAllByText(/^r\//i);
    expect(subredditElements).toHaveLength(10);
  });

  it("toggles visibility when the toggle button is clicked", () => {
    render(<Sidebar />);
    const toggleButton = screen.getByRole("button", { name: /popular/i });

    fireEvent.click(toggleButton);
    const subredditList = screen.getByRole("list");
    expect(subredditList).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(subredditList).not.toBeInTheDocument();
  });

  it("rotates the toggle button icon when clicked", () => {
    render(<Sidebar />);
    const toggleButton = screen.getByRole("button", { name: /popular/i });
    const chevronIcon = screen.getByTestId("chevron-icon");

    fireEvent.click(toggleButton);
    expect(chevronIcon).toHaveStyle("transform: rotate(180deg)");

    fireEvent.click(toggleButton);
    expect(chevronIcon).toHaveStyle("transform: rotate(0deg)");
  });

  it("has the correct class when the list is visible", () => {
    render(<Sidebar />);
    const toggleButton = screen.getByRole("button", { name: /popular/i });
    const subredditList = screen.getByRole("list");

    fireEvent.click(toggleButton);
    expect(subredditList).toHaveClass("block");

    fireEvent.click(toggleButton);
    expect(subredditList).toHaveClass("hidden");
  });

  it("changes the button text when the list is visible", () => {
    render(<Sidebar />);
    const toggleButton = screen.getByRole("button", { name: /popular/i });

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("Popular ▲");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("Popular ▼");
  });

  it("applies hover styles to subreddit items", () => {
    render(<Sidebar />);
    const subredditItem = screen.getByText(/^r\/funny/i);

    fireEvent.mouseOver(subredditItem);
    expect(subredditItem).toHaveClass("hover:text-gray-300");

    fireEvent.mouseLeave(subredditItem);
    expect(subredditItem).not.toHaveClass("hover:text-gray-300");
  });

  it("applies focus styles to the toggle button", () => {
    render(<Sidebar />);
    const toggleButton = screen.getByRole("button", { name: /popular/i });

    fireEvent.focus(toggleButton);
    expect(toggleButton).toHaveFocus();

    fireEvent.blur(toggleButton);
    expect(toggleButton).not.toHaveFocus();
  });

  it("handles clicking on a subreddit item", () => {
    render(<Sidebar />);
    const subredditItem = screen.getByText(/^r\/funny/i);
    
    fireEvent.click(subredditItem);
  });

  it("matches the snapshot", () => {
    const { container } = render(<Sidebar />);
    expect(container).toMatchSnapshot();
  });
});
