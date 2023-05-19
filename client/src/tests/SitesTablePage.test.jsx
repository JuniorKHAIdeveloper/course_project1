import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPage from "../pages/SearchPage";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Search from "../components/search/Search";
import ResultsTable from "../components/search/ResultsTable";

describe("SitesTablePage", () => {
  it("check protected site read api", async () => {
    const response = await fetch("http://127.0.0.1:3000/site");

    // Assert the response status code
    expect(response.status).toBe(401);
  });
});
