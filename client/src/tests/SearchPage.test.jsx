import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPage from "../pages/SearchPage";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Search from "../components/search/Search";
import ResultsTable from "../components/search/ResultsTable";

let results = [];

describe("SearchPage", () => {
  it("search input", async () => {
    // Arrange
    const setQuery = jest.fn();
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <Search setQuery={setQuery} handleSubmit={handleSubmit} />
    );

    const searchInput = getByTestId("search");
    const searchButton = getByTestId("search-button");

    // Act
    fireEvent.change(searchInput, { target: { value: "гаррі" } });
    expect(searchInput.value).toBe("гаррі");
    // fireEvent.click(searchButton);

    // Assert
    expect(setQuery).toHaveBeenCalledTimes(1);
    expect(setQuery).toHaveBeenCalledWith("гаррі");
  });

  it("search submit empty string", async () => {
    // Arrange
    const setQuery = jest.fn();
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <Search query={""} setQuery={setQuery} handleSubmit={handleSubmit} />
    );
    const searchButton = getByTestId("search-button");

    // Act
    fireEvent.click(searchButton);

    // Assert
    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });

  it("parser api", async () => {
    const response = await fetch("http://127.0.0.1:3000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: "гаррі" }),
    });

    // Assert the response status code
    expect(response.status).toBe(200);
    const data = await response.json();

    // Assert the response data
    expect(Array.isArray(data.results)).toBe(true);
    expect(data.results.length).toBeGreaterThan(0);
    results = data.results;
  });

  it("table renders results", () => {
    const { getByText } = render(<ResultsTable results={results} isAuth={false} />);

    results
      .filter((result) => result !== null)
      .forEach(async (result) => {
        await waitFor(() => {
          const textElement = getByText(result.title);
          expect(textElement).toBeInTheDocument();
        });
      });
  });
});
