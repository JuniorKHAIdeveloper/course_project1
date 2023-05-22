import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Search from "../components/search/Search";
import ResultsTable from "../components/search/ResultsTable";

let results = [];

describe("SearchPage", () => {
  it("search input", async () => {
    const setQuery = jest.fn();
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <Search setQuery={setQuery} handleSubmit={handleSubmit} />
    );

    const searchInput = getByTestId("search");
    fireEvent.change(searchInput, { target: { value: "гаррі" } });
    expect(searchInput.value).toBe("гаррі");

    expect(setQuery).toHaveBeenCalledTimes(1);
    expect(setQuery).toHaveBeenCalledWith("гаррі");
  });

  it("search submit empty string", async () => {
    const setQuery = jest.fn();
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <Search query={""} setQuery={setQuery} handleSubmit={handleSubmit} />
    );

    const searchButton = getByTestId("search-button");
    fireEvent.click(searchButton);

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

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.results)).toBe(true);
    expect(data.results.length).toBeGreaterThan(0);

    results = data.results;
  });

  it("table renders results", () => {
    const { getByText } = render(
      <ResultsTable results={results} isAuth={false} />
    );

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
