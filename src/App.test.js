import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the primary navigation", () => {
  render(<App />);
  // The navbar always renders a Home button synchronously.
  expect(screen.getByRole("button", { name: /^home$/i })).toBeInTheDocument();
});

test("renders the hero name", () => {
  render(<App />);
  // "Pudit Chokmeesuk" appears in the hero (and footer); at least one must exist.
  expect(screen.getAllByText(/pudit chokmeesuk/i).length).toBeGreaterThan(0);
});
